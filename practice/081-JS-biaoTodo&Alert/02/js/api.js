;
(function () {

  'use strict';

  window.api = post;

  api.get = get;

  let appKey = '94a61d993f2d25d0b35715108f83fa7b2adfa4428e1ea96b4a9fc36bde124d6e';

  function post(action, data, onSuccess, onError) {
    send('post', action, data, onSuccess, onError);
  };

  function get(action, onSuccess, onError) {
    send('get', action, null, onSuccess, onError);
  };

  function send(method, action, data, onSuccess, onError) {
    let http = new XMLHttpRequest();
    let baseUrl = 'https://mock.biaoyansu.com/api/1/';
    let timestamp = (new Date).getTime();

    http.open(method, baseUrl + action);

    http.setRequestHeader('BIAO-MOCK-APP-KEY', appKey);
    http.setRequestHeader('BIAO-MOCK-TIMESTAMP', timestamp);
    http.setRequestHeader('BIAO-MOCK-SIGNATURE', sign(appKey, timestamp));
    http.setRequestHeader("Content-Type", "application/json");

    let json = JSON.stringify(data);

    http.send(json);

    http.addEventListener('load', $ => {
      onSuccess && onSuccess(JSON.parse(http.responseText));
    })

    http.addEventListener('error', $ => {
      onError && onError(JSON.parse(http.responseText));
    })
  };

  function sign(appKey, timestamp) {
    return btoa(appKey + timestamp);
  }

})();