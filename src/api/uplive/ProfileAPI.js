import PB from './protos'
import pbajax from './pbajax'

const noop = () => null

const ProfileAPI = {

  getProfile: async function (uid, progress = (e) => null) {
    let {Profile: {Get: {Request, Response}}} = PB
    // if(uid && parseInt(uid) != uid)
    //    throw {err : ERROR.WRONG_UID ,data : {uid}}
    if(uid == pbajax.uid)
      uid = 0;

    let result = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/profile/get',  // java api
      },
      new Request({vuid: uid || 0 }),
      progress,
    )

    let {profile,userLabels} = Response.decode(result)

    // if(!profile.uid)
    //   throw {err : ERROR.WRONG_UID ,data : {vuid: uid || 0 }}

    return pbajax.getPlainObject({...profile,userLabels : userLabels.map(e => e.label)})

  },


  setProfile: async function (data, progress = noop) {
    let {Profile: {Set: {Request}}} = PB
    let ProfileSetData = new Request(data)

    await pbajax.do(
      {
        service: 'service', // java service name
        api: '/profile/set',  // java api
      },
      ProfileSetData,
      progress,
      true,
    )

  },

  /**
   * @return {PB.FollowInfo[]}
   */
  getFans: async function ({userId = pbajax.uid, page = 1, pageSize = 20} = {}, progress = noop) {

    let { Follow: {FansList: {Request, Response}}} = PB

    let FansData = new Request({
      vuid: userId,
      page,
      pageSize
    })

    var responsedata = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/follow/fans/list',  // java api
      },
      FansData,
      progress,
    )

    try {
      var {infos} = Response.decode(responsedata)
      return pbajax.getPlainObject(infos)
    } catch (e) {
      return []
    }

  },

  /**
   * @return {PB.FollowInfo[]}
   */
  getFollows: async function ({userId = pbajax.uid, page = 1,pageSize = 20} = {}, progress = noop) {

    let { Follow: {UserList: {Request, Response}}} = PB

    let sendData = new Request({
      vuid: userId,
      page: page,
      pageSize,

    })


    var responsedata = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/follow/user/list',  // java api
      },
      sendData,
      progress,
    )
    try {
      var {infos} = Response.decode(responsedata)
      return pbajax.getPlainObject(infos)
    } catch (error) {
      return []
    }

  },
  /**
   * @return {PB.Mall.ContributionRank.UserBillContribution[]}
   */
  getTopContributionRanking: async function ({ uid = pbajax.uid, page = 1} = {}) {
    let { Request, Response} = PB.Mall.ContributionRank
    let sendData = new Request({ uid, pageNo : page })
    let responsedata = await pbajax.do(
      {
        service: 'mall', // java service name
        api: '/mall/contribution/rank',  // java api
      },
      sendData,
    )
    try {
      var {contributions} = Response.decode(responsedata)
      return pbajax.getPlainObject(contributions)
    } catch (error) {
      return []
    }
  },

  followUser: async function (userId) {
    let { Follow: {UserAdd: {Request}}} = PB
    let sendData = new Request({
      fuid: userId
    })
    await pbajax.do(
      {
        service: 'service', // java service name
        api: '/follow/user/add',  // java api
      },
      sendData,
      undefined,
      true,
    )
  },

  unFollowUser: async function (userId) {
    let { Follow: {UserUnfollow: {Request}}} = PB
    let sendData = new Request({
      fuid: userId
    })
    await pbajax.do(
      {
        service: 'service', // java service name
        api: '/follow/user/unfollow',  // java api
      },
      sendData
    )
  },

  getBlackList : async function ({page = 1,pageSize = 24}){
    const {Request,Response} = PB.UserBlock.List
    const rawData = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/user/block/list',  // java api
      },
      new Request({start : page,pageSize})
    )
    return rawData && pbajax.getPlainObject(Response.decode(rawData)) || {infos : []}
  },

  blockUser : async function (fuid){
    const {Request} = PB.UserBlock.Add
    await pbajax.do(
      {
        service: 'service', // java service name
        api: '/user/block/add',  // java api
      },
      new Request({fuid}),
      undefined,
      true,
    )
    return null
  },

  unblockUser : async function (fuid){
    const {Request} = PB.UserBlock.Delete
    
    await pbajax.do(
      {
        service: 'service', // java service name
        api: '/user/block/delete',  // java api
      },
      new Request({fuid}),
      undefined,
      true,
    )
    return null
  },

  getVipInfo: async function(){
    const {Response} = PB.UserVip.Info
    const rawData = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/user/vip/info',  // java api
      },
      null,
    )
    return pbajax.getPlainObject(Response.decode(rawData)) 
  },
}


// ProfileAPI.getProfile = RunUtilities.WrapAsyncFuntion(ProfileAPI.getProfile,(uid) => 'getProfile:' + uid)


export default ProfileAPI
