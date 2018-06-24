import React from 'react'
import withSCSS from 'withsass.macro';
import HLSPLayer from '@/components/VideoPlayer/HLSPLayer'
import FlvPLayer from '@/components/VideoPlayer/FlvPLayer'
import ProfileConnect from '@/store/connects/profile'
import { connect } from 'react-redux'
import utils from '@/utils/utils'





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
    return <FlvPLayer src={profile.flv || ''} poster={utils.getImageURL(profile.avatar,'300')}/>
  }
}