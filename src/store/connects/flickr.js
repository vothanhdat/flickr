import { connect } from 'react-redux'
import { FLICKR_LOGIN, FLICKT_COLLECTION, FLICKT_PHOTO, FLICKT_USER } from '../actions'
import { get as lodashget } from 'lodash'



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

export const FlickCollection = ({ } = {}) => connect(
  (
    { flickr: { sets = {}, photos = {} } = {} },
    { collectionName }
  ) => {
    const key = collectionName.replace(/\./g, '_');
    const collection = sets[key] || {}
    return {
      photos: {
        ...collection,
        photo: (collection.photo || []).map(e => photos[e])
      }
    }
  },
  (dispatch, props) => ({
    getCollection: FLICKT_COLLECTION(dispatch, props),
  }),
)


export const FlickPhoto = ({ } = {}) => connect(
  (
    { flickr: { photos = {} } = {} },
    { photoid }
  ) => ({
    photo: photos[photoid] || {}
  })
  ,
  (dispatch, props) => ({
    getPhoto: FLICKT_PHOTO(dispatch, props),
  }),
)


export const FlickUser = ({ } = {}) => connect(
  (
    { flickr: { users = {}, photos = {}, albums: { } } = {} },
    { userid }
  ) => ({
    info: lodashget(users, `${userid}.info`, {}),
    stream: lodashget(users, `${userid}.stream.photo`, [])
      .map(e => photos[e]),
    album: lodashget(users, `${userid}.album.photosets`, [])
      .map(e => albums[e]),
  })
  ,
  (dispatch, props) => ({
    getUser: FLICKT_USER(dispatch, props),
  }),
)