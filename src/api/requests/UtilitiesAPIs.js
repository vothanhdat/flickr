import PB from '../protos'
import pbajax from '../pbajax'
import Utilities from 'utils/Utilities'
import LocalStorage from 'utils/LocalStorage'



const UtilitiesAPIs = {
  /**
   * @param {PB.Live.Share.RequestT} sendData
   * @return {PB.Live.Share.ResponseT}
   */
  share: async function (sendData) {

    let { Request, Response } = PB.Live.Share

    let result = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/live/share',  // java api
      },
      new Request(sendData)
    )
    try {
      var data
      data = Response.decode(result)
      var { fullpath, query } = Utilities.parseURL(data.facebookUrl)
      var newQuery = Object.assign({}, query, {
        language: Utilities.getLanguageCode(LocalStorage.getItem('language') || navigator.language)
      })
      return Object.assign({}, pbajax.getPlainObject(data), {
        facebookUrl: fullpath + '?' + Utilities.param(newQuery)
      });
    } catch (error) {
      console.error(error)
      return {}
    }
  },
  searchUser: async function ({ content = '', page = 1, pageSize = 20 } = {}) {

    let { Search: { User: { Request, Response } } } = PB

    let result = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/search/user',  // java api
      },
      new Request({
        content,
        page,
        pageSize,
      })
    )
    try {
      let { infos } = Response.decode(result)
      return pbajax.getPlainObject(infos)
    } catch (error) {
      return []
    }
  },

  searchUserCode: async function (userCode) {

    let { Search: { UserCode: { Request, Response } } } = PB

    let result = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/search/user/code',  // java api
      },
      new Request({ upliveCode: userCode })
    )
    try {
      let { userInfo } = Response.decode(result)
      return pbajax.getPlainObject(userInfo)
    } catch (error) {
      return []
    }
  },

  /**
   * @return {PB.LbsGeo.Location.ResponseT}
   */
  getLocation: async function (progress = () => 0) {
    let { Request, Response } = PB.LbsGeo.Location

    let latitude, longitude;


    try {
      if (!navigator.geolocation)
        throw new Error("Browser doesn`t support geolocation")
      const position = await new Promise(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      )
      latitude = position.coords.latitude
      longitude = position.coords.longitude

    } catch (error) {
      const position = await fetch('http://ip-api.com/json').then(e => e.json())

      latitude = position.lat
      longitude = position.lon
    }


    let result = await pbajax.do(
      {
        service: 'service',
        api: '/lbs/geo/location'
      },
      new Request({ lat: latitude, lng: longitude })
    )

    return pbajax.getPlainObject(Response.decode(result))

  },

  getCountryData: function () {
    // return new Promise((resolve, reject) => {

    //   require.ensure(['../../utilities/Location'], function (require) {
    //     var data = require('../../utilities/Location')
    //     resolve(data)
    //   })

    // })
  },

  /**
   * @return {PB.Configinfo.Get.ResponseT}
   */
  getConfigInfo: async function (countryCode, roomId, zuid) {
    const { Request, Response } = PB.Configinfo.Get


    let rawData = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/configinfo/get',  // java api
        // ...countryCode?{header:{lang : Utilities.getLanguageCode(countryCode)}}:{}
      },
      new Request(roomId && zuid && { roomId, zuid, countryCode, lastTime: Date.now() } || { countryCode, lastTime: Date.now() })
    )

    return pbajax.getPlainObject(Response.decode(rawData))
  },
  /**
   * @return {PB.Configinfo.Get.ResponseT}
   */
  reportUser: async function (accusedId, reason) {
    const { Request } = PB.Report.Add

    return await pbajax.do(
      {
        service: 'service', // java service name
        api: '/report/add',  // java api
      },
      new Request({
        accusedId,
        reason,
      })
    )

  },
  /**
   * 
   * @param {PB.Redpacket.NormalTake.RequestT} data 
   */
  async takeRedPackage(data) {
    console.log(data)
    const { Request, Response } = PB.Redpacket.NormalTake


    let rawData = await pbajax.do(
      {
        service: 'redpacket', // java service name
        api: '/redpacket/normal/take',  // java api,
        https: 'true',
      },
      new Request(data),
      undefined,
      true,
    )

    return pbajax.getPlainObject(Response.decode(rawData))
  }
}

// window.UtilitiesAPIs = UtilitiesAPIs

export default UtilitiesAPIs
