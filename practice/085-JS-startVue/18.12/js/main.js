Vue.component('balance', {
  template: `
  <div>
    <show @show-balance="show_balance"></show>
    <div v-if="show_balance">
      您的余额：￥10000
    </div>
  </div>
  `,
  methods:{
    show_balance(data) {
      this.show = true;
      console.log(data);
    }
  },
  data() {
    return {
      show: false,
    }
  },
});

Vue.component('show', {
  template: '<button @click="on_click()">显示余额</button>',
  methods: {
    on_click() {
      this.$emit('show-balance', {a:1})
    }
  },
})

new Vue({
  el: '#app'
})