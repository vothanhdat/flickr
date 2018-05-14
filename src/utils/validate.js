import { withTranslate, RegisterLanguage, T } from '../components/Language'

function checkfileExtendtions(val, input, type = "img") {
  val += '';
  switch (type) {
    case "img":
      return /(.png|.jpe?g|.heif|.hevc)$/i.test(val.toLowerCase())
    case "doc":
      return /(.docx?|.pdf|.pptx)$/i.test(val.toLowerCase())
    case "video":
      return /(.mp4|.avi|.mpeg|.ts|.mkv|.vob|.flv)$/i.test(val.toLowerCase())
    case "audio":
      return /(.mp3|.aac|.flac|.ape|.alac)$/i.test(val.toLowerCase())
  }
}
function checkfileSizeMax(val, input, size = 5 * 1024 * 1024) {
  return input && input.files[0] && input.files[0].size < size
}

function checkfileSizeMin(val, input, size = 200 * 1024) {
  return input && input.files[0] && input.files[0].size > 200 * 1024
}

function notEmpty(val) {
  return !!val
}

function passAll(val) {
  return !!val
}


var validateFun = {
  passAll: function () {
    return passAll
  },
  validate: function (ref, regex) {
    return function (state, form, props) {
      // var {_ = e => e} = props || {}
      var { _ } = props
      var val = state[ref]
      for (var i in regex) {
        var [patent, message, param] = regex[i]
        if (patent instanceof Function) {
          if (!patent(val, form && form[ref], param, state)) {
            throw _(message, param) || message
          }
        } else if (!patent.test(val)) {
          throw _(message, param) || message
        }
      }
      return true;
    }
  },
  validatePass: function (ref, option = { upper: false, lower: false, special: false, number: false, min: 6 }) {
    const valArray = []

    const minimun = option.min || 6

    const upper = option.upper || false
    const lower = option.lower || false
    const special = option.special || false
    const number = option.number || false

    valArray.push([(e, f, minimun) => e.length >= minimun, T.password_error_min, minimun])
    upper && valArray.push([e => /[A-Z]/.test(e), T.password_error_upper])
    lower && valArray.push([e => /[a-z]/.test(e), T.password_error_lower])
    special && valArray.push([e => /(?=.*[!@#$%^&*])/.test(e), T.password_error_symbol])
    number && valArray.push([e => /[0-9]/.test(e), T.password_error_number])

    return validateFun.validate(ref, valArray)
  },
  validateRePass: function (ref, refpass) {
    return validateFun.validate(ref, [
      [(e, _, __, state) => e == state[refpass], T.repassword_error]
    ])
  },
  validateCondition: function (list, stelst, trigger) {
    return function (state, form, props) {
      for (var i in list) {
        if (list[i][0](state, form, props))
          list[i][1](state, form, props)
      }
      stelst && stelst(state, form, props);
      return true;
    }
  },
  validateNotEmpty: function (ref, message) {
    return validateFun.validate(ref, [
      [notEmpty, message || T.error_field_required],
    ])
  },
  validateChecked: function (ref, message) {
    return validateFun.validate(ref, [
      [notEmpty, message || T.error_accept],
    ])
  },
  validateEmail: function (ref, { requremsg, wrongmsg } = {}) {
    return validateFun.validate(ref, [
      [notEmpty, requremsg || T.email_error_required],
      [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i, wrongmsg || T.email_error_wrong]
    ])
  },
  validateEthaddr: function (ref, { requremsg, wrongmsg } = {}) {
    return validateFun.validate(ref, [
      [notEmpty, requremsg || T.eth_error_required],
      [/^0x[0-9A-Za-z]{40}$/i, wrongmsg || T.eth_error_wrong]
    ])
  },
  // validateBitaddr : function(ref){
  //     return validateFun.validate(ref,[
  //         [notEmpty,"Bitcoin Address is required"],
  //         [/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/i, "Wrong Bitcoin address"]
  //     ])
  // },
  validateFile: function (ref) {
    return validateFun.validate(ref, [
      [checkfileExtendtions, "Only allow file type : png, jpg", 'img'],
      [checkfileSizeMax, 'Only allow file smaller than 5MB', 1024 * 1024 * 5],
      // [checkfileSizeMin, T.file_error_small,1024*200],
    ])
  },
  validateCapcha: function (ref) {
    return validateFun.validate(ref, [
      [function () { return grecaptcha.getResponse() }, T.capcha_error_required],
    ])
  },
}


export default validateFun
