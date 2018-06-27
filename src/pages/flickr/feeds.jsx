//@ts-check
import React from 'react'
import { FlickCollection } from '@/store/connects/flickr'
import withSCSS from 'withsass.macro'
import { get as getpath } from 'lodash'
import PhotoListView from './PhotoListView';

/**
 * @class
 * @extends React.Component<{photos:{photo:FlickrPhotoObj[]},collectionName:string} & ClassesProps,{rows:FlickrPhotoObj[][]}>
 */
@withSCSS('../common.scss', './feeds.scss')
@FlickCollection()
export default class PhotoFeeds extends React.Component {

  componentDidMount() {
    this.props.getCollection();
  }

  render() {
    return <PhotoListView photos={getpath(this, "props.photos.photo")} classes={this.props.classes} />
  }
}