<template>
  <div>
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
</template>

<script>
import api from "../lib/api.js";
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
      if (!this.validate()) {
        return;
      }
      api("user/create", this.current).then(r => {
        if (r.success) {
          this.$router.push("/login");
        }
      });
    },
    validate() {
      let c = this.current;
      let e = this.error;
      e.username = "";
      e.password = "";
      e.password2 = "";
      let username = c.username;
      let password = c.password;
      let password2 = c.password2;
      let invalidUsername = !/^[a-zA-Z0-9]{4,12}$/.test(username);
      invalidUsername ? (e.username = "用户名须在4-12之间") : null;

      let invalidPassword = password.length < 6;
      invalidPassword ? (e.password = "密码长度需大于6位") : null;

      let invalidPassword2 = password2 !== password;
      invalidPassword2 ? (e.password2 = "两次密码输入不一致") : null;

      return !e.username && !e.password && !e.password2;
    }
  }
};
</script>