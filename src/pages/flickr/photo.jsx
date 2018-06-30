//@ts-check
import React, { CSSProperties } from 'react'
import withSCSS from 'withsass.macro'
import { FlickPhoto } from '@/store/connects/flickr'
import { bind } from 'lodash-decorators';
import { Spring, interpolate, animated } from 'react-spring'


Number.prototype.range = Number.prototype.range || function (a, b) {
  return Math.max(a, Math.min(b, this || a));
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
  }

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
        originX: (originX + (winX - originX) / (newZoomLevel - 1) * (ratio - 1)).range(0, 1),
        originY: (originY + (winY - originY) / (newZoomLevel - 1) * (ratio - 1)).range(0, 1),
      }
      return newState
    })
  }

  componentDidMount() {
    this.props.getPhoto();
  }

  // /**
  //  * @returns {CSSProperties}
  //  */
  // getZoomStyle(state) {
  //   const { originX, originY, zoomLevel } = state || this.state
  //   return {
  //     transformOrigin: `${originX * 100}% ${originY * 100}%`,
  //     transform: `scale(${zoomLevel})`,
  //   }
  // }

  render() {
    const { classes } = this.props
    const { url_h, url_c, } = this.props.photo
    const { zoomLevel, originY, originX } = this.state
    const bgs = [url_h, url_c]
      .filter(e => e)
      .map(e => e && `url(${e})`)
      .join(',')
    return <div className={classes.photoroot} onWheel={this.onWheel}>
      <Spring native to={{ zoomLevel, originY, originX }} config={{ duration: 100 }}>
        {({ zoomLevel }) => <animated.div
          className={classes.mainimg}
          style={{
            backgroundImage: bgs,
            // transformOrigin: interpolate(
            //   [originX, originY],
            //   (originX, originY) => `${originX * 100}% ${originY * 100}%`
            // ),
            transformOrigin: `${originX * 100}% ${originY * 100}%`,
            transform: zoomLevel.interpolate(t => `scale(${t})`),
          }}
        />}
      </Spring>
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