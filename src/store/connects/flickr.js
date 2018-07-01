import { connect } from 'react-redux'
import { FLICKR_LOGIN, FLICKT_COLLECTION, FLICKT_PHOTO, FLICKT_USER, FLICKT_USER_ALBUM, FLICKT_USER_FAV, FLICKT_ALBUM } from '../actions'
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
    { flickr: { users = {}, photos = {}, albums = {} } = {} },
    { userid }
  ) => ({
    userinfo: lodashget(users, `${userid}.info`, {}),
    stream: lodashget(users, `${userid}.stream.photo`, [])
      .map(e => photos[e]),
    albums: lodashget(users, `${userid}.album.photoset`, [])
      .map(e => albums[e]),
    fav: lodashget(users, `${userid}.fav.photo`, [])
      .map(e => photos[e]),
  })
  ,
  (dispatch, props) => ({
    getUser: FLICKT_USER(dispatch, props),
    getAlbum: FLICKT_USER_ALBUM(dispatch, props),
    getFav: FLICKT_USER_FAV(dispatch, props),
  }),
)

export const FlickAlbum = ({ } = {}) => connect(
  (
    { flickr: { photos = {}, albums = {} } = {} },
    { albumid }
  ) => ({
    album: albums[albumid] || {},
    photos: lodashget(albums, `${albumid}.photo`,[])
      .map(e => photos[e]),
  })
  ,
  (dispatch, props) => ({
    getAlbumPhoto: FLICKT_ALBUM(dispatch, props),
  }),
)