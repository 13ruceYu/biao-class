Vue.directive('pin', function (el, binding) {
  let pinned = binding.value;
  if (pinned) {
    el.style.position = 'fixed';
    el.style.top = '10px';
    el.style.left = '10px';
  }
})

new Vue({
  el: '#app',
  data: {
    card1: {
      pinned:true,
    },
    card2: {
      pinned:false,
    },
  }
})