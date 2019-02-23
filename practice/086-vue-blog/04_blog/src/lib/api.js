import axios from 'axios'

let appKey = '0a13c3330898e59adbcef932963b96be5f01c40c683f1cb66373c92d4457c631';

export default function api(url, data) {
  let timestamp = Date.now();

  return axios.post(`https://mock.biaoyansu.com/api/1/${url}`, data, {
      headers: {
        'BIAO-MOCK-APP-KEY': appKey,
        'BIAO-MOCK-TIMESTAMP': timestamp,
        'BIAO-MOCK-SIGNATURE': sign(appKey, timestamp),
      }
    })
    .then(r => {
      return r.data;
    })
}

function sign(appKey, timestamp) {
  return btoa(appKey + timestamp);
}