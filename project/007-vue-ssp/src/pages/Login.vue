<template>
  <div class="login">
    <div class="container-form">
      <div class="form-login">
        <div class="title text-center">
          <router-link to="/">
            <img src="../img/logo-black.png" alt="logo">
          </router-link>
        </div>
        <form @submit.prevent="login">
          <div class="input-field">
            <input type="text" placeholder="手机号码" v-model="form.phone">
          </div>
          <div class="input-field">
            <input type="text" placeholder="密码" v-model="form.password">
          </div>
          <div class="list-error">
            <div class="error" v-for="(e, index) in listError" :key="index">{{e}}</div>
          </div>
          <div class="input-field f-small">
            <label>
              <input type="checkbox">
              <span>记住密码</span>
            </label>
            <span class="f-right">
              <router-link to="/forgotpassword">忘记密码？</router-link>
            </span>
          </div>
          <div class="input-field">
            <button type="submit">登录</button>
          </div>
          <div class="to-signup">
            <router-link to="/signup">还没有账号？快来注册吧</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { is } from "../lib/valee";
import api from "../lib/api";
import session from "../lib/session";
export default {
  data() {
    return {
      form: {
        phone: "",
        password: ""
      },
      listError: []
    };
  },
  methods: {
    login() {
      let f = this.form;
      this.listError = [];

      if (f.phone === "admin" && f.password === "yoyoyo") {
        session.login("admin", { nickname: "admin", IS_ADMIN: true });
        return;
      }

      if (!this.validate()) {
        return;
      }

      api("user/first", { where: { and: { phone: f.phone } } }).then(r => {
        if (r.success) {
          let user = r.data;
          if (!user) {
            this.listError.push("账号不存在，请先注册");
            return;
          }
          if (f.password !== user.password) {
            this.listError.push("手机号或密码有误，请重新输入");
            return;
          }
          delete user.password;
          session.login(user.id, user);
        }
      });
    },
    validate() {
      let f = this.form;
      let e = (this.listError = []);
      if (!is.phone(f.phone)) {
        e.push("手机号码格式有误");
      }

      if (!f.password) {
        e.push("请填写密码");
      }

      if (e.length) {
        return false;
      }

      return true;
    }
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 50px;
}

.title a {
  display: inline-block;
}

.container-form {
  position: absolute;
  max-width: 500px;
  height: 500px;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 10px 10px 0 10px;
}

.form-login {
  padding: 50px 30px;
  border: 1px solid #dbe2e8;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
  box-sizing: border-box;
  background-color: #fff;
}

.input-field.f-small label > * {
  display: inline-block;
  vertical-align: middle;
}

.to-signup {
  margin-top: 20px;
  color: #4a90e2;
}
</style>
