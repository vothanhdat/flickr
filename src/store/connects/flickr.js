import { connect } from 'react-redux'
import { FLICKR_LOGIN, FLICKR_NEWFEED } from '../actions'



export const FlickOauth = ({ } = {}) => connect(
  ({ flickr: { oauth = {}, user = {} } = {} }) => {
    return ({
      oauth,
      user,
      isLoged: user && !user.id,
    })
  },
  (dispatch, props) => ({
    login: FLICKR_LOGIN(dispatch, props),
  }),
)

export const FlickCollection = ({} = {}) => connect(
  ({ flickr: {
    sets = {},
    photos = {}
  } = {} }, {
    collectionName
  }) => {
    const key = collectionName.replace(/\./g, '_');
    const collection = sets[key] || {}
    return ({
      photos: {
        ...collection,
        photo: (collection.photo || []).map(e => photos[e])
      }
    })
  },
  (dispatch, props) => ({
    getCollection: FLICKR_NEWFEED(dispatch, props),
  }),
)
