//@ts-check
import { select, takeEvery, take, put, } from 'redux-saga/effects'
import { updateStateAction, emptyState } from '@/utils/reducerutils'
import RunUtilities from '@/utils/RunUtilities'
import * as flickrAPIs from "@/api/flickr"



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


const getNewFeedPhotos = function* () {
  try {
    const photoDatas = yield flickrAPIs.getContactsPhotos({});
    yield put(updateStateAction({
      data: photoDatas,
      paths: "flickr.sets.newfeed",
    }));
  } catch (error) {
    console.error(error)
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
  },
  paths: "flickr",
}))


export default function* state() {
  yield takeEvery("@@SAGA", initialState)
  yield takeEvery("@@SAGA", testLogin)
  yield takeEvery("FLICKR_LOGIN", login)
  yield takeEvery("FLICKR_NEWFEED", getNewFeedPhotos)
}

