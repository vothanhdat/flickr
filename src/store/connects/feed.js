import { connect } from 'react-redux'
import { FETCH_STREAM_LIST } from '../actions'


export default ({ } = {}) => connect(
  ({ feed: { default: defaultFeed, ...feeds } = {}, feeddata = {}, caching = {} }, props) => {
    const { tagname } = props || {}
    const { datas } = feeds[tagname] || {}
    return ({
      ...defaultFeed,
      ...feeds[tagname] || {},
      datas: (datas || []).map(e => ({thumb: caching[feeddata[e].avatar], ...feeddata[e]}) || {}),
    })
  },
  (dispatch, props) => ({
    fetch: FETCH_STREAM_LIST(dispatch, props),
    fetchappend: () => 0
  }),
)
