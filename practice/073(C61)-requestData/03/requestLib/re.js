;
(function () {

  'use strict';

  window.re = {
    get,
    post
  };

  function send(url, type, data, onSuccess, onError) {
    let http = new XMLHttpRequest();
    http.open(type, url);
    http.send();
    http.addEventListener('load', () => {
      let data = JSON.parse(http.responseText);
      onSuccess && onSuccess(data);
      onError && onError(error);
    })
  }

  function get(url, onSuccess) {
    send(url, 'get', null, onSuccess);
  }

  function post(url, data) {

  }

})();