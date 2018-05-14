import { connect } from 'react-redux'
import { FETCH_PROFILE, FETCH_STREAM } from '../actions'


export default ({ } = {}) => connect(
  ({ feeddata = {} }, props) => {
    const { uid } = props || {}
    return ({
      profile: feeddata[uid] || {}
    })
  },
  (dispatch, props) => ({
    fetchprofile: FETCH_PROFILE(dispatch, props),
    fetchstream: FETCH_STREAM(dispatch, props),
  }),
)
