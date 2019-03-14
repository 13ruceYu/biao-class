import axios from 'axios'

let appKey = '62700c6bd7199a620778c71e6878aebb8928d1d15aa61bccdf068f1eed1d14ad';

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