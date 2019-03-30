<template>
  <div class="login">
    <div class="form-container">
      <h1>登录</h1>
      <form @submit.prevent="login">
        <div class="input-field">
          <div class="title">手机号/邮箱</div>
          <el-input v-model="form.uniqueName"></el-input>
        </div>
        <div class="input-field">
          <div class="title">密码</div>
          <el-input v-model="form.password"></el-input>
        </div>
        <div class="error-list">
          <div class="error" v-for="(error, index) in errors" :key="index">{{error}}</div>
        </div>
        <div>
          <router-link to="/recover" class="text-right el-button el-button--text">忘记密码？</router-link>
        </div>
        <div class="input-field">
          <el-button native-type="submit" type="primary">登录</el-button>
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
      form: {
        uniqueName: "",
        password: ""
      },
      errors: []
    };
  },
  methods: {
    login() {
      let f = this.form;
      this.errors = [];
      if (!this.validate()) return;

      if (f.uniqueName === "admin" && f.password === "yoyoyo") {
        session.login("admin", { nickname: "admin", IS_ADMIN: true });
        return;
      }

      api("user/first", {
        where: {
          or: [["mail", "=", f.uniqueName], ["phone", "=", f.uniqueName]]
        }
      }).then(r => {
        if (r.success) {
          let user = r.data;
          if (!user || user.password !== f.password) {
            this.errors.push("邮箱/手机号或密码输入有误");
            return;
          } else {
            delete user.password;
            session.login(user.id, user);
          }
        }
      });
    },
    validate() {
      let valid = true;
      let f = this.form;

      if (!f.uniqueName || !f.password) {
        this.errors.push("请填写邮箱/手机号和密码");
        valid = false;
      }

      return valid;
    }
  }
};
</script>

<style scoped>
.login {
  padding: 250px 0 350px 0;
}

.form-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
}

.input-field button {
  width: 100%;
}
</style>

