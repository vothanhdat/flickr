import PublicPB from './protos/PublicPB'
import PB from './protos'

import { wrapPromise } from '../utils/Decorator'
import LocalStorage, { mapLocalStorageDecorator } from '../utils/LocalStorage'


function param(ob, prefix = '') {
  return Object.entries(ob)
    .map(
      ([key, value]) => typeof value == "object"
        ? param(value, key)
        : `${prefix}${prefix ? '[' : ''}${key}${prefix ? ']' : ''}=${encodeURIComponent(value)}`
    )
    .join('&')
}

const proxyUrl = {
  pro: 'https://proxy.upliveapps.com',
};

const noop = () => null

const Code = PublicPB.Code

const CodeMap = (function () {
  var ob = {}
  for (var i in Code) ob[Code[i]] = i
  return ob
})()



class Pbajax extends Object {

  get isLogin() {
    return this.userToken && this.upliveCode
      && (this.userToken != '')
      && (this.upliveCode != '')
      && !this.isVisitor
  }

  @mapLocalStorageDecorator(true, 'boolean')
  isVisitor = true;

  @mapLocalStorageDecorator('')
  userToken = '';


  @mapLocalStorageDecorator(0, 'number')
  uid = 0;

  @mapLocalStorageDecorator('')
  upliveCode = '';

  @mapLocalStorageDecorator('')
  password = '';

  @mapLocalStorageDecorator('VN')
  countryCode = 'VN';

  envMode = 'pro'

  getcfg(cfg) {
    var header = {
      // lang : Utilities.getLanguageCode(this.countryCode || config.defaultCountry)
      lang: 'vi-VN',
      ...cfg.header || {},
    }
    return {
      userToken: this.userToken,
      env: this.envMode,
      ...cfg,
      header,
    }
  }

  do(cfg, data, onProgress = noop, requireLogin = false) {

    return new Promise((resolve, reject) => {
      //Try call API first

      if (!this.userToken || this.userToken == '')
        return reject({ code: Code.SC_ACCOUTN_USER_TOKEN_NOTMATCH });
      else if (requireLogin && !this.isLogin && this.isVisitor)
        return reject({ code: Code.SC_NEED_REGISTER });

      this.dosimple(cfg, data, onProgress)
        .then(resolve)
        .catch(reject)

    }).catch(e => {

      //Catch Errer, if match with login required, autologin and do again
      if (e.code == Code.SC_ACCOUTN_USER_TOKEN_NOTMATCH || e.code == Code.SC_NEED_REGISTER) {
        if (this.isVisitor && e.code == Code.SC_ACCOUTN_USER_TOKEN_NOTMATCH) {
          return this.registerVisitor()
            .then(() => this.dosimple(cfg, data, onProgress))
        } else if (this.isLogin) {
          return this.autoLogin()
            .then(() => this.dosimple(cfg, data, onProgress))
            .catch(e => this
              .forcePopupLogin()
              .then(e => this.dosimple(cfg, data, onProgress)
              ))
        } else {
          return this.forcePopupLogin()
            .then(() => this.dosimple(cfg, data, onProgress))
        }
      } else {
        throw e;
      }
    })

  }

  /**
   * 
   * @param {{ api: string, service: string, https?: 'true', header?: any, userToken?: string }} cfg 
   * @param {any} data 
   */
  dosimple(cfg, data, onProgress = noop) {
    return new Promise((resolve, reject) => {
      this.requestProtoData(this.getcfg(cfg), data, resolve, reject, onProgress)
    })
  }

