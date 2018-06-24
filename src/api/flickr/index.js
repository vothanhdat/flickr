import flickrAPI from './fetch'
import resource from './resource'
import { fromPairs } from 'lodash'


/**
 * @returns {{
    oauth_callback_confirmed : string,
    oauth_token : string,
    oauth_token_secret : string,
 }}
 */
export function requestToken() {
  return flickrAPI(
    resource.request_token,
    {
      oauth_callback: 'http://vothanhdat.azurewebsites.net/flickr'
    }
  ).then(e => fromPairs(e
    .split('&')
    .map(e => e.split("="))
  ))
}




