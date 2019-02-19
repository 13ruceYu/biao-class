Vue.filter('meter', function (val, unit) {
  val = val || 0;
  unit = unit || 'm';
  return (val / 1000).toFixed(2) + unit;
})

Vue.filter('currency', function (val, unit) {
  val = val || 0;
  unit = unit || '$';
  return val + unit;
})

new Vue({
  el: '#app',
  data() {
    return {
      price: 10,
      length: 12,
    }
  },
})