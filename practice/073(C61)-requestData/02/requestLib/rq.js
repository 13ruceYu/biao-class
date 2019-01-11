;
(function () {

  'use strict';

  window.rq = {
    get,
    post,
  };

  function get(url, onSuccess, onError) {
    send(url, 'get', null, onSuccess, onError)
  };

  function post(url, data) {
    send(url, 'post', data, onSuccess, onError)
  };

  function send(url, type, data, onSuccess, onError) {
    let http = new XMLHttpRequest();
    http.open(type, url);
    http.send();

    http.addEventListener('load', () => {
      let data = JSON.parse(http.responseText);
      onSuccess && onSuccess(data);
    })
  }

})();