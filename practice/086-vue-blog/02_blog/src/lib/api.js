import axios from 'axios';

let appKey = '54fca1b72d3e95b6cb2fac82ca2b16c41ad35590a56bc185f708718e737daf0e';

export default function api(url, data) {
  let timestamp = Date.now();

  return axios.post(`https://mock.biaoyansu.com/api/1/${url}`, data, {
    headers: {
      'BIAO-MOCK-APP-KEY': appKey,
      'BIAO-MOCK-TIMESTAMP': timestamp,
      'BIAO-MOCK-SIGNATURE': sign(appKey, timestamp)
    }
  }).then(r => {
    return r.data;
  })
}

function sign(appKey, timestamp) {
  return btoa(appKey + timestamp);
}