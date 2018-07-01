//@ts-check
import { select, takeEvery, take, put, call, all } from 'redux-saga/effects'
import { updateStateAction, emptyState } from '@/utils/reducerutils'
import RunUtilities from '@/utils/RunUtilities'
import * as flickrAPIs from "@/api/flickr"
import { get as lodashget } from 'lodash'



const requestToken = function* () {

  try {
    const {
      oauth_callback_confirmed,
      oauth_token,
      oauth_token_secret,
    } = yield flickrAPIs.requestToken()

    yield put(updateStateAction({
      data: { oauth_token, oauth_token_secret, oauth_callback_confirmed },
      paths: "flickr.oauth",
    }));

    return { oauth_token, oauth_token_secret, oauth_callback_confirmed }

  } catch (error) { }
}



const login = function* () {

  try {
    RunUtilities.PrepareAsyncWindowOpen({ message: "Loading ..." });

    yield requestToken();

    const { oauth_token } = yield select(state => state.flickr.oauth || {})

    localStorage.setItem('flickr.token', oauth_token);

    var newWindow = window.open(`https://www.flickr.com/services/oauth/authorize?oauth_token=${oauth_token}&perms=write`);
    const data = yield RunUtilities.WaitForRecieveMsg(newWindow, 'flickr')
    newWindow && newWindow.close();

    yield put(updateStateAction({
      data: data,
      paths: "flickr.oauth",
    }));

    const { oauth_verifier, oauth_token_secret } = yield select(state => state.flickr.oauth || {})

    const userData = yield flickrAPIs.exchangeAccessToken({ oauth_verifier, oauth_token, oauth_token_secret });

    yield put(updateStateAction({
      data: userData,
      paths: "flickr.oauth",
    }));

    const newOauthData = yield select(state => state.flickr.oauth || {});

    localStorage.setItem('flickr.oauth', JSON.stringify(newOauthData));
    localStorage.setItem('flickr.tokensecrect', newOauthData.oauth_token_secret);
    localStorage.setItem('flickr.token', newOauthData.oauth_token);


  } catch (error) {
    console.error(error)
  }
}

/**
 * 
 * @param {FlickrPhotoObj[]} photos 
 */
const putPhotoDic = function* (photos) {
  const paths = "flickr.photos"
  yield put(updateStateAction(...photos.map(e => ({
    data: e,
    paths: paths + '.' + e.id,
  }))))
}


const getPhotoCollection = function* (params) {
  let { collectionName = '' } = { ...params.props || {}, ...params.data || {} }

  const paths = "flickr.sets." + collectionName.replace(/\./g, '_')

  const { page = "0", pages, per_page = "20", end, loading, photo = [] } = yield select(state => lodashget(state, paths, {}))

  if (loading || end)
    return;

  try {
    yield put(updateStateAction({
      data: { loading: true },
      paths: paths,
    }))

    const photoDatas = yield flickrAPIs.getCollection({
      collectionName: collectionName,
      page: page + 1,
      per_page
    });

    yield putPhotoDic(photoDatas.photo);

    yield put(updateStateAction({
      data: {
        ...photoDatas,
        photo: [...photo, ...photoDatas.photo.map(e => e.id)],
        end: page >= pages,
        loading: false,
      },
      paths: paths,
    }));

  } catch (error) {
    console.error(error)
  }
}


const downloadFetch = function* (params) {
  yield getPhotoCollection(params)
  yield getPhotoCollection(params)
  yield getPhotoCollection(params)
  yield getPhotoCollection(params)
  yield getPhotoCollection(params)
  yield getPhotoCollection(params)
  yield getPhotoCollection(params)
  yield getPhotoCollection(params)
  yield getPhotoCollection(params)
}



const getPhotoInfo = function* (params) {
  const { photoid = '' } = { ...params.props || {}, ...params.data || {} }
  const paths = "flickr.photos." + photoid

  /**
   * @type {FlickrPhotoObj}
   */
  const photoData = yield select(state => lodashget(state, paths, {}))

  if (photoData.loading)
    return;

  try {

    yield put(updateStateAction({
      data: { loading: true },
      paths: paths,
    }))

    yield all([
      call(function* () {
        const data = yield flickrAPIs.getPhotoSize(photoid)
        yield put(updateStateAction({
          data: data,
          paths: paths,
        }));
      }),
      call(function* () {
        const data = yield flickrAPIs.getPhotoInfo(photoid)
        yield put(updateStateAction({
          data: data,
          paths: paths,
        }));
      }),
    ])


  } catch (error) {
    console.error(error)
    yield put(updateStateAction({
      data: { error: error },
      paths: paths,
    }))
  } finally {
    yield put(updateStateAction({
      data: { loading: false },
      paths: paths,
    }))
  }
}


const getUserPhoto = function* (params) {
  const { get_user_info, userid = '' } = { ...params.props || {}, ...params.data || {} }
  const paths = "flickr.users." + userid
  const { page = "0", pages, perpage: per_page = "20", end, loading, photo = [], user } = yield select(state => lodashget(state, paths, {}))

  if (loading || end)
    return;

  try {

    yield put(updateStateAction({
      data: { loading: true },
      paths: paths,
    }))


    yield all([
      call(function* () {
        const { user, ...photoDatas } = yield flickrAPIs.peopleGetPhotos({
          user_id: userid,
          page: page + 1,
          per_page,
        })
        yield putPhotoDic(photoDatas.photo);
        yield put(updateStateAction({
          data: {
            ...photoDatas,
            photo: [...photo, ...photoDatas.photo.map(e => e.id)],
            end: page >= pages,
          },
          paths: paths,
        }));
      }),

      get_user_info && call(function* () {
        const userData = yield flickrAPIs.peopleGetInfo(userid)
        yield put(updateStateAction({
          data: {
            user: userData.person
          },
          paths: paths,
        }));
      }),

    ])


  } catch (error) {
    console.error(error)
    yield put(updateStateAction({
      data: { error: error },
      paths: paths,
    }))
  } finally {

    yield put(updateStateAction({
      data: { loading: false },
      paths: paths,
    }))

  }
}





const testLogin = function* () {
  try {
    const loginData = yield flickrAPIs.testLogin();

    if (loginData.stat == 'ok')
      yield put(updateStateAction({
        data: loginData.user,
        paths: "flickr.user",
      }));
  } catch (error) {
    console.error(error)
  }
}

const initialState = ({ }) => put(updateStateAction({
  data: {
    user: {},
    oauth: (function () {
      try {
        return JSON.parse(localStorage.getItem('flickr.oauth') || '{}');
      } catch (error) {
        return {};
      }
    })(),
    sets: {},
    photos: {},
    users: {},
  },
  paths: "flickr",
}))


export default function* state() {
  yield takeEvery("@@SAGA", initialState)
  yield takeEvery("@@SAGA", testLogin)
  yield takeEvery("FLICKR_LOGIN", login)
  yield takeEvery("FLICKT_COLLECTION", downloadFetch)
  yield takeEvery("FLICKT_PHOTO", getPhotoInfo)
  yield takeEvery("FLICKT_USER", getUserPhoto)
}

