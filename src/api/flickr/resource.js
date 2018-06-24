

export const baseURL = `https://www.flickr.com/services/`
export default {
  __base: baseURL,
  request_token: { URL: `oauth/request_token` },
  authorize: { URL: `oauth/authorize` },
  access_token: { URL: `oauth/access_token` },
}