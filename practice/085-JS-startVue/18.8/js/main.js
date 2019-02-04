let app = new Vue({
  el: '#app',
  data: {
    math: 90,
    physics: 80,
    english: 20,
  },
  methods: {

  },
  computed: {
    sum() {
      return parseFloat(this.math) + parseFloat(this.physics) + parseFloat(this.english)
    },
    average() {
      return Math.round(this.sum / 3)
    }
  },
})