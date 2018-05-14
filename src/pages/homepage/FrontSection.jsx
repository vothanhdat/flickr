import React from 'react'
import withSCSS from 'withsass.macro'
import { withTranslate, T } from '../../components/Language'
import AutoVideo from 'react-collections/AutoVideo'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import blogStateConnect from '../../store/connects/blog'
import { getWeeklyUpdateByLanguage } from '../../store/selects/blog'
import Link from '../../components/Link'

import { popupContent } from '../../components/Popup';
import IframeYoutube from 'react-collections/IframeYoutube';

import CircularProgress from 'material-ui/Progress/CircularProgress'
import BgAnimation from 'react-collections/BgAnimation'

// import {datas as newDatas} from './Section14_News'




@blogStateConnect({ max: 4, selectFunction: getWeeklyUpdateByLanguage })
class FrontNews extends React.PureComponent {


  componentDidMount() {
    this.props.fetchNewPost()
  }

  componentDidUpdate(oldProps) {
    this.props.autoFetchMore(oldProps, this.props)
  }

  render() {
    const { classes, _, posts = [], loading } = this.props

    return <List component="nav" >
      <ListItem className={classes.largeitem}>
        <ListItemText primary={<Button variant="raised" color="secondary" className={classes.blackbut}>
          {_(T.menu_updates)}
        </Button>} />
      </ListItem>
      {
        posts.map((e, i) => <ListItem button key={i}
          component={Link}
          to={`/blog/${e.uniqueSlug}`}>
          <ListItemText primary={e.title} />
        </ListItem>)
      }
      {
        posts.length == 0 && loading && <CircularProgress className={classes.loadanimation} />
      }
      <ListItem className={classes.largeitem}>
        <ListItemText primary={<Button color="primary" component={Link} to="/blog">
          {_(T.view_more)}
        </Button>} />
      </ListItem>
    </List>
  }
}



@withTranslate
@withSCSS('../common.scss', './FrontSection.scss')
class FrontSection extends React.PureComponent {

  onPlayVideo = (e) => {
    if (innerWidth < 1100)
      return;
    e.preventDefault();

    const { classes, _ } = this.props

    popupContent({
      title: _(T.main_videotitle),
      classes: { paper: classes.videopopcon },
      Component: ({ onClose }) => <IframeYoutube
        src={'ZzHy0r9NPcU'}
        className={classes.videopop}
        controls
        autoplay />
    })
  }

  render() {
    const { classes, _ } = this.props
    return <div className={classes.root} id='home' >
      {/* <img
        src='/video-pre.jpg'
        className={classes.bgvideo} /> */}
      <div className={classes.overlay}>
        <div className={classes.container}>
          <div className={classes.overlaycontent}>
            <div className={classes.bigtitle}>GIFTO</div>
            <div className={classes.bigdes}>{_(T.main_title)}</div>
            <p>
              <Button component="a" target="_blank" rel="noopener" href="https://youtu.be/ZzHy0r9NPcU" onClick={this.onPlayVideo} variant="raised" className={classes.watchvideo} color="secondary">
                {_(T.watch_video)}
              </Button>
            </p>
          </div>
          <div className={classes.overlaynews}>
            {/* <BgAnimation opacity={0.2} color="#bb88ff" radius={3} max_particles={30} maxdistance={200}/> */}
            <FrontNews {...this.props} />
          </div>
        </div>
      </div>

    </div>
  }
}



export default FrontSection

