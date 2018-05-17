import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withTranslate, T } from '../components/Language'
import withSCSS from 'withsass.macro';
import withLazyLoad from '../components/withLazyLoad';
import FeedConnect from '../store/connects/feed'
import ReactList from '../components/ReactList';
import { bind } from 'lodash-decorators';
import StreamItem from './feed/StreamItem';
import StreamList from './feed/StreamList';



@FeedConnect()
@withSCSS('./common.scss')
class Feeds extends React.Component {
  componentDidMount() {
    this.props.fetchHostedList()
  }

  @bind()
  onScrollEnd() {

  }

  render() {
    const { classes, _, content, Component, datas } = this.props;
    return <div className={classes.root}>
      <div className={classes.component} style={{ fontSize: '0' }}>
        <StreamListPaper
          tagname='hot'
          limitrow={2}
          title={<Link to="/stream/hot">Hosted</Link>}
        />
        <StreamListPaper
          tagname='country_VN'
          limitrow={2}
          title={<Link to="/stream/country_VN">Viet Name</Link>}
        />
        <StreamListPaper
          tagname='country_TW'
          limitrow={2}
          title={<Link to="/stream/country_TW">Taiwan</Link>}
        />
        <StreamListPaper
          tagname='country_JP'
          limitrow={2}
          title={<Link to="/stream/country_JP">Japan</Link>}
        />
        <StreamListPaper
          tagname='country_CN'
          limitrow={2}
          title={<Link to="/stream/country_CN">China</Link>}
        />
      </div>
    </div>
  }
}

export default Feeds;
