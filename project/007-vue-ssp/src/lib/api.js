import axios from 'axios'

let appKey = '7b8cf678d10a16a0c9585a988b238da568938a58e1e32a2a36f35bc9c30e0b1f';

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