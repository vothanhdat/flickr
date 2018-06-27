//@ts-check
import React from 'react'
import withSCSS from 'withsass.macro'
import { FlickUser } from '@/store/connects/flickr'
import PhotoListView from './PhotoListView';
import { get as getpath } from 'lodash'


@FlickUser()
class UserView extends React.Component {

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return <PhotoListView photos={getpath(this, "props.user.photo")} classes={this.props.classes} onScrollEnd={this.props.getUser} />
  }
}


@withSCSS('./user.scss')
export default class UserContainer extends React.Component {
  render() {
    const { match: { params: { userid } }, classes } = this.props
    return <div className={classes.root}>
      <UserView userid={userid} classes={classes} />
    </div>
  }
}