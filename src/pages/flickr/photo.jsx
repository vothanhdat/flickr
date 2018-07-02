
//@ts-check
import React, { CSSProperties } from 'react'
import withSCSS from 'withsass.macro'
import { FlickPhoto, FlickPhotoDic } from '@/store/connects/flickr'
import { bind } from 'lodash-decorators';
import { Spring, interpolate, animated } from 'react-spring'
import { MouseDrag } from "./MouseDrag";
import { FlickPhotoUtil } from './PhotoListView'
import SwipeableViews from 'react-swipeable-views';
import withDebounceProps from 'react-collections/withDebounceProps';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';

Number.prototype.range = Number.prototype.range || function (a, b) {
  return Math.max(a, Math.min(b, this || a));
}

const PhotoZoom = function ({ zoomLevel, originY, originX, winX, winY, classes, src }) {
  return <Spring native
    to={{ zoomLevel, originY, originX }}
    config={{ duration: 100 }}>
    {
      ({ zoomLevel: z, originX: x, originY: y, }) => <animated.div
        className={classes.mainimg}
        style={{
          backgroundImage: src.filter(e => e).map(e => e && `url(${e})`).join(','),
          transform: z.interpolate(t => `scale(${t})`),
          transformOrigin: interpolate(
            [x, y, z],
            (x, y, z) => {
              let t = (z / zoomLevel - 1) / (z - 1)
              x = originX + (winX - originX) * t;
              y = originY + (winY - originY) * t;
              return `${x.range(0, 1) * 100}% ${y.range(0, 1) * 100}%`
            }
          ),
        }}
      />
    }
  </Spring>;
}

const PhotoZoomMinimap = function ({ classes, src, style = {}, zoomLevel, originY, originX }) {
  return <div
    className={classes.miniview}
    style={{ backgroundImage: `url('${src}')`, ...style }}>

    <Spring native
      to={{ zoomLevel, originY, originX }}
      config={{ duration: 100 }}>
      {
        ({ zoomLevel: z, originX: x, originY: y, }) => <animated.div
          className={classes.minirec}
          style={{
            width: z.interpolate(t => (100 / t.range(1, 50)) + '%'),
            height: z.interpolate(t => (100 / t.range(1, 50)) + '%'),
            left: interpolate([x, z], (x, z) => (100 - (100 / z.range(1, 50))) * x.range(0, 1) + '%'),
            top: interpolate([y, z], (y, z) => (100 - (100 / z.range(1, 50))) * y.range(0, 1) + '%'),
          }}
        />
      }
    </Spring>
  </div>;
}


@FlickPhotoDic()
class PhotoMiniList extends React.Component {

  getRenderList() {
    const { currentIndex } = this.props
    const length = FlickPhotoUtil.lastPhotoSnappsot.length
    return {
      list: FlickPhotoUtil.lastPhotoSnappsot
        .slice(
          (currentIndex - 10).range(0, length - 1),
          (currentIndex + 11).range(0, length - 1)
        ),
      start: (currentIndex - 10).range(0, length - 1)
    }
  }

  /**
   * @param {MouseEvent} e
   */
  @bind()
  onClick(e) {
    var delta = e.currentTarget.dataset.delta;
    this.props.onChangeIndex(parseInt(this.props.index) + parseInt(delta));
  }

  render() {
    const { classes, photos, style = {}, currentIndex } = this.props
    const { start, list } = this.getRenderList()
    return <div className={classes.minicollection} data-index="5" style={style}>
      {
        list
          .map(e => photos[e])
          .map((e, i) => <div
            onClick={this.onClick}
            className={classes.itemcollection}
            key={e.id}
            data-delta={(i + start) - currentIndex}
            style={{
              backgroundImage: `url(${e.url_m})`,
            }}
          />)
      }
    </div>
  }
}

/**
 * @class
 * @extends React.Component<{photo:FlickrPhotoObj, photoid: string} & ClassesProps>
 */
@withDebounceProps(2000, ({ active }) => ({ active }))
@FlickPhoto()
class PhotoView extends React.Component {

  state = {
    zoomLevel: 1,
    originX: 0.5,
    originY: 0.5,
    enableMini: false,
  }

  mouseEvent = new MouseDrag();

