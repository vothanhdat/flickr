import CallAPI from '../fetch'

const api_key = "cfa4ceed7029f61a7365a1154c49749e";
const api_key_secrect = "4af8759c9c2070bf";

export default function FlickrAPI(path, params) {
  var calcParams = {
    oauth_nonce: Math.random() * 1000000000 | 0,
    oauth_timestamp: Date.now() / 1000,
    oauth_consumer_key: api_key,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: "1.0",
    ...params,
  }
  var p = Object.keys(calcParams).sort()
  var ps = p.map(e => `${e}=${encodeURIComponent(calcParams[e])}`).join('&')
  var s = `GET&${encodeURIComponent(path)}&${encodeURIComponent(ps)}`
  var sign = CryptoJs.enc.Base64.stringify(CryptoJs.HmacSHA1(s, api_key_secrect + '&'))

  return CallAPI(
    path,
    {
      query: {
        ...calcParams,
        oauth_signature: sign,
      }
    }
  )
}


