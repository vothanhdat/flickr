import PB from '../protos'
import pbajax from '../pbajax'

const MallAPI = {

  getMallConfigure: async function () {
    let { Mall: { RechargeConfig: { Request, Response } } } = PB

    let sendData = new Request({
      uid: pbajax.uid
    })

    let response = await pbajax.do(
      {
        service: 'mall', // java service name
        api: '/mall/recharge/config',  // java api,
      },
      sendData,
      undefined,
      true
    )

    var channels = {}

    var order = []

    if (response) {
      var data = Response.decode(response)

      for (var channel of data.channels) {
        order.push(channel)
        channels[channel] = {}
      }
      

      for (var group of data.groups) {

        var chandel = channels[group.groupCode]

        
        if (chandel) {
          chandel.groupName = group.groupName
          chandel.items = group.channelRechargeConfigMap.map[group.groupCode].value.rechargeConfigList
        }
      }
    }
    
    return { channels, order }
  },

  orderItem: async function (channel, item) {
    let { Mall: { PayOrder: { Request, Response } } } = PB
    let sendData = new Request({
      purpose: 1,
      productId: item.configId,
      channel: channel,
      tradeType: 'WAP',
      tuid: pbajax.uid,
      clientType : 'pcuplive',
    })
    
    let response = await pbajax.do(
      {
        service: 'mall', // java service name
        api: '/mall/pay/order',  // java api,
      },
      sendData,
      undefined,
      true
    )

    if(!response)
      throw {msg : 'Null data response',sendData }

    return Response.decode(response)

  },

  validate: async function (orderId, receipt) {
    let { Mall: { PayValidate: { Request, Response } } } = PB
    let sendData = new Request({
      orderId,
      receipt
    })

    let response = await pbajax.do(
      {
        service: 'mall', // java service name
        api: '/mall/pay/validate',  // java api,
      },
      sendData,
      undefined,
      true
    )

    if(!response)
      throw {msg : 'Null data response',sendData }

    return pbajax.getPlainObject(Response.decode(response))

  }
}

export default MallAPI
