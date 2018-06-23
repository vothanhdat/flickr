import UserAPI from './requests/UserAPIs'
import RunUtilities from 'utils/RunUtilities'
import Utilities from 'utils/Utilities'
// import LoaderProgressBar from  'utils/LoaderBar'
import { Facebook, Google } from 'utils/extendSDK'
import { UPLIVE_SHARING_SERVER } from 'constant'
import { __, T } from 'language'

import pbajax from './pbajax'

const { BINDTYPE } = UserAPI





async function FacebookGetInfo(token) {

  var { gender, name, locale, id } = await fetch('https://graph.facebook.com/me?' + Utilities.param({
    access_token: token,
    fields: 'id,name,age_range,link,gender,locale,picture'
  })).then(e => e.json())

  var url = 'https://graph.facebook.com/me/picture?' + Utilities.param({
    access_token: token,
  })

  return {
    accessToken: token,
    userID: id,
    countryCode: locale.split('_').pop(),
    gender, name, locale, url,
  }
}

async function FacebookLoginSendToken(fbToken) {
  fbToken = fbToken.replace('#_=_', '')
  try {
    RunUtilities.PostMsg(fbToken, null, "fblogin")
    window.opener && setTimeout(e => window.close(), 500)
  } catch (error) {
    console.error(error)
  }
}


async function FacebookLoginWithRedirect() {
  var fbWindow = RunUtilities.PrepareAsyncWindowOpen({ message: __(T.WAITINGLOGIN) });

  window.open('https://www.facebook.com/dialog/oauth?client_id=1698316857098420&redirect_uri='
    + UPLIVE_SHARING_SERVER
    + '/api/leaderboard/logincallback/'
  )
  return await RunUtilities.WaitForRecieveMsg(fbWindow, 'fblogin')
}

async function FacebookLoginWithSDK() {

  var windowInstance = RunUtilities.PrepareAsyncWindowOpen({ message: __(T.WAITINGLOGIN) });

  // LoaderProgressBar.go(10)

  var FB = await Facebook.getInstance()

  // LoaderProgressBar.go(20)

  var { authResponse, status } = await new Promise(resolve => FB.getLoginStatus(resolve, { scope: 'public_profile,email' }))

  var { accessToken } = ((status === 'connected') && authResponse)
    ? authResponse
    : await new Promise((resolve, reject) => {
      FB.login((result) => {
        if (result.status === 'connected')
          resolve(result.authResponse)
        else
          reject(result)
      }, { scope: 'public_profile,email' })
    })

  windowInstance.closed || windowInstance.close()

  // LoaderProgressBar.go(30)

  return accessToken
}

async function FacebookLogin(fbToken) {

  if (fbToken) {
    return FacebookLoginSendToken(fbToken)
  } else if (location.host.indexOf('upliveapps.com') == -1) {
    // LoaderProgressBar.go(15)
    fbToken = await FacebookLoginWithRedirect()
    // LoaderProgressBar.go(30)
  } else {
    fbToken = await FacebookLoginWithSDK()
  }

  var {
    accessToken,
    gender,
    name,
    url,
    userID
  } = await FacebookGetInfo(fbToken)

  // LoaderProgressBar.go(50)

  const isRegistered = await UserAPI.checkRegistered({
    bindType: BINDTYPE.FACEBOOK,
    thirdId: userID,
    thirdToken: accessToken,
  })

  var registerData = await UserAPI.register({
    gender: { male: 1, female: 2 }[gender] || 3,
    username: name,
    avatar: url,
    bindType: BINDTYPE.FACEBOOK,
    thirdId: userID,
    thirdToken: accessToken
  })

  if (isRegistered) {

    // LoaderProgressBar.go(100)

    return registerData.profile

  } else {

    // LoaderProgressBar.go(70)

    await UserAPI.login({
      loginType: 1,
      bindType: BINDTYPE.FACEBOOK,
      uid: registerData.profile.uid,
      password: registerData.profile.password
    })

    // LoaderProgressBar.go(100)

    const profile = registerData.profile
    return { ...profile, isNew: true }
  }

}


//END FACEBOOK

//GOOGLE
async function GoogleLogin() {

  var windowInstance = RunUtilities.PrepareAsyncWindowOpen({ message: __(T.WAITINGLOGIN) });

  var gapi = await Google.getInstance()

  var data = await new Promise((resolve, reject) => {
    if (gapi && gapi.auth2) {
      console.log(gapi.auth2.getAuthInstance())
      var signPromise = gapi.auth2.getAuthInstance().signIn()
      signPromise.then(resolve, reject)
    } else {
      reject()
    }
  })

  if (windowInstance) {
    windowInstance.closed || windowInstance.close()
  }


  var { access_token } = data.getAuthResponse()
  var profileData = data.getBasicProfile();

  console.log(data, data.getAuthResponse(), data.getBasicProfile())

  const isRegistered = await UserAPI.checkRegistered({
    bindType: BINDTYPE.GOOGLE,
    thirdId: profileData.getId(),
    thirdToken: access_token,
  })

  var registerData = await UserAPI.register({
    bindType: BINDTYPE.GOOGLE,
    thirdId: profileData.getId(),
    thirdToken: access_token,
    avatar: profileData.getImageUrl(),
    username: profileData.getName(),
  })


  if (isRegistered) {
    // LoaderProgressBar.go(100)
    return registerData.profile
  } else {

    // LoaderProgressBar.go(70)

    var userInfo = await UserAPI.login({
      loginType: 1,
      bindType: BINDTYPE.GOOGLE,
      uid: registerData.profile.uid,
      password: registerData.profile.password,
    })
    // LoaderProgressBar.go(100)
    const profile = userInfo.profile
    return { ...profile, isNew: true }
  }

}

// //END GOOGLE

// //WECHAT
// async function WechatGetAccessToken(code) {

//   var {
//       access_token, openid, nickname, headimgurl, sex, province, city, country, unionid
//   } = await fetch(UPLIVE_SHARING_SERVER + "/api/account/wechat/token/exchange/", {
//       method: 'POST',
//       body: JSON.stringify({ code: code }),
//     }).then(e => e.json())

//   return {
//     accessToken: access_token,
//     openId: openid,
//     nickname: nickname,
//     avatar: encodeURI(headimgurl),
//     sex: sex,
//     province: province,
//     city: city,
//     country: country,
//     unionid: unionid
//   }
// }


//InAppLogin
// async function InAppLogin() {
//   var data = await new Promise((resolve, reject) => {
//     var keyFunc = Math.random() + ''
//     window[keyFunc] = function (data) {
//       resolve(data)
//     }
//     RunUtilities.RunDeepLink('getConfigs', {
//       invalid: `1`,
//       receive: `$['upliveapp_getConfigs']`,
//       jsCallback: `window["${keyFunc}"]`
//     })
//   })

//   const { language, uid, usertoken } = JSON.parse(data)

//   return await UserAPI.loginFromUserToken(usertoken)

// }


async function Logout() {

  pbajax.setLoginData({
    password: '',
    uid: '',
    userToken: '',
    upliveCode: '',
    countryCode: 'VN',
  })

  await UserAPI.logout()

}


// function isLogin() {
//   return pbajax.userToken && pbajax.upliveCode
//     && (pbajax.userToken != '')
//     && (pbajax.upliveCode != '')
//     && !pbajax.isVisitor
// }

export default {
  FacebookLogin,
  GoogleLogin,
  // InAppLogin,
  Logout,
  // isLogin,
}

