

export const mediumBaseURL = `https://giftoproxy.herokuapp.com/medium/`
export const mediumResource = {
  __base: mediumBaseURL,
  getposts: { URL: `{publisher_id}/latest` },
  getpost: { URL: `p/{post_id}` },
}