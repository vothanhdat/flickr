//@ts-check
import React from 'react'
import flickrConnect from '@/store/connects/flickr'
import withSCSS from 'withsass.macro'
import ReactJson from 'react-json-view'
import { withTranslate } from '@/components/Language'





@withTranslate
@withSCSS('../common.scss')
@flickrConnect()
export default class extends React.Component {

  render(){

    return <div>
      <button onClick={this.props.login}>Login</button>
       <ReactJson src={this.props.oauth}/>
    </div>
  }
}