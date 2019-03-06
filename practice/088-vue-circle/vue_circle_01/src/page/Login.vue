<template>
  <div>
    <div class="form-container">
      <h1>登录</h1>
      <form @submit.prevent="login">
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
            <div class="error" v-if="error.invalidMatch">帐号或密码有误</div>
          </label>
        </div>
        <div class="input-control">
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
      current: {},
      error: {
        username: "",
        password: "",
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
      if (c.username !== admin.username || c.password !== admin.password) {
        return false;
      }
      return true;
    },
    login() {
      if (this.isAdmin()) {
        let user = {...this.current};
        user.IS_ADMIN = true;
        session.login(user.id, user, '/#/admin/user');
        return;
      }
      let c = this.current;
      let username = c.username;
      let password = c.password;
      if (!username || !password) return;

      let params = { where: { and: { username, password } } };
      api("user/first", params).then(r => {
        let user = r.data;
        if (!user) {
          this.error.invalidMatch = true;
          return;
        }
        session.login(user.id, user);
      });
    }
  }
};
</script>

<style scoped>
</style>