  requestProtoData(cfg, senddata, success, fail, onProgress = noop) {
    onProgress = onProgress || noop

    var _url = proxyUrl[cfg.env || 'pro'] + '?' + param(cfg);

    try {
      var xhr = new XMLHttpRequest()

      if (xhr.upload)
        xhr.upload.onprogress = e => onProgress((0.5 * e.loaded / e.total) || 0)

      xhr.onprogress = e => onProgress(((0.5 * e.loaded / e.total) || 0) + 0.5)

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            try {
              var { code, msg, data } = PublicPB.Result.decode(xhr.response)
            } catch (error) {
              return fail({
                response: String.fromCharCode.apply(null, new Uint8Array(xhr.response)),
                cfg, senddata: senddata && this.getPlainObject(senddata)
              })
            }
            if (code === Code.SC_SUCCESS)
              success((data || {}).value)
            else
              fail({
                code, msg, data, senddata, codename: CodeMap[code], cfg,
                needLogin: code == Code.SC_ACCOUTN_USER_TOKEN_NOTMATCH || code == Code.SC_NEED_REGISTER
              })
          } else {
            fail({ xhr, cfg })
          }
        }
      }


      xhr.open("POST", _url);
      xhr.responseType = "arraybuffer";
      try {
        xhr.send(senddata.toArrayBuffer());
      } catch (e) {
        xhr.send('');
      }
    } catch (e) {
      fail(e)
    }
  }

  /**
   * 
   * @param {Partial<PB.User.Login.RequestT>} loginData 
   * @param {*} onProgress 
   */
  async login(loginData, onProgress = noop) {
    const { Request, Response } = PB.User.Login

    var rawResult = await this.dosimple(
      {
        https: 'true',
        service: 'safe',	// java service name
        api: '/user/login',  // java api
      },
      new Request(loginData),
      onProgress
    )

    var result = this.getPlainObject(Response.decode(rawResult))

    this.setLoginData(result.profile)

    return result
  }

  async autoLogin(onProgress = noop) {
    this.userToken = ''

    if (!this.password || !this.uid)
      throw new Error('password or uid is null')

    await this.login({
      loginType: 1,
      password: this.password,
      uid: this.uid,
    }, onProgress)
  }

  setLoginData({ userToken, password, uid, countryCode, upliveCode }) {

    // var isDiff = this.userToken != userToken
    //   || this.password != password
    //   || this.uid != uid
    //   || this.countryCode != countryCode
    //   || this.upliveCode != upliveCode

    // var pbajax = this as {}

    // var backState = { ...pbajax }

    this.isVisitor = userToken ? false : true;
    this.userToken = userToken
    this.password = password
    this.uid = uid
    this.countryCode = countryCode
    this.upliveCode = upliveCode

    // isDiff && Global.dispatch({
    //   type : Action.SETTING.SET_USERDATA,
    //   data : { userToken,password,uid,countryCode,upliveCode},
    //   backState : backState,
    // })
  }


  @wrapPromise
  async registerVisitor() {
    const devideID = LocalStorage.getItem(
      'devideid', `WC39ZUyXRgdEHgMHk76Y0krf+W/gRd8OqOtULX5zzE85vFRGjiVDzrwtzWc435V2AWJchI93wCE0LaSkuuNwv8bL8TljL/MV2auij/ESEdoSDha/jzf4qdHxTAhPA72GQo4sUfxtxrE3rRo7JG2f8p0NI8mX7/mbxluWAXY4L8cVkPJoL1TJhequcDb7sT9fIw+aXZ9q7GzwfJCgC0zxrxdE7Z6rL0Rvbk3HXLzgeX091cvionFIHc04LQfvsOkAw1487577677129`
    )
    const { Request, Response } = PB.Visitor.RegisterH5

    var defaultCountryCode = this.countryCode;

    // if(SUPPORT_COUNTRY.indexOf(defaultCountryCode) === -1){
    //   defaultCountryCode = JSON.parse(await $.get('http://web.upliveapps.com/api/leaderboard/ip2location/')).country_code
    // }    

    // if(SUPPORT_COUNTRY.indexOf(defaultCountryCode) === -1){
    //   defaultCountryCode = Utilities.defaultCountryCode
    // }    

    // if(SUPPORT_COUNTRY.indexOf(defaultCountryCode) === -1){
    //   defaultCountryCode = 'VN'
    // }    


    // if(SUPPORT_COUNTRY.indexOf(defaultCountryCode) === -1){
    //   var ChooseCountryPopup = require('../components/ChooseCountryPopup').default
    //   defaultCountryCode = await ChooseCountryPopup()
    //   console.log({defaultCountryCode})
    //   if(this.uid && this.userToken)
    //     return
    // }

    this.countryCode = defaultCountryCode

    const rawResult = await this.dosimple({
      api: '/visitor/register/h5',
      service: 'safe',
      header: {
        UserAgent: 'Android/h5uplive version/1.9.0  smd/' + devideID,
      }
    }, new Request({
      countryCode: defaultCountryCode
    }))

    const { profile } = Response.decode(rawResult)

    this.isVisitor = true;
    this.countryCode = profile.countryCode
    this.userToken = profile.userToken
    this.uid = profile.uid

    console.log({ countryCode: profile.countryCode })
    console.log(profile)
    return profile
  }

  @wrapPromise
  async forcePopupLogin() {
    // var Popup = require('../components/HiddenLayout/Popup').default
    // return Popup.loginBoxWithConfirm()
  }

  /**
   * 
   * @template T
   * @param {T} e
   * @returns {T} 
   */
  getPlainObject(e) {
    function deepprocess(ob) {
      if (ob instanceof Object)
        if ('high' in ob && 'low' in ob && 'unsigned' in ob)
          return parseInt(ob + '')
        else for (var i in ob)
          ob[i] = deepprocess(ob[i])
      return ob
    }
    var tmp = deepprocess(e)
    return JSON.parse(JSON.stringify(tmp))
  }
}




export { Code }

export default new Pbajax()
