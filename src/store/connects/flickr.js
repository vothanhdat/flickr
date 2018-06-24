import { connect } from 'react-redux'
import { FLICKR_LOGIN, FLICKR_NEWFEED } from '../actions'


export default ({ } = {}) => connect(
  ({ flickr: { oauth = {}, user = {}, sets = {} } = {} }, props) => {
    return ({
      oauth,
      user,
      isLoged : user && !user.id,
      feeds: sets && sets.newfeed,
    })
  },
  (dispatch, props) => ({
    login: FLICKR_LOGIN(dispatch, props),
    getNewFeed: FLICKR_NEWFEED(dispatch, props),
  }),
)
