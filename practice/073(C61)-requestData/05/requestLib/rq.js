;
(function () {

  'use strict';

  window.rq = {
    get,
    post
  };

  function get(url, onSuccess) {
    let http = new XMLHttpRequest();
    http.open('get', url);
    http.send();
    http.addEventListener('load', () => {
      let data = JSON.parse(http.responseText);
      onSuccess && onSuccess(data);
    })
  }

  function post() {
    
  }

})();