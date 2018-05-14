import { connect } from 'react-redux'
import { FETCH_MEDIUM_POSTS, FETCH_MEDIUM_POST } from '../actions'
import * as blogSelector from '../selects/blog'


export default ({ max = 3, selectFunction = blogSelector.getNewsByLanguage } = {}) => connect(
  ({ blog = {} }, { language: { name } }) => ({
    ...blog,
    posts: selectFunction(blog.posts, { langname: name, max })
  }),
  (dispatch, props) => ({
    fetchNewPost: FETCH_MEDIUM_POSTS(dispatch, props),
    autoFetchMore: (oldProps, newProps) => {
      if ((newProps.posts.length > oldProps.posts.length || oldProps.language.name != newProps.language.name) && newProps.posts.length < max)
        FETCH_MEDIUM_POSTS(dispatch, props)();
    },
  }),
)

export const blogPostConnect = ({ getPostID }) => connect(
  ({ blog: { posts = [] } = {} }, props) => {
    var postID = props.postid || getPostID(props)
    return ({
      post: posts.find(e => e.uniqueSlug == postID) || {},
      postid: postID,
    })
  },
  (dispatch, props) => {
    var postID = props.postid || getPostID(props)
    return ({
      fetchPost: () => FETCH_MEDIUM_POST(dispatch, props)({ postid: postID })
    })
  },
)

export * from '../selects/blog'