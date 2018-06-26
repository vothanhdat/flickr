import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { injectState, thunkMiddleware, updateStateAction, routeScrollMiddleware } from '../utils/reducerutils'
import { createSagaMiddleware } from '../utils/sagautils'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware, push } from 'react-router-redux'




export const history = createHistory()

export const sagaMiddleWare = createSagaMiddleware()

// history.listen((location, action) => {
//     // console.log(location.)
//     // if(action == 'PUSH' && !location.hash){
//     //     document.head.scrollIntoView({
//     //         behavior: "instant",
//     //         inline: "start"
//     //     });
//     //     console.log('scrollToTop');
//     // }else  
//     if (location.hash) {
//         setTimeout(() => {
//             const id = location.hash.replace('#', '');
//             const element = document.getElementById(id);
//             if (element) element.scrollIntoView({
//                 behavior: location.pathname != window.location.pathname 
//                     ? "instant" 
//                     : "smooth"
//                 });
//         }, 0);
//     }

// })




const injectReducer = (state = {}, action) => {
    if (action && action.injectpayload) {

        const payloads = action.injectpayload instanceof Array
            ? action.injectpayload
            : [action.injectpayload]

        return action.injectpayload.reduce(
            (state, payload) => injectState(
                payload.data,
                state,
                payload.paths,
                payload.reducer,
            ),
            state
        )
    } else {
        return state
    }
}


const reducer = (state = {}, action) => ({
    ...injectReducer(state, action),
    router: routerReducer(state.router, action),
})


const middlewares = [
    routerMiddleware(history),
    thunkMiddleware,
    sagaMiddleWare,
    // routeScrollMiddleware,
]


export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlewares))
)

