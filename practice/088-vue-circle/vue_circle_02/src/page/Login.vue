<template>
  <div>
    <div class="container">
      <h1>Login</h1>
      <form class="form-container" @submit.prevent="login">
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
          <span class="error" v-if="error.invalidMatch">用户名或密码有误</span>
          <button type="submit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
import session from "../lib/session";

export default {
  data() {
    return {
      current: {
        username: "",
        password: ""
      },
      error: {
        invalidMatch: false
      },
      admin: {
        username: "admin",
        password: "yoyoyo"
      }
    };
  },
  methods: {
    isAdmin() {
      let c = this.current;
      let admin = this.admin;
      if (c.username !== admin.username || c.password !== admin.password)
        return false;
      return true;
    },
    login() {
      if (this.isAdmin()) {
        let user = {...this.current};
        user.IS_ADMIN = true;
        session.login(user.id, user, "/#/admin/user");
        return;
      }

      let username = this.current.username;
      let password = this.current.password;

      if (!username || !password) {
        return;
      }

      api("user/first", { where: { and: this.current } }).then(r => {
        if (r.success) {
          let user = r.data;
          if (!user) {
            this.error.invalidMatch = true;
            return;
          }
          session.login(user.id, user);
        }
      });
    }
  }
};
</script>