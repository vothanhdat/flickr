import PB from './protos'
import pbajax from './pbajax'
// import Login from '../Login'


const processLiveMsg = function (string, ext = 'flv') {
  var Ob = JSON.parse(string || '{}') || {}
  return Ob && Object.values(Ob).find(e => e && (e + "").endsWith(ext))
}

const noop = () => null

const addVideoLink = function(infos){

  for (var info of infos) {
    if(!info)
      continue;
    var flvLink = processLiveMsg(info.liveMsg)
    info.flv = flvLink
    info.m3u8 = flvLink && flvLink.replace('.flv', '.m3u8')//.replace('-hdl','-hls')
    info.rtmp = flvLink && flvLink.replace('.flv', '').replace('http://', 'rtmp://')//replace('-hdl.', '-rtmp.')
  }
  
}

const FeedRequests = {

  fetchHostList: async function ({page, pageSize = 20, countryCode}, progress = noop) {
    let {Feed: {HotList: {Request, Response}}} = PB

    let result = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/feed/hot/list',  // java api
      },
      new Request({ page, pageSize, countryCode }),
      progress
    )
    try {
      var {infos, banners} = Response.decode(result)
      addVideoLink(infos)
      return pbajax.getPlainObject({infos,banners})
    } catch (e) {
      return {infos : [],banners : []}
    }
  },


  fetchFollowList: async function ({page, pageSize = 20}, progress = noop) {
    let {Feed: {FollowList: {Request, Response}}} = PB

    let result = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/feed/follow/list',  // java api
      },
      new Request({ page, pageSize }),
      progress,
      true,
    )

    try {
      var {infos,banners} = Response.decode(result)
      addVideoLink(infos)
      return pbajax.getPlainObject({infos,banners})
    } catch (e) {
      return {infos : [],banners : []}
    }
  },

  fetchStreamByCountry : async function({page, pageSize = 20, countryCode}, progress = noop){
    let {Country:{LiveList:{Request,Response}}} = PB
    
    let result = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/country/live/list',  // java api
      },
      new Request({ page,pageSize,country :countryCode }),
      progress
    )
    try {
      var {infos,banners} = Response.decode(result)
      addVideoLink(infos)
      return pbajax.getPlainObject({infos,banners})
    } catch (e) {
      return {infos : [],banners : []}
    }
  },


  fetchHostSuggestList :async function(){
    let {Ranking:{HostSuggest:{Request,Response}}} = PB

    let result = await pbajax.do(
      {
        service: 'event', // java service name
        api: '/ranking/host/suggest',  // java api
      },
      new Request({type : 1 })
      
    )
    var {topHostInfoList} = Response.decode(result)

    return pbajax.getPlainObject(topHostInfoList)
  },
}

export default FeedRequests
