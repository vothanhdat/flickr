
var queryParam = function (ary) {
  return Object.keys(ary).map(function (key) {
    if (Array.isArray(ary[key])) {
      var arrayParts = [];
      for (var i = 0; i < ary[key].length; i++) {
        arrayParts.push(encodeURIComponent(key + '[]') + '=' + encodeURIComponent(ary[key][i]));
      }
      return arrayParts.join('&');
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(ary[key]);
  }).join('&');
};

var formBody = function (form) {
  var formData = new FormData()
  for (var key in form) {
    var value = form[key];
    if (value instanceof Array) {
      value.forEach(f => formData.append(`${key}[]`, f, f && f.fileName || undefined))
    } else if (value instanceof Object) {
      Object.entries((k, f) => formData.append(`${key}[${k}]`, f, f && f.fileName || undefined))
    } else {
      formData.append(key, value, value && value.fileName || undefined)
    }
  }
  return formData
}


export default function CallAPI(
  url = '',
  {
    method = "GET",
    params = undefined,
    query = undefined,
    body = undefined,
    form = undefined,
  } = {},
  options = {},
) {
  // var urlData = new URL(url)
  if (typeof params == 'object') {
    for (var key in params)
      url = url.replace('{' + key + '}', params[key]);
  }

  if (typeof query == 'object') {
    url += '?' + queryParam(query)
  }

  var requestBody = body

  if (!(requestBody instanceof ArrayBuffer) && typeof requestBody == 'object')
    requestBody = JSON.stringify(requestBody);

  if (typeof form == 'object' && !(form instanceof FormData)) {
    requestBody = formBody(form);
  }

  var request = fetch(url, {
    method: method,
    body: requestBody,
    ...options,
  }).then(response => {
    if(response.ok){
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json"))
        return response.json();
      return response.text();
    }else{
      return Promise.reject(response.json())
    }
  })

  return request;
}