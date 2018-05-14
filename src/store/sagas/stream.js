//@ts-check
import { select, takeEvery, take, put, } from 'redux-saga/effects'
import { updateStateAction, emptyState } from '../../utils/reducerutils'
import { get as getpath } from 'lodash'
import Device from '../../utils/device'
import RoomAPI from '../../api/requests/RoomAPI'
import fromPairs from 'lodash/fromPairs'
import { fetchprofile } from './profile'

const fetchstream = function* (params) {
  let { uid, roomid } = { ...params.props || {}, ...params.data || {} }

  const actionName = `roomdata.${uid}`
  const feeddata = yield select(state => getpath(state, ['feeddata', uid]) || {})

  if (feeddata.fetchingstream)
    return;

  try {
    yield put(updateStateAction({
      data: { fetchingstream: true },
      paths: "feeddata." + uid,
      actionName,
    }))

    if (Device.isSPA)
      return;

    if (!roomid)
      roomid = yield select(state => getpath(state, ['feeddata', uid, 'chatroomid']) || null)

    if (!roomid) {
      yield fetchprofile({ data: { uid } })
      roomid = yield select(state => getpath(state, ['feeddata', uid, 'chatroomid']) || null)
    }

    if (!roomid) {

    }

    let roomdata = yield RoomAPI.enterRoom(roomid)

    yield put(updateStateAction({
      data: { ...roomdata, fetchingstream: false },
      paths: "feeddata." + uid,
      actionName,
    }))

  } catch (error) {
    yield put(updateStateAction({
      data: { fetchingstream: false, error: error + '' },
      paths: "feeddata." + uid,
      actionName,
    }))
  }
}


export default function* state() {
  yield takeEvery("FETCH_STREAM", fetchstream)
}

