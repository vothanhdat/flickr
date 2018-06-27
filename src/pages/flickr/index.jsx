//@ts-check
import React from 'react'
import { FlickOauth } from '@/store/connects/flickr'
import withSCSS from 'withsass.macro'
import { withTranslate } from '@/components/Language'
import NewFeeds from './feeds';




// @withSCSS('../common.scss')
// @withTranslate

@FlickOauth()
export default class extends React.Component {

  render() {
    return <div>
      {/* <button onClick={this.props.login}>Login</button>
      <ReactJson src={this.props.oauth} />
      <ReactJson src={this.props.user} /> */}
      {/* <NewFeeds collectionName="flickr.interestingness.getList"/> */}
      <NewFeeds collectionName="flickr.photos.getContactsPhotos"/>
    </div>
  }
}