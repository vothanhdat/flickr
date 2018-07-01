//@ts-check
import React from 'react'
import withSCSS from 'withsass.macro'
import { FlickUser } from '@/store/connects/flickr'
import PhotoListView from './PhotoListView';
import { get as lodashget } from 'lodash'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AlbumListView from './AlbumListView';
import SwipeableViewsExtends from './SwipeableViews';
import { bind } from 'lodash-decorators';

@FlickUser()
class UserStream extends React.Component {

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { classes, stream = {} } = this.props
    console.log("UserStream")
    return <React.Fragment>
      <PhotoListView
        photos={stream.photo || []}
        classes={classes}
        onScrollEnd={this.props.getUser}
      />
      {
        stream.end || <div
          className={{
            [classes.loadcontainer]: true,
            'dot-loading': stream.loading
          }} />
      }
    </React.Fragment>
  }
}
//<div className={{[classes.loadcontainer]:true,'dot-loading' : }}/>

@FlickUser()
class UserFav extends React.Component {

  componentDidMount() {
    this.props.getFav();
  }

  render() {
    const { classes, fav = {} } = this.props
    console.log("UserFav")
    return <React.Fragment>
      <PhotoListView
        photos={fav.photo || []}
        classes={classes}
        onScrollEnd={this.props.getFav}
      />
      {
        fav.end || <div
          className={{
            [classes.loadcontainer]: true,
            'dot-loading': fav.loading
          }} />
      }
    </React.Fragment>

  }
}


@FlickUser()
class UserAlbum extends React.Component {

  componentDidMount() {
    this.props.getAlbum();
  }

  render() {
    const { classes, albums = {} } = this.props
    console.log("UserAlbum")
    return <React.Fragment>
      <AlbumListView
        albums={albums.photoset || []}
        classes={classes}
        onScrollEnd={this.props.getAlbum}
      />
      {
        albums.end || <div
          className={{
            [classes.loadcontainer]: true,
            'dot-loading': albums.loading
          }} />
      }
    </React.Fragment>


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
    const userInfo = lodashget(this, "props.userinfo", {});
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

  /**
   * @param {MouseEvent} e
   */
  @bind()
  onTabClick(e) {
    this.props.history.replace(e.currentTarget.dataset.to);
  }

  render() {
    const { match: { params: { userid } }, location: { hash }, classes } = this.props
    const tabValue = ["", "#album", "#fav"].indexOf(hash)
    return <div className={classes.root}>
      <UserCover userid={userid} classes={classes} />
      <Tabs className={classes.nav} value={tabValue > -1 ? tabValue : 0}>
        <Tab label="Photo Stream" onClick={this.onTabClick} data-to={`/flickr/u/${userid}`} />
        <Tab label="Albums" onClick={this.onTabClick} data-to={`/flickr/u/${userid}#album`} />
        <Tab label="Faves" onClick={this.onTabClick} data-to={`/flickr/u/${userid}#fav`} />
      </Tabs>
      <SwipeableViewsExtends
        axis='x'
        index={tabValue}
      >
        <UserStream userid={userid} classes={classes} />
        <UserAlbum userid={userid} classes={classes} />
        <UserFav userid={userid} classes={classes} />
      </SwipeableViewsExtends>
    </div >
  }
}