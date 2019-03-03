<template>
  <div>
    <h1>Login</h1>
    <form class="form-container" @submit.prevent="login">
      <div class="input-control">
        <label>
          <span class="field">用户名</span>
          <input v-model="current.username">
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="field">密码</span>
          <input type="password" v-model="current.password">
        </label>
      </div>
      <div class="input-control">
        <span class="error" v-if="error.invalidMatch">用户名或密码有误</span>
        <button type="submit">登录</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
export default {
  data() {
    return {
      current: {
        username: "",
        password: ""
      },
      error: {
        invalidMatch: false
      }
    };
  },
  methods: {
    login() {
      let c = this.current;
      let username = c.username;
      let password = c.password;
      if (!username && !password) {
        this.error.invalidMatch = true;
        return;
      }

      let params = {
        where: { and: this.current }
      };
      api("user/first", params).then(r => {
        if (!r.data) {
          this.error.invalidMatch = true;
          return;
        }
        let user = r.data;
        session.login("sessionId", user);
      });
    }
  }
};
</script>