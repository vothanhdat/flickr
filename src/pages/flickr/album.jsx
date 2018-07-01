//@ts-check
import React from 'react'
import withSCSS from 'withsass.macro'
import { FlickAlbum } from '@/store/connects/flickr'
import PhotoListView, { FlickPhotoUtil } from './PhotoListView';
import { get as getpath } from 'lodash'


@FlickAlbum()
class Album extends React.Component {

  componentDidMount() {
    this.props.getAlbumPhoto();
  }

  render() {
    const { photos = {}, classes } = this.props

    return <React.Fragment>
      <PhotoListView
        photos={photos.photo || []}
        classes={this.props.classes}
        onScrollEnd={this.props.getAlbumPhoto}
      />
      {
        photos.end || <div
          className={{
            [classes.loadcontainer]: true,
            'dot-loading': photos.loading
          }} />
      }
    </React.Fragment>

  }
}

const getCover = data => `https://farm${data.farm}.staticflickr.com/${data.server}/${data.primary}_${data.secret}.jpg`



@FlickAlbum()
class AlbumCover extends React.Component {

  cover() {
    const covers = []
    const { farm, server, primary } = this.props.album || {}
    const { photos } = this.props

    if (farm && server && primary)
      covers.push(getCover(this.props.album));

    if (photos.photo) {
      var item = photos.photo[0];// FlickPhotoUtil.getNearestRatio(this.props.photos, 2)
      if (item)
        covers.push(item.url_o, item.url_k, item.url_l, item.url_c);
    }

    return covers.filter(e => e);
  }

  render() {
    const { classes } = this.props
    return <div
      className={classes.albumcover}
      style={{ backgroundImage: this.cover().map(e => `url(${e})`).join(',') }}>
    </div>
  }
}



@withSCSS('./album.scss')
export default class AlbumContainer extends React.Component {
  render() {
    const { match: { params: { albumid } }, classes } = this.props
    return <div className={classes.root}>
      <AlbumCover albumid={albumid} classes={classes} />
      <Album albumid={albumid} classes={classes} />
    </div >
  }
}