import reduxSaga from 'redux-saga'
import { put } from 'redux-saga/effects'


const createSagaMiddleware = function () {

  const sagaMiddleware = reduxSaga()

  sagaMiddleware.registerNewSaga = function (func) {

    let obj = sagaMiddleware.run(function* () {
      yield put({ type: "REG_SAGARUNTIME." + func.name || "noname", name: func.name || "noname" });
      yield func();
    });


    if (module.hot) {
      return {
        hot: cb => cb((funcGetter) => () => {
          console.log('DO RELOAD')
          var func = funcGetter();
          obj.cancel();
          obj = sagaMiddleware.run(function* () {
            yield put({ type: "SWAP_SAGARUNTIME." + func.name || "noname", name: func.name || "noname" });
            yield func();
          });
        })
      }
    } else {
      return { hot() { } }
    }

  }
  return sagaMiddleware
}


export {
  createSagaMiddleware,
}