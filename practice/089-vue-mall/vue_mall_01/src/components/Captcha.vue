<template>
  <div>
    <button @click="send" type="button" :disabled="count !== 0" :class="klass">
      <span v-if="count">{{count}}s</span>
      <span v-else>发送验证码</span>
    </button>
  </div>
</template>

<script>
import { send } from "../lib/captcha";
export default {
  props: ["sendBy", "receiver", "klass", 'countDown'],
  data() {
    return {
      timer: null,
      count: 0
    };
  },
  methods: {
    send() {
      if (this.count) return;
      this.count = this.countDown || 60;

      this.timer = setInterval(() => {
        this.count--;
        if (this.count < 0) {
          return (this.count = 0 && clearInterval(this.timer));
        }
      }, 1000);

      send(this.sendBy, this.receiver).then(r => {
        this.$emit("send", r);
      });
    }
  }
};
</script>

<style>
</style>
