var Event = new Vue();

Vue.component('huahua', {
    template:`
    <div>
      我说：<input @keyup="on_change" v-model="i_said">
    </div>`,
    data() {
      return {
        i_said:'',
      }
    },
    methods: {
      on_change(){
        Event.$emit('huahua-said-something', this.i_said)
      }
    },
})
Vue.component('shuandan', {
  template:`
  <div>
    花花说：{{huahau_said}}
  </div>`,
  data() {
    return {
      huahau_said:'',  
    }
  },
  mounted() {
    let me = this;
    Event.$on('huahua-said-something', function (data) {
      me.huahau_said = data;
    })
  },
})

new Vue({
  el: '#app'
})