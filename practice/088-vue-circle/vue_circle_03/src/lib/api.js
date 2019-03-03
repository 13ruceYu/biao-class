import axios from 'axios'

let appKey = 'a00bdbb6535cad56365c12fd95ebf54ea0154d521e678059e41923ea0055b433';

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