  /**
   * @param {WheelEvent} e 
   */
  @bind()
  onWheel(e) {
    const { deltaY, clientX, clientY } = e
    const winX = clientX / innerWidth
    const winY = clientY / innerHeight
    this.setState(({ zoomLevel, originX, originY }) => {
      const newZoomLevel = (zoomLevel * Math.pow(1.001, deltaY)).range(1, 50);
      const ratio = newZoomLevel / zoomLevel;
      const multipli = (ratio - 1) / (newZoomLevel - 1);

      if (newZoomLevel == 1)
        return { zoomLevel: 1, originX: 0.5, originY: 0.5 };

      const newState = {
        zoomLevel: newZoomLevel,
        winX,
        winY,
        originX: (originX + (winX - originX) * multipli).range(0, 1),
        originY: (originY + (winY - originY) * multipli).range(0, 1),
      }
      return newState
    })
    this.showMiniView();
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  @bind()
  onMouseHoldAndMove({ deltaX, deltaY }) {
    this.setState(({ zoomLevel, originX, originY }) => {
      if (zoomLevel == 1)
        return { originX: 0.5, originY: 0.5 };
      return {
        originX: (originX - deltaX / innerWidth / (zoomLevel - 1)).range(0, 1),
        originY: (originY - deltaY / innerHeight / (zoomLevel - 1)).range(0, 1),
      }
    })
  }

  showMiniView() {
    clearTimeout(this._miniTimeout);
    this.setState({ enableMini: true })
    this._miniTimeout = setTimeout(() => this.setState({ enableMini: false }), 500);
  }

  componentDidMount() {
    this.props.getPhoto();
    this.mouseEvent.addListener("onholdanddrag", this.onMouseHoldAndMove)
  }

  componentWillUnmount() {
    this.mouseEvent.removeListener("onholdanddrag", this.onMouseHoldAndMove)
  }

  render() {
    const { classes, active } = this.props
    const { url_h, url_c, url_k, url_o, url_l } = this.props.photo
    const { photo } = this.props
    const { enableMini, zoomLevel } = this.state
    const { onMounseDown, onMounseMove, onMounseUp } = this.mouseEvent.props
    const scrs = [url_h, url_c].filter(e => e)
    const virWidth = zoomLevel * innerWidth
    const virHeight = zoomLevel * innerHeight

    if (url_k && (virWidth >= photo.width_k * 0.7 || virHeight >= photo.height_k * 0.7)) {
      scrs.unshift(url_k)
    } else if (url_l && (virWidth >= photo.width_l * 0.7 || virHeight >= photo.height_l * 0.7)) {
      scrs.unshift(url_l)
    }

    if (url_o && (virWidth >= photo.width_o * 0.7 || virHeight >= photo.height_o * 0.7))
      scrs.unshift(url_o);

    return <div
      className={classes.photoroot}
      onWheel={this.onWheel}
      onMouseDown={onMounseDown}
      onMouseMove={onMounseMove}
      onMouseUp={onMounseUp}
    >
      <PhotoZoom
        {...this.state}
        {...{ classes, src: active ? scrs : [url_c] }}
      />
      {
        active && <PhotoZoomMinimap
          {...this.state}
          {...{ classes, src: url_c, style: { opacity: enableMini ? 1 : 0 } }}
        />
      }
    </div>
  }
}

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));


@withSCSS('./photo.scss')
export default class PhotoContainer extends React.Component {
  state = { index: 0 }

  @bind()
  slideRenderer({ index, key }) {
    const { match: { params: { photoid } }, classes } = this.props
    const photoList = FlickPhotoUtil.lastPhotoSnappsot
    const lastIndex = photoList.indexOf(photoid)
    const currentIndex = (lastIndex + index + photoList.length) % photoList.length
    const currentPhotoId = photoList[currentIndex]
    return <PhotoView key={key} photoid={currentPhotoId || photoid} classes={classes} active={index == this.state.index} />
  }

  @bind()
  handleChangeIndex(index) {
    this.setState({ index })
  }

  render() {
    const { classes } = this.props
    const { index } = this.state
    const { match: { params: { photoid } } } = this.props
    const photoList = FlickPhotoUtil.lastPhotoSnappsot
    const lastIndex = photoList.indexOf(photoid)
    const currentIndex = (lastIndex + index + photoList.length) % photoList.length

    return <div className={classes.root} data-transition="photo">
      <VirtualizeSwipeableViews
        overscanSlideAfter={6}
        overscanSlideBefore={7}
        index={this.state.index}
        onChangeIndex={this.handleChangeIndex}
        slideRenderer={this.slideRenderer}
      />
      <PhotoMiniList
        classes={classes}
        index={index}
        currentIndex={currentIndex}
        onChangeIndex={this.handleChangeIndex}
      />
    </div>
  }
}


