import React from 'react'
import withSCSS from 'withsass.macro';
import HLSPLayer from './HLSPLayer'
import ProfileConnect from '../store/connects/profile'
import { connect } from 'react-redux'
import utils from '../utils/utils'





@connect(
  (state, { match: { params: { uid, roomid } } }) => ({ uid, ...roomid ? { roomid } : {} })
)
@ProfileConnect()
export default class extends React.Component {
  componentDidMount() {
    this.props.fetchstream()
  }
  render() {
    const { profile } = this.props
    return <HLSPLayer src={profile.m3u8 || ''} poster={utils.getImageURL(profile.avatar,'300')}/>
  }
}