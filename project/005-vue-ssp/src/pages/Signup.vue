<template>
  <div class="signup">
    <div class="container-form">
      <div class="title text-center">
        <router-link to="/">
          <img src="../img/logo02.png" alt="logo">
        </router-link>
        <div class="slogan">数字生活消费指南</div>
      </div>
      <div class="signup-form">
        <form @submit.prevent="signup">
          <div class="input-field">
            <input type="text" placeholder="手机号码" v-model="form.phone">
          </div>
          <div class="input-field">
            <input type="text" placeholder="昵称（2-10个字符，中文，英文，数字）" v-model="form.nickname">
          </div>
          <div class="input-field">
            <input type="text" placeholder="密码（不少于6位）" v-model="form.password">
          </div>
          <div class="input-field">
            <input type="text" placeholder="再次输入密码" v-model="form.passwordConfirm">
          </div>
          <div class="input-field verify">
            <input type="text" placeholder="验证码" v-model="form.code">
            <div class="send-code" @click="sendCode" :disabled="sendCodeCountDown">
              <span v-if="sendCodeCountDown">{{sendCodeCountDown}} s</span>
              <span v-else>发送验证码</span>
            </div>
          </div>
          <div class="list-error">
            <div class="error" v-for="(e, index) in listError" :key="index">{{e}}</div>
          </div>
          <div class="input-field f-small">
            <input type="checkbox">
            <span>
              我已阅读并同意《
              <a href="#">少数派用户协议</a>》
            </span>
          </div>
          <div class="input-field">
            <button type="submit">注册</button>
          </div>
          <div
            class="info f-small"
          >注意：同一个手机号一小时内只能获取 5 条验证码，如果连续尝试数次都收不到验证码，请联系 feedback@sspai.com 处理。</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { is } from "../lib/valee";
import api from "../lib/api";
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
        nickname: "",
        passwordConfirm: "",
        code: ""
      },
      listError: [],
      sendCodeCountDown: 0,
      realCode: null
    };
  },
  methods: {
    signup() {
      if (!this.validate()) return;

      if (this.form.code !== this.realCode) {
        this.listError.push('验证码有误')
        return;
      }

      api("user/create", this.form).then(r => {
        if (r.success) {
          this.$router.push("/login");
        }
      });
    },
    sendCode() {
      if (!this.validate()) return;

      if (this.sendCodeCountDown) return;
      this.sendCodeCountDown = 60;

      let timer = setInterval(() => {
        this.sendCodeCountDown--;
        if (this.sendCodeCountDown < 0) {
          this.sendCodeCountDown = 0;
          clearInterval(timer);
          return;
        }
      }, 1000);

      api("captcha/sms", { phone: this.form.phone }).then(r => {
        this.realCode = atob(r.data.result);
      });
    },
    validate() {
      let f = this.form;
      let e = (this.listError = []);

      if (!is.phone(f.phone)) {
        e.push("手机号格式有误");
      }

      if (!is.nickname(f.nickname)) {
        e.push("用户名格式有误");
      }

      if (f.password.length < 6) {
        e.push("密码长度不能小于6位");
      }

      if (f.password !== f.passwordConfirm) {
        e.push("两次密码输入不一致");
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
.signup {
  background: #fafbfc;
}

.container-form {
  padding-top: 100px;
  padding-bottom: 100px;
}

.title img {
  display: block;
  text-align: center;
  /* max-width: 150px; */
  margin: 20px auto;
}

.title .slogan {
  font-weight: thin;
  color: #aaa;
  margin-bottom: 50px;
}

.signup-form {
  padding: 50px 35px;
  border: 1px solid #dbe2e8;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
  box-sizing: border-box;
  background-color: #fff;
}

.input-field.f-small > * {
  display: inline-block;
  vertical-align: middle;
}

.verify {
  position: relative;
}

.verify .send-code {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 8px;
  cursor: pointer;
  color: #1c8ce9;
}

.verify .send-code:hover {
  color: #0b9ac5;
}

</style>
