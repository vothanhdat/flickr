
export const thunkMiddleware = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action)


export const injectState = function (data, state, paths, endReducer) {
  if (paths.length > 0) {
    const [path, ...remainpaths] = paths

    const isArray = state instanceof Array && path == parseInt(path)
    state = state || (isArray ? [] : {});

    return isArray ? [
      ...state.slice(0, path),
      injectState(data, state[path], remainpaths, endReducer),
      ...state.slice((path * 1) + 1),
    ] : {
        ...state,
        [path]: injectState(data, state[path], remainpaths, endReducer),
      }
  } else {
    const isArray = state instanceof Array

    state = state || (isArray ? [] : {});

    return isArray
      ? endReducer(state, data)
      : (endReducer ? endReducer(state, data) : { ...state, ...data })
  }
}

export const emptyState = function (state) {
  var newState = {}
  for (var i in state)
    newState[i] = null;
  return newState
}

export const updateStateAction = function (...params) {
  return {
    injectpayload: params.map(
      ({ data, paths, reducer, actionName }) => ({
        data,
        paths: paths.split('.'),
        reducer
      })
    ),
    type: "INJECTSTATE."
      + params
        .map(e => e.actionName || 'noname')
        .join('.')
  }
}

import { LOCATION_CHANGE } from 'react-router-redux'


// console.log(location.)
// if(action == 'PUSH' && !location.hash){
//     document.head.scrollIntoView({
//         behavior: "instant",
//         inline: "start"
//     });
//     console.log('newScroll');
// }else  
if (location.hash) {
  setTimeout(() => {
    const id = location.hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({
      behavior: location.pathname != window.location.pathname
        ? "instant"
        : "smooth"
    });
  }, 0);
}

const SCROLLKEYS = ['scrollTop', 'scrollY', 'pageYOffset'].find(e => e in window)


export const routeScrollMiddleware = store => next => action => {

  if (LOCATION_CHANGE == action.type) {
    const scrollHistory = window.scrollHistory || (window.scrollHistory = {})

    const { action: actionType} = action

    let { router: { location: location1 = {} } = {} } = store.getState()

    location1 = location1 || {};

    scrollHistory[location1.key] = window[SCROLLKEYS]

    const result = next(action)

    const { router: { location: location2 } } = store.getState()

    const path1 = ("" + location1.pathname + location1.search).replace(/^(\/(zh|ko)\/)/,'/')
    const path2 = ("" + location2.pathname + location2.search).replace(/^(\/(zh|ko)\/)/,'/')
    const diffLang = path1 == path2 && ("" + location1.pathname + location1.search) != ("" + location2.pathname + location2.search)

    let newScroll = false, animatie = false;

    if (path1 != path2) {
      newScroll = true;
      animatie = false
    } else if (location2.hash && !diffLang) {
      animatie = true;
    }

    if (animatie) {
      setTimeout(() => {
        const id = location2.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "start",
        });

      }, 0);
    } else if (newScroll) {
      if(location2.hash){
        setTimeout(() => {
          const id = location2.hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({
            behavior: "instant"
          });
        }, 300);
      }else{
        location1.pathname && setTimeout(() => {
          window.scrollTo({
            top: scrollHistory[location2.key] || 0,
            behavior: "instant"
          })
        }, 300);
      }
    }
    return result;
  }


  return next(action)
}

