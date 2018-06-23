import PB from '../protos'
import pbajax, { Code as ErrorCode } from '../pbajax'


const noop = () => null

const UserRequests = {
  BINDTYPE: PB.BindType,

  /**
   * @param {PB.ThirdParty.Check.RequestT} checkData
   */
  checkRegistered: async function (checkData) {
    const { Request } = PB.ThirdParty.Check

    try {

      await pbajax.dosimple(
        {
          service: 'service',	// java service name
          api: '/third/party/check',  // java api
        },
        new Request(checkData)
      )
      return false;
    } catch (error) {
      if (error && error.code == ErrorCode.SC_THIRD_PARTY_ALREADY_BIND)
        return true
      throw error
    }
  },
  /**
   * @param {PB.ThirdCheck.Register.RequestT} registerData
   * @return {PB.ThirdCheck.Register.ResponseT}
   */
  register: async function (registerData) {
    //userID, accessToken
    const { Request, Response } = PB.ThirdCheck.Register

    var RegisterData = new Request(registerData);

    var result = await pbajax.dosimple(
      {
        service: 'service',	// java service name
        api: '/third/check/register',  // java api
      },
      RegisterData
    )
    var registerResult = pbajax.getPlainObject(Response.decode(result))

    if (!registerResult.profile.uid || !registerResult.profile.password)
      throw { msg: 'register API return null profile', registerData }

    pbajax.setLoginData(registerResult.profile)

    return registerResult
  },

  login: pbajax.login.bind(pbajax),

  autoLogin: pbajax.autoLogin.bind(pbajax),

  loginFromUserToken: async function (userToken: string, uid: number, onProgress = noop) {

    const { Profile: { Get: { Request, Response } } } = PB

    const result = await pbajax.dosimple(
      {
        service: 'service', // java service name
        api: '/profile/get',  // java api
        userToken: userToken,
      },
      new Request({ vuid: uid }),
      onProgress
    )

    const { profile } = pbajax.getPlainObject(Response.decode(result))

    pbajax.setLoginData(Object.assign({}, profile, { userToken }))

    return profile
  },

  logout: async function (onProgress = noop) {

    pbajax.setLoginData({
      userToken: '',
      password: '',
      uid: '',
      countryCode: pbajax.countryCode,
      upliveCode: '',
    })

    pbajax.isVisitor = true

  },

  getQRCode: async function () {
    const { Response } = PB.TwoDimensionalCode.Create

    const result = await pbajax.dosimple(
      {
        service: 'service', // java service name
        api: '/two/dimensional/code/create',  // java api
      }
    )

    const data = pbajax.getPlainObject(Response.decode(result))
    return data.randomCode
  },

  getQueryQRCode: async function (randomCode, deviceId) {
    const { Response, Request } = PB.TwoDimensionalCode.Query
    const sendData = new Request({ randomCode, deviceId })
    const result = await pbajax.dosimple(
      {
        service: 'service', // java service name
        api: '/two/dimensional/code/query',  // java api
      },
      sendData
    )
    const data = pbajax.getPlainObject(Response.decode(result))

    return data
  }
}


export default UserRequests


// if (process.env.NODE_ENV !== 'production') {
//   window.testPB = PB
//   window.testAPI = async function (PBpackage, data, header) {
//     const {Request, Response} = PBpackage
//     var returnData = await pbajax.do(
//       header,
//       Request && new Request(data),
//       e => console.log('progress : ' + e.toFixed(2))
//     )
//     console.log(returnData)
//     var result = Response.decode(returnData)
//     console.log(result)
//     return result
//   }
// }
