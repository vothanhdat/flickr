//@ts-check
import React from 'react'
import { FlickOauth } from '@/store/connects/flickr'
import NewFeeds from './feeds';





@FlickOauth()
export default class extends React.Component {

  render() {
    return <div>
      {/* <button onClick={this.props.login}>Login</button> */}
      {/* <ReactJson src={this.props.oauth} /> */}
      {/* <ReactJson src={this.props.user} /> */}
      {/* <NewFeeds collectionName="flickr.interestingness.getList"/> */}
      <NewFeeds collectionName="flickr.photos.getContactsPhotos"/>
    </div>
  }
}