import { select, takeEvery, take, put, } from 'redux-saga/effects'
import { updateStateAction, emptyState } from '../../utils/reducerutils'
import { get as getpath } from 'lodash'
import Device from '../../utils/device'

const fetchNumber = 10


const fetchMediumPost = function* () {
  const { posts, end, loading } = yield select(state => state.blog || {})

  if (loading)
    return;

  try {
    let query = `https://giftoproxy.herokuapp.com/medium/@gifto/latest?limit=${fetchNumber}`

    if (posts.length > 0) {
      var lastPost = [...posts].reverse().find(e => e.createdAt)
      // console.log({ lastPost })
      if (lastPost)
        query += `&to=${lastPost.createdAt}`
    }

    yield put(updateStateAction({
      data: { loading: true },
      paths: "blog",
    }))

    if (Device.isSPA) {
      return;
    }

    const datas = yield fetch(query)
      .then(e => e.json())
      .then(({ response = [] } = {}) => {
        return response.map(({
          title, slug, uniqueSlug, id, detectedLanguage, firstPublishedAt, createdAt,
          content: { subtitle } = {},
          virtuals: {
            previewImage: { imageId, originalHeight, originalWidth } = {},
            tags = []
          } = {},
          previewParagraphs,
        }) => ({
          title: title,
          image: (originalWidth == 0 || originalHeight == 0 || imageId == '0*KxPBoJJUVkoebIHb.')
            ? `/images/defaultpost.png`
            : `https://miro.medium.com/fit/c/${originalWidth}/${originalHeight}/${imageId}`,
          thumb: (originalWidth == 0 || originalHeight == 0)
            ? `/images/defaultpost.png`
            : `https://miro.medium.com/fit/c/300/300/${imageId}`,
          des: subtitle,
          link: `https://medium.com/gifto/${uniqueSlug}`,
          detectedLanguage: detectedLanguage,
          createdAt,
          uniqueSlug,
          previewParagraphs,
          tags,
        }))
      });

    yield put(updateStateAction({
      data: {
        datas: datas,
        error: '',
        end: datas.length < fetchNumber
      },
      paths: "blog",
      reducer: ({ posts, loading }, { datas, end }) => ({
        loading: false,
        posts: [...posts, ...datas],
        error: '',
        end,
      })
    }))

  } catch (error) {
    yield put(updateStateAction({
      data: {
        loading: false,
        error: error + ''
      },
      paths: "blog",
    }))
  }
}



const fetchPostContent = function* ({ data: { postid } }) {
  const { posts } = yield select(state => state.blog || {})

  const post = posts.find(e => e.uniqueSlug == postid)


  if (post && post.loading)
    return;

  try {
    let query = `https://giftoproxy.herokuapp.com/medium/p/${postid}`

    yield put(updateStateAction({
      data: { loading: true, postid },
      paths: "blog.posts",
      reducer: (posts, { loading, postid }) => {
        return post
          ? posts.map(e => e.uniqueSlug == postid ? ({ ...e, loading: true }) : e)
          : [...posts, { uniqueSlug: postid, loading: true }]
      }
    }));

    if (Device.isSPA) {
      return;
    }

    const datas = yield fetch(query)
      .then(e => e.json())
      .then(({ response: [postdata] = [] } = {}) => {
        return postdata.paragraphs
      });

    yield put(updateStateAction({
      data: { loading: false, postid, datas },
      paths: "blog.posts",
      reducer: (posts, { loading, postid, datas }) => {
        return posts.map(e => e.uniqueSlug == postid ? ({ ...e, paragraphs: datas, loading: false }) : e)
      }
    }));

  } catch (error) {
    yield put(updateStateAction({
      data: { loading: true, postid },
      paths: "blog.posts",
      reducer: (posts, { loading, postid }) => {
        return posts.map(e => e.uniqueSlug == postid ? ({ ...e, loading: false, error: true }) : e)
      }
    }));
  }
}

const initialState = ({ }) => put(updateStateAction({
  data: {
    posts: [],
    end: false,
    loading: false,
    error: '',
  },
  paths: "blog",
}))


export default function* state() {
  yield takeEvery("@@SAGA", initialState)
  yield takeEvery("FETCH_MEDIUM_POSTS", fetchMediumPost)
  yield takeEvery("FETCH_MEDIUM_POST", fetchPostContent)
}

