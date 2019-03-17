import axios from 'axios'

let appKey = 'a5f52bf347a055e45217064ed3e152f6f50d8c7262b37d19c4323381090993dc';

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