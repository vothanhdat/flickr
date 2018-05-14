import { withTranslate, RegisterLanguage, T } from '../components/Language'
import FileField from 'react-collections/FileField';

function checkfileSizeMax(val, state, props, max = 5 * 1024 * 1024) {
  return FileField.globalBlob[val] && FileField.globalBlob[val].size < max
}

function checkfileSizeMin(val, state, props, min = 200 * 1024) {
  return FileField.globalBlob[val] && FileField.globalBlob[val].size > min
}

function notEmpty(val) {
  return !!val
}

function passAll(val) {
  return true
}

const noop = e => e

var validateFun = {

  passAll: () => passAll,

  validate: function (validateFuns) {
    return function (val, state, props) {
      var { _ = noop } = props || {}
      for (var i in validateFuns) {
        var [patent, message, ...params] = validateFuns[i]
        if (patent instanceof Function) {
          if (!patent(val, state, props, ...params))
            throw _(message, ...params) || message
        } else if (!patent.test(val)) {
          throw _(message, ...params) || message
        }
      }
      return true;
    }
  },

  validatePass: function ({ upper = false, lower = false, special = false, number = false, min = 6 } = {}) {
    const validateFuns = []
    validateFuns.push([(e, f, minimun) => e.length >= minimun, T.password_error_min, min])
    upper && validateFuns.push([e => /[A-Z]/.test(e), T.password_error_upper])
    lower && validateFuns.push([e => /[a-z]/.test(e), T.password_error_lower])
    special && validateFuns.push([e => /(?=.*[!@#$%^&*])/.test(e), T.password_error_symbol])
    number && validateFuns.push([e => /[0-9]/.test(e), T.password_error_number])
    return validateFun.validate(validateFuns)
  },

  validateRePass: refpass => validateFun.validate([
    [(e, state) => e == state[refpass], T.repassword_error]
  ]),

  validateCondition: function (list) {
    return function (val, state, props) {
      for (var i in list) {
        if (list[i][0](val, state, props))
          list[i][1](val, state, props)
      }
      return true;
    }
  },
  validateArray: function (validateFun, splitSym = ',') {
    return function (val, state, props) {
      var valueList = (val + '').split(splitSym)
      var errorMsg = [];
      var isError = false;
      for (var i in valueList) {
        try {
          validateFun(valueList[i], state, props);
          errorMsg.push('');
        } catch (error) {
          isError = true;
          errorMsg.push(error);
        }
      }
      if (isError){
        throw errorMsg
      }
      return true;
    }
  },

  validateNotEmpty: message => validateFun.validate([
    [notEmpty, message || T.error_field_required],
  ]),

  validateChecked: message => validateFun.validate([
    [notEmpty, message || T.error_accept]
  ]),

  validateEmail: ({ requremsg, wrongmsg } = {}) => {
    return validateFun.validate([
      [notEmpty, requremsg || T.email_error_required],
      [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i, wrongmsg || T.email_error_wrong]
    ])
  },

  validateEthaddr: ({ requremsg, wrongmsg } = {}) => validateFun.validate([
    [notEmpty, requremsg || T.eth_error_required],
    [/^0x[0-9A-Za-z]{40}$/i, wrongmsg || T.eth_error_wrong]
  ]),

  validateFile: ({ test = /\.(jpe?g|png|heif|hevc)$/i, testMsg = "png, jpg", min, max } = {}) => validateFun.validate([
    [test, T.only_allow_filetype, testMsg],
    ...min ? [[checkfileSizeMin, T.error_min_size, min]] : [],
    ...max ? [[checkfileSizeMax, T.error_max_size, max]] : [],
  ]),

  // validateCapcha: function (ref) {
  //   return validateFun.validate(ref, [
  //     [function () { return grecaptcha.getResponse() }, T.capcha_error_required],
  //   ])
  // },
}


export default validateFun
