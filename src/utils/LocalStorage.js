
let hash = Math.random()
let preHash = Math.random()
let data = {}


function setCookie(cname, cvalue, exdays) {
  cvalue = cvalue || ''
  exdays = exdays || 365
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString() + ';';
  var path = ' path= / ;'
  document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires + path;
  hash = Math.random()
}

function getCookie(cname) {
  if (hash == preHash) {
    return data[cname]
      ? decodeURIComponent(data[cname])
      : null
  } else {
    preHash = hash
    console.time('parse new')
    try {
      data = {}
      for (var [key, value] of document.cookie.split(';').map(e => e.split('='))) {
        data[(key || '').trim()] = value
      }
      console.timeEnd('parse new')

      return data[cname]
        ? decodeURIComponent(data[cname])
        : null
    } catch (error) {
      console.error(error)
      return null;
    }
  }
}



const LocalStorage = {
  getItem(key, defaultValue) {
    var value = getCookie(key)
    if (!value && defaultValue)
      setCookie(key, defaultValue, 365)
    return value || defaultValue || value
  },
  setItem(key, value, expires = 365) {
    setCookie(key, value, expires)
  },
  getBool(key, defaultValue) {
    return LocalStorage.getItem(key, defaultValue ? 'true' : 'false') == 'true'
  },
  setBool(key, value, expires = 365) {
    LocalStorage.setItem(key, value ? 'true' : 'false', expires)
  },
  get isEmbed() {
    return getCookie('isembed') == 'true'
  },
  set isEmbed(value) {
    setCookie('isembed', value ? 'true' : 'false', 365)
  },
}


/**
 * @template T
 * @param {T} defaultValue 
 * @param {{ forward: (e: string) => T, backward: (e: T) => string } | 'number' | 'boolean'} p 
 */
export const mapLocalStorageDecorator = function (defaultValue, p) {

  if (p == 'number') {
    p = { forward: parseInt, backward: e => (e | 0).toString() }
  } else if (p == 'boolean') {
    p = { forward: e => e == 'true', backward: e => e ? 'true' : 'false', }
  }

  return function (target, key) {

    Object.defineProperty(target, key, {
      get() {
        if (p && typeof p == 'object') {

          let value = p.forward(LocalStorage.getItem(key) || null)

          if (!value)
            LocalStorage.setItem(key, p.backward(defaultValue))

          return value || defaultValue
        } else {
          let value = LocalStorage.getItem(key)
          if (!value)
            LocalStorage.setItem(key, defaultValue)
          return value
        }
      },
      set(value) {
        if (p && typeof p == 'object') {
          LocalStorage.setItem(key, p.backward(value))
        } else {
          LocalStorage.getItem(key)
        }
      }
    })

  }
}



export default LocalStorage