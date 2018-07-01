//@ts-check
import React from 'react'
import withSCSS from 'withsass.macro'
import { FlickAlbum } from '@/store/connects/flickr'
import PhotoListView from './PhotoListView';
import { get as getpath } from 'lodash'


@FlickAlbum()
class Album extends React.Component {

  componentDidMount() {
    this.props.getAlbumPhoto();
  }

  render() {
    return <PhotoListView
      photos={getpath(this, "props.photos")}
      classes={this.props.classes}
      onScrollEnd={this.props.getAlbumPhoto}
    />
  }
}


@withSCSS('./album.scss')
export default class AlbumContainer extends React.Component {
  render() {
    const { match: { params: { albumid } }, classes } = this.props
    return <div className={classes.root}>
      <Album albumid={albumid} classes={classes} />
    </div >
  }
}