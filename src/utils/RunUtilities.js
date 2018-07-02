const RunTimeout = (function () {
  var $privateSym = Math.random()
  return function (task, timeOut = 200, context = window, key = '') {
    var key = $privateSym + ":timeout:" + key
    clearTimeout(context[key])
    context[key] = setTimeout(task, timeOut)
  }
})()


const RunWithLock = (function () {
  var $privateSym = Math.random()
  return async function (task, context = window, key = '') {
    var key = $privateSym + ":lock:" + key
    if (context[key]) return
    context[key] = true
    try {
      await task()
    } catch (error) { }
    context[key] = false
  }
})()

const CreateRoutineTask = (function () {

  const RoutineTaskData = {
    queue: [],
    ref: {},
  }
  const RoutineTask = {
    _taskData: {
      push: (function () {
        console.log(this)
        var {queue, ref} = RoutineTaskData
        return function (task, key) {
          if (!ref[key]) {
            //push task to end
            ref[key] = { task, key }
            queue.push(ref[key])
          } else {
            //swap exist task to end

            var idx = queue.indexOf(ref[key])
            var swapItem = queue.splice(idx, 1)
            queue.push(swapItem[0])

            ref[key].task = task
          }
        }
      })(),

      shift: (function () {
        var {queue, ref} = RoutineTaskData
        return function () {
          var Item = queue.shift()
          if (Item) {
            ref[Item.key] = undefined
            return Item.task
          }
          return null
        }
      })(),

      hasTask: (function () {
        var {queue, ref} = RoutineTaskData
        return function () {
          return queue.length > 0
        }
      })()
    },

    addTask: (function () {
      var taskRunning = false
      var TaskRun = function () {
        var nowTask = RoutineTask._taskData.shift();
        nowTask && setTimeout(nowTask, 0);

        taskRunning = RoutineTask._taskData.hasTask()
        taskRunning && setTimeout(TaskRun, 0);
        console.log("Run >>>>>>>>>>>>>>>...")

      }

      return function (task, key = Math.random()) {
        RoutineTask._taskData.push(task, key)
        taskRunning || TaskRun()
      }
    })()
  }
  return RoutineTask
})


const CreateWaitSingleTonInitTask = (function (initFunction) {

  let hadInit = false
  let isdone = false
  let isfail = false
  let resolveArray = []
  let rejectArray = []
  let failInstance = null
  let doneInstance = null

  let onDone = function (e) {
    isdone = true
    doneInstance = e
    resolveArray.forEach(f => f(e))
  }
  let onFail = function (e) {
    isfail = true
    failInstance = e
    rejectArray.forEach(f => f(e))
  }

  return function () {
    if (!hadInit) {
      initFunction(onDone, onFail)
      hadInit = true
    }
    return new Promise((resolve, reject) => {
      if (isdone)
        resolve(doneInstance)
      else if (isfail)
        reject(failInstance)
      else {
        resolveArray.push(resolve)
        rejectArray.push(reject)
      }
    })
  }
})


const PrepareAsyncWindowOpen = (function () {

  const replaceMessage = Math.random() + '';

  const WatingContent = `
    <html>
      <head>
        <base href="${document.baseURI}"/>
      </head>
      <body>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=1"/>
        <style>
          .div, body, html {
            margin : 0;
            padding : 0;
            color : white;
            font-family: Arial;
          }
          .root {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align : center;
            -webkit-align-items : center;
            -ms-flex-align : center;
            align-items : center;
            -webkit-box-orient:vertical;
            -webkit-box-direction:normal;
            -webkit-flex-direction:column;
            -ms-flex-direction:column;
            flex-direction:column;
            -webkit-box-pack : center;
            -webkit-justify-content : center;
            -ms-flex-pack : center;
            justify-content : center;
            height:100%;
            background: -webkit-linear-gradient(309deg,  #a9b9ec, #887bc0);
            background: linear-gradient(141deg,  #a9b9ec, #887bc0);
          }
        </style>
        <div class='root'>
          <div>
            <img src='/static/images/loader.svg' style='width:35px;height:35px;'/>
          </div>
          <div>
            <h3 style={{ padding: '25px' }}> ${replaceMessage}</h3>
          </div>
        </div>
      </body>
    </html>
  `

  const WindowOpen = window.open
  return function ({width = 600,height=400, message = 'Please wait a sec...'} = {}) {
    var {outerWidth,outerHeight,screenLeft,screenTop} = window
    var left  = outerWidth / 2 - width / 2 + (screenLeft || screenX)
    var top = outerHeight / 2 - height / 2 + (screenTop || screenY)
    var newWindow = WindowOpen.bind(window)('','',`width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`)
    newWindow.document.write(WatingContent.replace(replaceMessage,message))
    window.open = function (url) {
      newWindow.location.replace(url)
      window.open = WindowOpen
      return newWindow
    }
    return newWindow
  }
})()


const RunDeepLink = (function(){

  var Device = require('./device').default

  return function(path,params,force = false){
    if(!force && !Device.isInAppUplive)
      return;

    var frame = document.createElement('iframe');
    frame.src = `uplive://${path}?json=${JSON.stringify(params)}`;
    frame.style.display = 'none';
    document.body.appendChild(frame);
    setTimeout(function () {
      document.body.removeChild(frame);
    }, 4);
  }

})()


const WrapAsyncFuntion = (function(){

  const cache = {}

  return function(func,getKey){

    return function(...params){
      var key = getKey(...params)

      if(cache[key])
        console.log('Match running API : ' + key)
      var task = cache[key] || (cache[key] = func(...params))

      if(task && task.then && task.catch){
        task.then(() => cache[key] = null)
        task.catch(() => cache[key] = null)
      }else{
        cache[key] = null
      }
      return task
    }
  }
})()

const WaitForRecieveMsg = (function(){
  /**
   * @ {Window} opener
   */
  return function(openerWindow , tag) {
    const __privateOnMessage = window.__privateOnMessage
    return new Promise((resolve,reject) => {
      const removeListener = function () {
        openerWindow.close();
        window.removeEventListener('message', onMessage)
        window.__privateOnMessage = __privateOnMessage
        window.clearInterval(interval)
      }
      const onMessage = function (event) {
        try {
          var {data, type, error} = JSON.parse(event.data || '{}') || {}
          if (type == tag) {
            if (error)
              return reject(error)
            resolve(data);
            removeListener();
          }
        } catch (error) {
          console.error({ error, data: event.data });
        }
      }
      window.__privateOnMessage = (e) => {
        setTimeout(__privateOnMessage,0,e)
        onMessage(e)
      };
      const interval = window.setInterval(function () {
        if (!openerWindow || openerWindow.closed) {
          removeListener()
          reject(null)
        }
      }, 500)
      window.addEventListener('message', onMessage, false)
    })
  }
})()

const PostMsg = (function name() {
  return function(data,error,tag){
      const sendData  = JSON.stringify({type : tag, data : data})
      try {
          window.opener.postMessage(sendData,"*")
          console.log('POST MSG DONE')
      } catch (error) {}
      try {
        if(window.opener.__privateOnMessage){
          window.opener.__privateOnMessage({data : sendData,origin : "*"})
          console.log('FIRE METHOD DIRECTLY')
        }
      } catch (error) {}
  }
})()

var RunUtilities = {
  RunTimeout,
  RunWithLock,
  CreateRoutineTask,
  CreateWaitSingleTonInitTask,
  PrepareAsyncWindowOpen,
  RunDeepLink,
  WrapAsyncFuntion,
  WaitForRecieveMsg,
  PostMsg,
}

export default RunUtilities
