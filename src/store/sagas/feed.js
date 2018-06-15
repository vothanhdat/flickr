//@ts-check
import { select, takeEvery, take, put, } from 'redux-saga/effects'
import { updateStateAction, emptyState } from '../../utils/reducerutils'
import { get as getpath } from 'lodash'
import Device from '../../utils/device'
import FeedAPIs from '../../api/requests/FeedAPI'
import fromPairs from 'lodash/fromPairs'
const fetchNumber = 10


const fetchList = function* (params) {
  console.log({ ...params })
  const { append, tagname } = params.data

  const { datas, loading } = yield select(state => state.feed[tagname] || state.feed.default)
  const feeddata = yield select(state => state.feeddata || {})

  if (loading)
    return;

  try {
    yield put(updateStateAction({
      data: { loading: true },
      paths: "feed." + tagname,
    }))

    if (Device.isSPA)
      return;
    const [tag1, tag2] = tagname.split('_')
    let result;
    switch (tag1) {
      case "hot":
        result = yield FeedAPIs.fetchHostList({ page: 1, countryCode: 'VN', pageSize: 24 });
        break;
      case "country":
        result = yield FeedAPIs.fetchStreamByCountry({ countryCode: tag2, page: 1, pageSize: 24 });
        break;
    }
    const { banners, infos } = result

    yield put(updateStateAction(
      {
        data: {
          datas: infos.map(e => e.uid),
          banners: banners,
          error: '',
          end: datas.length < fetchNumber,
          loading: false,
        },
        paths: "feed." + tagname,
        reducer: (preState = {}, newState = {}) => ({
          ...newState,
          datas: append
            ? [...preState.datas || [], ...newState.datas || []]
            : newState.datas
        })
      },
      {
        data: fromPairs(infos.map(e => ([
          e.uid,
          { ...feeddata[e.uid] || {}, ...e }
        ]))),
        paths: "feeddata",
      },
    ))

  } catch (error) {
    yield put(updateStateAction({
      data: {
        loading: false,
        error: error + ''
      },
      paths: "feed." + tagname,
    }))
  }
}


const initialState = ({ }) => put(updateStateAction(
  {
    data: {
      datas: [],
      banners: [],
      end: false,
      loading: false,
      error: '',
    },
    paths: "feed.default",
  },
  {
    data: {},
    paths: "feeddata",
  }
))


export default function* state() {
  yield takeEvery("@@SAGA", initialState)
  yield takeEvery("FETCH_STREAM_LIST", fetchList)
}

