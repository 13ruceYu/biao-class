<template>
  <div class="signup">
    <div class="container-form">
      <div class="form-signup">
        <div class="title text-center">
          <router-link to="/">
            <img src="../img/logo-black.png" alt="logo">
          </router-link>
          <div class="slogan">数字生活消费指南</div>
        </div>
        <form @submit.prevent="signup">
          <div class="input-field">
            <input type="text" placeholder="手机号码" v-model="form.phone">
          </div>
          <div class="input-field">
            <input type="text" placeholder="昵称（2-10个字符，只可包含中英文和数字）" v-model="form.nickname">
          </div>
          <div class="input-field">
            <input type="text" placeholder="密码（不少于6位）" v-model="form.password">
          </div>
          <div class="input-field">
            <input type="text" placeholder="再次输入密码" v-model="form.passwordConfirm">
          </div>
          <div class="input-field code-input">
            <input type="text" placeholder="输入验证码" v-model="form.code">
            <div class="send-code" @click="sendCode" :disabled="sendCodeCountDown">
              <span v-if="sendCodeCountDown">{{sendCodeCountDown}} s</span>
              <span v-else>发送验证码</span>
            </div>
          </div>
          <div class="list-error">
            <div class="error" v-for="(e, index) in listError" :key="index">{{e}}</div>
          </div>
          <div class="input-field f-small">
            <label>
              <input type="checkbox">
              <span>我已经阅读并同意《少数派用户协议》</span>
            </label>
          </div>
          <div class="input-field">
            <button type="submit" :disabled="form.code.length!==6">注册</button>
          </div>
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
        nickname: "",
        password: "",
        passwordConfirm: "",
        code: ""
      },
      realCode: {
        code: null,
        phone: ""
      },
      listError: [],
      sendCodeCountDown: null,
      phoneExist: false
    };
  },
  methods: {
    signup() {
      let f = this.form;
      let e = (this.listError = []);
      let r = this.realCode;
      if (f.code !== r.code) {
        e.push("验证码有误");
        return;
      }
      if (f.phone !== r.phone) {
        e.push("如已更改手机号，请重新发送验证码");
        return;
      }

      api("user/create", f).then(r => {
        if (r.success) {
          confirm("注册成功，前去登录");
          this.$router.push("/login");
        }
      });
    },
    sendCode() {
      if (!this.validate()) {
        return;
      }

      api("user/first", { where: { and: { phone: this.form.phone } } }).then(
        r => {
          if (r.data) {
            this.listError.push("手机号码已存在，请直接登录或找回密码");
            this.phoneExist = true;
            return;
          } else {
            if (this.sendCodeCountDown) {
              return;
            }
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
              if (r.success) {
                this.realCode.code = atob(r.data.result);
                this.realCode.phone = this.form.phone;
              }
            });
          }
        }
      );
    },
    validate() {
      let f = this.form;
      let e = (this.listError = []);

      if (!is.phone(f.phone)) {
        e.push("手机号码格式有误");
      }

      if (!is.nickname(f.nickname)) {
        e.push("昵称格式有误");
      }

      if (f.password.length < 6) {
        e.push("密码长度不可小于6位");
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
.title {
  margin-bottom: 40px;
}

.title a {
  display: inline-block;
}

.slogan {
  font-weight: 300;
  margin: 10px 0;
}

.warp {
  padding: 5px;
}

.container-form {
  position: absolute;
  max-width: 480px;
  height: 520px;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 10px;
}

.form-signup {
  padding: 30px 20px;
  border: 1px solid #dbe2e8;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 10px;
}

.input-field.f-small label > * {
  display: inline-block;
  vertical-align: middle;
}

.info {
  margin-top: 20px;
}

.f-small {
  font-size: 0.875em;
  line-height: 1.4;
  color: #666;
}

.code-input {
  position: relative;
}

.send-code {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 8px;
  cursor: pointer;
  color: #1c8ce9;
}
</style>
