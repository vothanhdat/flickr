
//@ts-check
import React, { CSSProperties } from 'react'
import withSCSS from 'withsass.macro'
import { FlickPhoto } from '@/store/connects/flickr'
import { bind } from 'lodash-decorators';
import { Spring, interpolate, animated } from 'react-spring'
import { MouseDrag } from "./MouseDrag";


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
              let t = 1 / (z - 1) * (z / zoomLevel - 1)
              x = originX + (winX - originX) * t;
              y = originY + (winY - originY) * t;
              return `${x * 100}% ${y * 100}%`
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



/**
 * @class
 * @extends React.Component<{photo:FlickrPhotoObj, photoid: string} & ClassesProps>
 */
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
      if (newZoomLevel == 1)
        return { zoomLevel: 1, originX: 0.5, originY: 0.5 };
      const newState = {
        zoomLevel: newZoomLevel,
        winX,
        winY,
        originX: (originX + (winX - originX) / (newZoomLevel - 1) * (ratio - 1)).range(0, 1),
        originY: (originY + (winY - originY) / (newZoomLevel - 1) * (ratio - 1)).range(0, 1),
      }
      return newState
    })
    this.showMiniView();

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
    const { classes } = this.props
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
        {...{ classes, src: scrs }}
      />
      <PhotoZoomMinimap
        {...this.state}
        {...{ classes, src: url_c, style: { opacity: enableMini ? 1 : 0 } }}
      />
    </div>
  }
}

@withSCSS('./photo.scss')
export default class PhotoContainer extends React.Component {
  render() {
    const { match: { params: { photoid } }, classes } = this.props
    return <div className={classes.root} data-transition="photo">
      <PhotoView photoid={photoid} classes={classes} />
    </div>
  }
}


