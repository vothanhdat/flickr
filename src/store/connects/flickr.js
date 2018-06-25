import { connect } from 'react-redux'
import { FLICKR_LOGIN, FLICKR_NEWFEED } from '../actions'


export default ({ } = {}) => connect(
  ({ flickr: { oauth = {}, user = {}, sets: {newfeed = {}} = {} = {}, photos = {} } = {} }, props) => {
    return ({
      oauth,
      user,
      isLoged: user && !user.id,
      feeds: {
        ...newfeed,
        photo : (newfeed.photo || []).map(e => photos[e])
      }
    })
  },
  (dispatch, props) => ({
    login: FLICKR_LOGIN(dispatch, props),
    getNewFeed: FLICKR_NEWFEED(dispatch, props),
  }),
)
