import React from 'react';
import { withTranslate, T } from '../components/Language'
import PropTypes from 'prop-types';
import withSCSS from 'withsass.macro';
import StreamListPaper from './feed/StreamListPaper'
import FeedConnect from '../store/connects/feed'
import {Link} from 'react-router-dom'

@FeedConnect()
@withSCSS('./common.scss')
class StreamHomePage extends React.Component {

  render() {
    const { classes, _, content, Component, datas } = this.props;
    return <div className={classes.root}>
      <div className={classes.component} style={{ fontSize: '0' }}>
        <StreamListPaper
          tagname='hot'
          limitrow={2}
          title={<Link to="/hot/hot">Hosted</Link>}
        />
        <StreamListPaper
          tagname='country_VN'
          limitrow={2}
          title={<Link to="/hot/country_VN">Viet Nam</Link>}
        />
        <StreamListPaper
          tagname='country_TW'
          limitrow={2}
          title={<Link to="/hot/country_TW"> Taiwan</Link>}
        />
        <StreamListPaper
          tagname='country_JP'
          limitrow={2}
          title={<Link to="/hot/country_JP"> Japan</Link>}
        />
        <StreamListPaper
          tagname='country_CN'
          limitrow={2}
          title={<Link to="/hot/country_CN">China</Link>}
        />
      </div>
    </div>
  }
}

export default StreamHomePage;
