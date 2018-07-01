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


const cdnImg = (src, { enableIL = true } = {}) => src ? `https://images.weserv.nl/?url=${(src + '').replace('https://', '')}${enableIL ? '&il' : ''}` : ''

export function getCollection({ collectionName = '', per_page = 100, page = 1, extras = EXTRASTRING } = {}) {
  return callMethod({
    method: collectionName,
    per_page,
    page,
    extras,
  }).then(e => {
    /**@type {FlickrPhotoObj[]} */
    var photos = e.photos.photo
    return {
      ...e.photos,
      photo: photos.map(e => ({
        ...e,
        // url_t: cdnImg(e.url_t),
        // url_z: cdnImg(e.url_z),
        // url_s: cdnImg(e.url_s),
        // url_c: cdnImg(e.url_c),
        // url_h: cdnImg(e.url_h,{enableIL : false}),
        // url_k: cdnImg(e.url_k),
        // url_l: cdnImg(e.url_l),
        // url_m: cdnImg(e.url_m),
        // url_n: cdnImg(e.url_n),
        // url_o: cdnImg(e.url_o),
        // url_q: cdnImg(e.url_q),
        // url_sq: cdnImg(e.url_sq),
      }))
    }
  })
}

/**
 * @returns {Promise<FlickrPhotoObj>}
 */
export function getPhotoSize(photo_id) {
  return callMethod({
    method: 'flickr.photos.getSizes',
    photo_id,
  }).then(({ sizes: { size = [] } }) => {
    return (size || [])
      .map(({ url, source, height, width }) => {
        const [, si] = /\/sizes\/(sq|q|t|s|n|m|z|c|l|h|k|o)\/$/.exec(url)
        return si ? {
          [`url_${si}`]: source,
          [`width_${si}`]: width,
          [`height_${si}`]: height,
        } : {}
      })
      .reduce((e, o) => {
        Object.assign(e, o);
        return e;
      }, { id: photo_id })

  })
}



/**
 * @returns {Promise<FlickrPhotoObj>}
 */
export function getPhotoInfo(photo_id) {
  return callMethod({
    method: 'flickr.photos.getInfo',
    photo_id,
  }).then(({ photo }) => {
    return {
      title: photo.title._content,
      username: photo.owner.username,
      owner: photo.owner.nsid,
      ownername: photo.owner.realname,
      count_views: photo.views,
      count_comments: photo.comments._content,
      description: photo.description._content,
      // count_faves: string;
      // count_notes: string;
      // pathalias: 
    }
  })
}


export function peopleGetPhotos({ user_id, per_page = 100, page = 1, extras = EXTRASTRING, get_user_info = 0 }) {
  return callMethod({
    method: 'flickr.people.getPhotos',
    user_id,
    per_page,
    page,
    extras,
    get_user_info,
  }).then(({ photos, user }) => ({ ...photos, user }))
}


export function peopleGetInfo(user_id){
  return callMethod({
    method: 'flickr.people.getInfo',
    user_id,
    extras: `icon_urls_deep,contacts,reverse_contacts,rev_ignored,favorites_count,count_groups_admin,profile_website`,
    datecreate: 1,
  })
}

window.callMethod = callMethod








