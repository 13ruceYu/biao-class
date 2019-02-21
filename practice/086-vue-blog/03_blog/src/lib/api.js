import axios from 'axios'

let appKey = '0935d947e500dc7a51623da515a2f39910a79f9e4a42e78c0145fe03d5eb032a';

export default function api(url, data) {
  let timestamp = Date.now();

  return axios.post(`https://mock.biaoyansu.com/api/1/${url}`, data, {
    headers: {
      'BIAO-MOCK-APP-KEY': appKey,
      'BIAO-MOCK-TIMESTAMP': timestamp,
      'BIAO-MOCK-SIGNATURE': sign(appKey, timestamp),
    }
  }).then(r => {
    return r.data;
  })
}

function sign(appKey, timestamp) {
  return btoa(appKey + timestamp);
}