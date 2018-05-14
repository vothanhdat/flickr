import PB from '../protos'
import pbajax, { Code as ErrorCode } from '../pbajax'



const RoomRequest = {
  enterRoom: async function (roomId) {

    if (!roomId)
      throw new Error("Missing 'roomId' Parameter")

    let { Room: { WebNormalInto: { Request, Response, WebType } } } = PB

    let sendData = new Request({
      roomId: roomId,
      wType: WebType.WEB
    })

    var result = Response.decode(await pbajax.do(
      {
        service: 'room', // java service name
        api: '/room/web/normal/into',  // java api
      },
      sendData,
    ))

    var { flv } = JSON.parse(result.liveMsg)

    return Object.assign({}, pbajax.getPlainObject(result), {
      flv,
      rtmp: flv.replace('.flv', '').replace('http://', 'rtmp://'),
      m3u8: flv.replace('.flv', '.m3u8')
    })
  },

  getGuarUser: async function (userId) {
    if (!userId)
      throw new Error("Missing 'userId' Parameter")

    let { Request, Response } = PB.Mall.GiftGuard

    let sendData = new Request({
      uid: userId,
    })

    var result = Response.decode(await pbajax.do(
      {
        service: 'mall', // java service name
        api: '/mall/gift/guard',  // java api
      },
      sendData,
    ))

    return pbajax.getPlainObject(result)
  },

  getGiftList: async function (countryCode) {
    const GIFT_DOMAIN = 'http://g.cdn.upliveapp.com/oauthgame/'

    let { Mall: { GiftList: { Response } } } = PB
    let response = await pbajax.do(
      {
        service: 'mall', // java service name
        api: '/mall/gift/list',  // java api,
      },
      null,
    )
    try {
      var { gifts } = Response.decode(response)
      for (var e of gifts) {
        e.url = `${GIFT_DOMAIN}${e.giftId}_${e.countryCode}_${e.version}_android_small.png`
      }
      // e.imageUrl = `${GIFT_DOMAIN}${e.giftId}_${e.countryCode}_${e.version}_android_small.png`
      return pbajax.getPlainObject(gifts)
    } catch (error) {
      console.log(response)
      return []
    }
  },

  /**
   * @return {PB.Room.AnchorDisabledGet.ResponseT}
   */
  getRoomDisableReason: async function (roomId) {
    if (!roomId)
      throw new Error("Missing 'roomId' Parameter")

    let { Room: { AnchorDisabledGet: { Request, Response } } } = PB

    let sendData = new Request({
      roomId: roomId
    })

    var rawdata = await pbajax.do(
      {
        service: 'room', // java service name
        api: '/room/anchor/disabled/get',  // java api
      },
      sendData,
    )

    return pbajax.getPlainObject(Response.decode(rawdata))
  },


  sendGiftCombo: {},
  sendGiftComboTime: {},

  /**
   * @param {PB.Mall.GiftSend.RequestT} data
   */
  sendGift: async function (data) {
    var { GiftSend } = PB.Mall
    var { Request, Response } = GiftSend
    const { giftId, rid, amount = 1 } = data
    const uniqueKey = [pbajax.uid, rid, giftId].join('-')
    const transactionId = [pbajax.uid, rid, giftId, Date.now()].join('-')

    const comboTimes = RoomRequest.sendGiftCombo[uniqueKey]
      ? (RoomRequest.sendGiftCombo[uniqueKey] += amount)
      : (RoomRequest.sendGiftCombo[uniqueKey] = amount)

    RoomRequest.sendGiftComboTime[uniqueKey]
      && clearTimeout(RoomRequest.sendGiftComboTime[uniqueKey])

    RoomRequest.sendGiftComboTime[uniqueKey] = setTimeout(() => {
      RoomRequest.sendGiftCombo[uniqueKey] = 0
      console.log('clear Combotimes')
    }, 30000)


    var sendData = new Request({ ...data, comboTimes, transactionId })

    var config = {
      service: 'mall',
      api: '/mall/gift/send'
    }

    var rawData = await pbajax.do(
      config,
      sendData
    )

    var result = Response.decode(rawData)

    console.log("SEND GIFT DONE " + result, result.diamond)
    return "" + result.diamond

  },

  async getChatRoomProfileInfo(roomId, vuid) {
    let { Request, Response } = PB.ChatRoomProfile.Get

    var rawdata = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/chat/room/profile/get',  // java api
      },
      new Request({ roomId, vuid })
    )

    return pbajax.getPlainObject(Response.decode(rawdata))
  },

  async userPermission({ permission, puid, ruid, roomId }) {
    let { Request, Response } = PB.UserLabel.PermissionUse

    var rawdata = await pbajax.do(
      {
        service: 'service', // java service name
        api: '/user/label/permission/use',  // java api
      },
      new Request({ permission, puid, ruid, roomId }),
      undefined,
      true,
    )

    return Response && rawdata && pbajax.getPlainObject(Response.decode(rawdata))
  },

  async getViewerList({ roomId, page, pageSize }) {
    let { Request, Response } = PB.Room.CommonUserlist

    var rawdata = await pbajax.do(
      {
        service: 'room', // java service name
        api: '/room/common/userlist',  // java api
      },
      new Request({ roomId, page, pageSize })
    )

    return pbajax.getPlainObject(Response.decode(rawdata))
  },

  LIVESTATUS: PB.Room.AnchorDisabledGet.Status
}

export default RoomRequest
