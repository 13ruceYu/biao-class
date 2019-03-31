<template>
  <div class="signup">
    <div class="form-container">
      <h1>注册</h1>
      <form @submit.prevent="signup">
        <el-tabs v-model="signupBy">
          <el-tab-pane label="手机注册" name="phone">
            <div class="input-field">
              <div class="title">手机号</div>
              <el-input @blur="uniqueExist" v-model="form.phone" placeholder="请输入手机号"></el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="邮箱注册" name="mail">
            <div class="input-field">
              <div class="title">邮箱</div>
              <el-input @blur="uniqueExist" v-model="form.mail" placeholder="请输入邮箱"></el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="input-field">
          <div class="title">验证码</div>
          <fieldset :disabled="!unique">
            <el-input v-model="form.code" placeholder="请输入验证码" :disabled="!unique">
              <el-button slot="append" @click="sendCode" :disabled="!!sendCodeCountDown">
                <span v-if="sendCodeCountDown">{{sendCodeCountDown}}s</span>
                <span v-else>发送验证码</span>
              </el-button>
            </el-input>
          </fieldset>
        </div>
        <div class="input-field">
          <div class="title">密码</div>
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </div>
        <div class="error-list">
          <div class="error" v-for="(e, index) in errors" :key="index">{{e}}</div>
        </div>
        <div class="go-login">
          <router-link to="/login" class="el-button el-button--text">已有账号？登录</router-link>
        </div>
        <div class="input-field">
          <el-button native-type="submit" type="primary">立即注册</el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
import { is } from "../lib/valee";

export default {
  data() {
    return {
      signupBy: "phone",
      form: {
        phone: "",
        mail: "",
        password: "",
        code: ""
      },
      sendCodeCountDown: 0,
      errors: [],
      code: null,
      unique: false
    };
  },
  methods: {
    validate() {
      let f = this.form;
      let e = (this.errors = []);
      let signupBy = this.signupBy;

      if (signupBy == "phone" && !is.phone(f.phone)) {
        e.push("手机格式有误");
      }

      if (signupBy == "mail" && !is.mail(f.mail)) {
        e.push("邮箱格式有误");
      }

      if (f.password.length < 6) {
        e.push("密码长度不可小于6位");
      }

      if (f.code != this.code) {
        e.push("验证码有误");
      }

      if (e.length) {
        return false;
      }

      return true;
    },
    uniqueExist() {
      let f = this.form;
      let key = this.signupBy;
      let value = this.form[this.signupBy];
      let e = (this.errors = []);

      if (!value) return;
      if (key == "phone" && !is.phone(f.phone)) {
        e.push("手机格式有误");
        return;
      }

      if (key == "mail" && !is.mail(f.mail)) {
        e.push("邮箱格式有误");
        return;
      }
      api("user/first", {
        where: {
          and: {
            [key]: value
          }
        }
      }).then(r => {
        if (r.data) {
          this.errors.push("账号已存在");
          this.unique = false;
          return;
        }
        this.unique = true;
      });
    },
    signup() {
      let f = this.form;
      if (!this.validate()) return;

      api("user/create", f).then(r => {
        if (r.success) {
          this.$router.push("/login");
        }
      });
    },
    sendCode() {
      if (this.sendCodeCountDown) return;
      this.sendCodeCountDown = 60;

      let timer = setInterval(() => {
        this.sendCodeCountDown--;
        if (this.sendCodeCountDown < 0) {
          return (this.sendCodeCountDown = 0 && clearInterval(timer));
        }
      }, 1000);

      let action;

      if (this.signupBy == "phone") {
        action = "sms";
      } else {
        action = "mail";
      }

      api(`captcha/${action}`, {
        mail: this.form.mail,
        phone: this.form.phone
      }).then(r => {
        if (r.success) this.code = atob(r.data.result);
      });
    }
  }
};
</script>

<style scoped>
fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.signup {
  padding: 150px 15px 350px 15px;
}

.form-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
}

.input-field button {
  width: 100%;
}

.go-login {
  margin-bottom: 5px;
}
</style>

