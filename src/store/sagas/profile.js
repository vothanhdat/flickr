//@ts-check
import { select, takeEvery, take, put, } from 'redux-saga/effects'
import { updateStateAction, emptyState } from '../../utils/reducerutils'
import { get as getpath } from 'lodash'
import Device from '../../utils/device'
import ProfileAPI from '../../api/uplive/ProfileAPI'


const fetchprofile = function* (params) {
  const { uid } = { ...params.props || {}, ...params.data || {} }
  const actionName = `profiledata.${uid}`

  const feeddata = yield select(state => getpath(state, ['feeddata', uid]) || {})

  if (feeddata.fetchingprofile)
    return;

  try {
    yield put(updateStateAction({
      data: { fetchingprofile: true },
      paths: "feeddata." + uid,
      actionName,
    }))

    if (Device.isSPA)
      return;
    let profile = yield ProfileAPI.getProfile(uid)

    yield put(updateStateAction({
      data: { ...profile, fetchingprofile: false },
      paths: "feeddata." + uid,
      actionName,
    }))

  } catch (error) {
    yield put(updateStateAction({
      data: { fetchingprofile: false, error: error + '' },
      paths: "feeddata." + uid,
      actionName,
    }))
  }
}

export {fetchprofile}


export default function* state() {
  yield takeEvery("FETCH_PROFILE", fetchprofile)
}

