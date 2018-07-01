//@ts-check
import React from 'react'
import withSCSS from 'withsass.macro'
import { FlickAlbum } from '@/store/connects/flickr'
import PhotoListView from './PhotoListView';
import { get as getpath } from 'lodash'


@FlickAlbum()
class Album extends React.Component {

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return <PhotoListView
      photos={getpath(this, "props.photos")}
      classes={this.props.classes}
      onScrollEnd={this.props.getUser}
    />
  }
}


@withSCSS('./user.scss')
export default class UserContainer extends React.Component {
  render() {
    const { match: { params: { userid } }, location: { hash }, classes } = this.props
    const tabValue = ["", "#album", "#fav"].indexOf(hash)
    return <div className={classes.root}>
      <Album userid={userid} classes={classes} />
    </div >
  }
}