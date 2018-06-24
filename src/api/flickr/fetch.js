import CryptoJs from 'crypto-js'
import CallAPI from '../fetch'
import resources from './resource'


export default function (resource, params) {
  return FlickrAPI(
    resources.__base + resource.URL,
    params,
  )
}


const api_key = "cfa4ceed7029f61a7365a1154c49749e";
const api_key_secrect = "4af8759c9c2070bf";

function FlickrAPI(path, params) {
  var calcParams = {
    oauth_nonce: Math.random() * 1000000000 | 0,
    oauth_timestamp: Date.now() / 1000,
    oauth_consumer_key: api_key,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: "1.0",
    format:'json',
    ...params,
  }
  var sortedKeys = Object.keys(calcParams).sort()
  var queryToSign = sortedKeys.map(e => `${e}=${encodeURIComponent(calcParams[e])}`).join('&')
  var baseStringToSign = `GET&${encodeURIComponent(path)}&${encodeURIComponent(queryToSign)}`
  var sign = CryptoJs.enc.Base64.stringify(CryptoJs.HmacSHA1(baseStringToSign, api_key_secrect + '&'))

  return CallAPI(
    'https://giftoproxy.herokuapp.com/' + path,
    {
      query: {
        ...calcParams,
        oauth_signature: sign,
      }
    },
    
  )
}



