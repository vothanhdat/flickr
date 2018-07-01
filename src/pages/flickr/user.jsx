//@ts-check
import React from 'react'
import withSCSS from 'withsass.macro'
import { FlickUser } from '@/store/connects/flickr'
import PhotoListView from './PhotoListView';
import { get as getpath } from 'lodash'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LangLink from '@/components/Link';
import SwipeableViews from 'react-swipeable-views';
import AlbumListView from './AlbumListView';

@FlickUser()
class UserStream extends React.Component {

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return <PhotoListView
      photos={getpath(this, "props.stream")}
      classes={this.props.classes}
      onScrollEnd={this.props.getUser}
    />
  }
}


@FlickUser()
class UserAlbum extends React.Component {

  componentDidMount() {
    this.props.getAlbum();
  }

  render() {
    return <AlbumListView
      albums={getpath(this, "props.albums",[])}
      classes={this.props.classes}
      onScrollEnd={this.props.getAlbum}
    />
  }
}



/**
 * @class
 * @extends {React.Component<{user:{user: FlickrUserObj}} & ClassesProps>}
 */
@FlickUser()
class UserCover extends React.Component {

  componentDidMount() {
    this.props.getUser({ get_user_info: true });
  }

  render() {
    const { classes } = this.props
    /**@type {FlickrUserObj} */
    const userInfo = getpath(this, "props.info", {});
    const { retina, large, medium, default: ddd } = userInfo.iconurls || {}
    const { h, l, s, t } = userInfo.coverphoto_url || {};
    return <div className={classes.coverroot} style={{ backgroundImage: `url(${h || l || s || t})` }}>
      <div className={classes.info}>
        <img src={retina || large || medium || ddd} className={classes.avatar} />
        <div className={classes.text}>
          <div className={classes.line1}>
            <span className={classes.name}>{(userInfo.realname || {})._content}</span>
          </div>
          <div className={classes.line2}>
            {/* <span className={classes.des}>{(userInfo.description || {})._content}</span> */}
          </div>
        </div>
      </div>
    </div>
  }
}




@withSCSS('./user.scss')
export default class UserContainer extends React.Component {

  render() {
    const { match: { params: { userid } }, location: { hash }, classes } = this.props
    const tabValue = ["", "#album", "#fav"].indexOf(hash)
    return <div className={classes.root}>
      <UserCover userid={userid} classes={classes} />
      <Tabs className={classes.nav} value={tabValue > -1 ? tabValue : 0}>
        <Tab label="Photo Stream" component={LangLink} to={`/flickr/u/${userid}`} />
        <Tab label="Albums" component={LangLink} to={`/flickr/u/${userid}#album`} />
        <Tab label="Faves" component={LangLink} to={`/flickr/u/${userid}#fav`} />
      </Tabs>
      <SwipeableViews
        axis='x'
        index={tabValue}
      >
        <UserStream userid={userid} classes={classes} />
        <UserAlbum userid={userid} classes={classes} />
      </SwipeableViews>
    </div >
  }
}