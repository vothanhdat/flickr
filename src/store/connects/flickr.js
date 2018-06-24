import { connect } from 'react-redux'
import { FLICKR_LOGIN } from '../actions'


export default ({ } = {}) => connect(
  ({ flickr: { oauth = {} } = {} }, props) => {
    return ({
      oauth,
    })
  },
  (dispatch, props) => ({
    login: FLICKR_LOGIN(dispatch, props),
  }),
)
