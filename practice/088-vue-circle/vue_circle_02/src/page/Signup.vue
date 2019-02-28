<template>
  <div>
    <div class="container">
      <h1>Signup</h1>
      <form class="form-container" @submit.prevent="signup">
        <div class="input-control">
          <label>
            <span class="field">用户名</span>
            <input v-model="current.username">
            <span class="error" v-if="error.username">{{error.username}}</span>
          </label>
        </div>
        <div class="input-control">
          <label>
            <span class="field">密码</span>
            <input type="password" v-model="current.password">
            <span class="error" v-if="error.password">{{error.password}}</span>
          </label>
        </div>
        <div class="input-control">
          <label>
            <span class="field">重复密码</span>
            <input type="password" v-model="current.password2">
            <span class="error" v-if="error.password2">{{error.password2}}</span>
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
      current: {
        username: "",
        password: "",
        password2: ""
      },
      error: {
        username: "",
        password: "",
        password2: ""
      }
    };
  },
  methods: {
    signup() {
      if (!this.validateCurrent()) {
        return;
      }

      api("user/create", this.current).then(r => {
        if (r.success) {
          this.$router.push("/login");
        }
      });
    },
    validateCurrent() {
      let e = this.error;
      let username = this.current.username;
      let password = this.current.password;
      let password2 = this.current.password2;

      let invalidUsername = !/^[a-zA-Z0-9]{4,12}$/.test(username);
      let invalidPassword = password.length < 6;
      let invalidPassword2 = (password2 !== password);

      invalidUsername
        ? (e.username = "用户名有误，长度应在4-12位之间")
        : (e.username = "");
      invalidPassword ? (e.password = "密码长度需大于6位") : (e.password = "");
      invalidPassword2 ? e.password2 = '两次密码不一致' : e.password2 = '';

      return !e.username && !e.password && !e.password2;
    }
  }
};
</script>