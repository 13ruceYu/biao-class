<template>
  <div>
    <div class="form-container">
      <h1>注册</h1>
      <form @submit.prevent="signup">
        <div class="input-control">
          <label>
            <span class="field">用户名</span>
            <input type="text" v-model="current.username">
            <span v-if="error.username" class="error">{{error.username}}</span>
          </label>
        </div>
        <div class="input-control">
          <label>
            <span class="field">密码</span>
            <input type="password" v-model="current.password">
            <span v-if="error.password" class="error">{{error.password}}</span>
          </label>
        </div>
        <div class="input-control">
          <label>
            <span class="field">重复密码</span>
            <input type="password" v-model="current.password2">
            <span v-if="error.password2" class="error">{{error.password2}}</span>
          </label>
        </div>
        <div class="input-control">
          <button type="submit">注册</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
export default {
  data() {
    return {
      current: {},
      error: {
        username: "",
        password: "",
        password2: "",
      }
    };
  },
  methods: {
    signup() {
      if (!this.validateCurrent()) return;

      api("user/create", this.current).then(r => {
        if (r.success) this.$router.push("/login");
      });
    },
    validateCurrent() {
      let e = this.error;
      let current = this.current;
      let username = current.username;
      let password = current.password;
      let password2 = current.password2;

      let invalidUsername = !username || !/[a-zA-Z0-9]{4,12}/.test(username);
      let invalidPassword = !password || password.length < 6;
      let invalidPassword2 = !password2 || password2 !== password;

      invalidUsername
        ? (e.username = "用户名长度有误，长度应在4-12位之间")
        : (e.username = null);

      invalidPassword ? (e.password = "密码长度需大于6位") : (e.password = null);
      invalidPassword2 ? (e.password2 = "两次密码不一致") : (e.password2 = null);

      return !e.username && !e.password && !e.password2;
    }
  }
};
</script>

<style scoped>

</style>
