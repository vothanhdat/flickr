//@ts-check
import { select, takeEvery, take, put, } from 'redux-saga/effects'
import { updateStateAction, emptyState } from '@/utils/reducerutils'
import RunUtilities from '@/utils/RunUtilities'
import * as flickrAPIs from "@/api/flickr"
import Device from '@/utils/device'



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

    var newWindow = window.open(`https://www.flickr.com/services/oauth/authorize?oauth_token=${oauth_token}&perms=write`);

    const data = yield RunUtilities.WaitForRecieveMsg(newWindow,'flickr')

    yield put(updateStateAction({
      data: data,
      paths: "flickr.oauth",
    }));

    newWindow && newWindow.close();

  } catch (error) { }
}

const initialState = ({ }) => put(updateStateAction({
  data: {
    oauth: {},
  },
  paths: "flickr",
}))


export default function* state() {
  yield takeEvery("@@SAGA", initialState)
  yield takeEvery("FLICKR_LOGIN", login)
}

