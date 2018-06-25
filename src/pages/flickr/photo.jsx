//@ts-check
import React from 'react'
import withSCSS from 'withsass.macro'
import { FlickPhoto } from '@/store/connects/flickr'

/**
 * @class
 * @extends React.Component<{photo:FlickrPhotoObj, photoid: string} & ClassesProps>
 */
@withSCSS('../common.scss', './photo.scss')
@FlickPhoto()
class PhotoView extends React.Component {


  render() {
    const { classes } = this.props
    const { url_h, url_c, } = this.props.photo
    const bgs = [url_h, url_c]
      .filter(e => e)
      .map(e => e && `url(${e})`)
      .join(',')
    return <div className={classes.photoroot}>
      <div className={classes.mainimg} style={{
        backgroundImage: bgs
      }} />
    </div>
  }
}

export default class PhotoContainer extends React.Component {
  render() {
    const { match: { params: { photoid } } } = this.props
    return <PhotoView photoid={photoid} />
  }
}