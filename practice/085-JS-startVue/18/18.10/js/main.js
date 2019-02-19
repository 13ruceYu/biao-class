Vue.component('like', {
  template: '#like-component-tpl',
  data() {
    return {
      like_count: 10,
      liked: false,
    }
  },
  methods: {
    toggle_likes() {
      if (!this.liked)
        this.like_count++;
      else this.like_count--;
      this.liked = !this.liked;
    }
  },
})

new Vue({
  el: '#app'
})