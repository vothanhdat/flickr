
const commonAction = actionMame => 
    (dispatch,props) => 
    (data) => 
    dispatch({type: actionMame ,data,props})


export const CHANGE_LANGUAGE = commonAction('CHANGE_LANGUAGE')
export const CHANGE_THEME = commonAction('CHANGE_THEME')
export const FETCH_MEDIUM_POSTS = commonAction('FETCH_MEDIUM_POSTS')
export const FETCH_MEDIUM_POST = commonAction('FETCH_MEDIUM_POST')
export const FETCH_STREAM_LIST = commonAction('FETCH_STREAM_LIST')
export const FETCH_PROFILE = commonAction('FETCH_PROFILE')
export const FETCH_STREAM = commonAction('FETCH_STREAM')
export const FLICKR_LOGIN = commonAction('FLICKR_LOGIN')
