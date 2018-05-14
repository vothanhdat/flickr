import { sagaMiddleWare, store } from '../store'





import sagaState from './app'

sagaMiddleWare.registerNewSaga(sagaState)
    .hot(cb => module.hot.accept('./app', cb(() => sagaState)))




import blogState from './blog'

sagaMiddleWare.registerNewSaga(blogState)
    .hot(cb => module.hot.accept('./blog', cb(() => blogState)))



import feedState from './feed'

sagaMiddleWare.registerNewSaga(feedState)
    .hot(cb => module.hot.accept('./feed', cb(() => feedState)))



import feedProfile from './profile'

sagaMiddleWare.registerNewSaga(feedProfile)
    .hot(cb => module.hot.accept('./profile', cb(() => feedProfile)))


import feedStream from './stream'

sagaMiddleWare.registerNewSaga(feedStream)
    .hot(cb => module.hot.accept('./stream', cb(() => feedStream)))




store.dispatch({ type: "@@SAGA" })




