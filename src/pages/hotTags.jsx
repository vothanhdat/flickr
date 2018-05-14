import React from 'react';
import { withTranslate, T } from '../components/Language'
import PropTypes from 'prop-types';
import withSCSS from 'withsass.macro';
import StreamListPaper from './feed/StreamListPaper'
import FeedConnect from '../store/connects/feed'
import { Link } from 'react-router-dom'

@FeedConnect()
@withSCSS('./common.scss')
class StreamPageByTag extends React.Component {
  render() {
    const { classes, _, content, Component, datas, match: { params } } = this.props;
    return <div className={classes.root}>
      <div className={classes.component} style={{ fontSize: '0' }}>
        <StreamListPaper
          tagname={params.tags}
          title={params.tags}
        />
      </div>
    </div>
  }
}

export default StreamPageByTag;
