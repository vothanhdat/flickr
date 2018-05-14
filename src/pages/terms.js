import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withTranslate, T } from '../components/Language'
import withSCSS from 'withsass.macro';
import withLazyLoad from '../components/withLazyLoad';



// @withTranslate
@withLazyLoad(
  {
    content: ({ language: { name = '' } }) => import(
      /* webpackChunkName: "termofuse" */
      `raw-loader!../../content/termsofuse.${name}.md`
    ),
    Component: () => import(
      /* webpackChunkName: "markdown" */
      'react-markdown'
    )
  },
  { content: ' ' }
)
@withSCSS('./common.scss', './content.scss')
class Terms extends React.Component {

  render() {
    const { classes, _, content, Component } = this.props;
    return <div className={classes.root}>
      <div className={classes.markdown}>
        <Component source={content} />
      </div>
    </div>
  }
}

export default Terms;
