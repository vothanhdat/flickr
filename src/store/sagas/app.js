import { select, takeEvery,take,put, } from 'redux-saga/effects'

import {updateStateAction,emptyState} from '../../utils/reducerutils'




const changeLanguage =  ({data : {lang}}) =>  put(updateStateAction({
  data: {lang},
  paths: "app",
}))

const changeTheme =  ({data : {theme}}) =>  put(updateStateAction({
  data: {theme},
  paths: "app",
}))


const initialState = ({}) => put(updateStateAction({
    data: {
      lang:'en',
      theme:'normal'
    },
    paths: "app",
}))


export default function * state(){
    yield takeEvery("@@SAGA",initialState)
    yield takeEvery("CHANGE_LANGUAGE",changeLanguage)
    yield takeEvery("CHANGE_THEME",changeTheme)
}

