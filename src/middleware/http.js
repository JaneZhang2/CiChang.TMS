import fetch from 'isomorphic-fetch';
import _ from 'lodash';

function http(url, options) {
  console.log(options)

  return fetch(url, options).then(function (response) {
    if (response.status !== 200) {
      var err = new Error('网络异常');
      err.status = response.status;
      throw err;
    }
    return response.json().then(function (res) {
      if (res.status !== 0) {
        var err = new Error(res.message || '未知错误');
        err.status = res.status;
        throw err;
      }
      return res.data;
    }, function () {
      var err = new Error('数据解析异常');
      err.status = 'DATA-ERROR';
      throw err;
    })
  }, function (error) {
    console.log('fetch error : ' + error);
    error.status = 'FETCH-ERROR';
    throw error;
  })
}

http.defaults = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
};

http.formData = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
};

let params = function (obj) {

  var params = [], escape = encodeURIComponent;
  params.add = function (key, value) {

    if (_.isFunction(value)) {
      value = value();
    }

    if (value === null) {
      value = '';
    }

    this.push(escape(key) + '=' + escape(value));
  };

  serialize(params, obj);

  return params.join('&').replace(/%20/g, '+');
};

function serialize(params, obj, scope) {
  var array = _.isArray(obj), plain = _.isPlainObject(obj), hash;

  _.each(obj, function (value, key) {

    hash = _.isObject(value) || _.isArray(value);

    if (scope) {
      key = scope + '[' + (plain || hash ? key : '') + ']';
    }

    if (!scope && array) {
      params.add(value.name, value.value);
    } else if (hash) {
      serialize(params, value, key);
    } else {
      params.add(key, value);
    }
  });
}

http.get = function (url, options) {
  options = options || {};
  options.method = "GET";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.post = function (url, data, options) {
  options = options || {};
  options.body = JSON.stringify(data);
  options.method = "POST";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.put = function (url, data, options) {
  options = options || {};
  options.body = JSON.stringify(data);
  options.method = "PUT";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

http.putForm = function (url, data, options) {
  options = options || {};
  options.body = params(data);
  options.method = "PUT";
  options = _.merge({}, http.formData, options);
  return http(url, options);
};


http.delete = function (url, options) {
  options = options || {};
  options.method = "DELETE";
  options = _.merge({}, http.defaults, options);
  return http(url, options);
};

export default http;