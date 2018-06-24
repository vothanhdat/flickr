import flickrAPI from './fetch'
import resource from './resource'
import { fromPairs } from 'lodash'


/**
 * @returns {Promise<{
    oauth_callback_confirmed : string,
    oauth_token : string,
    oauth_token_secret : string,
 }>}
 */
export function requestToken() {
  return flickrAPI(
    resource.request_token,
    {
      oauth_callback: 'http://localhost:8080/login/flickr'
    }
  ).then(e => fromPairs(e
    .split('&')
    .map(e => e.split("=").map(f => decodeURIComponent(f)))
  ))
}



/**
 * @returns {Promise<{
    fullname : string,
    oauth_token : string,
    oauth_token_secret : string,
    user_nsid : string,
    username : string,
 }>}
 */
export function exchangeAccessToken({ oauth_token, oauth_verifier, oauth_token_secret }) {
  return flickrAPI(
    resource.access_token,
    { oauth_token, oauth_verifier },
    oauth_token_secret,
  ).then(e => fromPairs(e
    .split('&')
    .map(e => e.split("=").map(f => decodeURIComponent(f)))
  ))
}



export function callMethod({ method = '', ...params }) {
  return flickrAPI(
    resource.call_method,
    {
      nojsoncallback: 1,
      format: 'json',
      method: method,
      oauth_token: localStorage.getItem('flickr.token') || '',
      ...params,
    },
    localStorage.getItem('flickr.tokensecrect') || ''
  )
}


const EXTRASTRING = "can_addmeta,can_comment,can_download,can_share,contact,count_comments,count_faves,count_notes,count_views,date_taken,date_upload,description,has_invalid_colorspace_for_print,is_invalid_for_print,icon_urls_deep,isfavorite,ispro,license,media,needs_interstitial,owner_name,owner_datecreate,path_alias,realname,rotation,safety_level,secret_k,secret_h,url_c,url_h,url_k,url_l,url_m,url_n,url_o,url_q,url_s,url_sq,url_t,url_z,visibility,o_dims"


export function testLogin() {
  return callMethod({
    method: 'flickr.test.login',
  })
}


export function getContactsPhotos({ per_page = 100, page = 1, extras = EXTRASTRING } = {}) {
  return callMethod({
    method: 'flickr.photos.getContactsPhotos',
    per_page,
    page,
    extras,
  }).then(e => e.photos)
}





