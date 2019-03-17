<template>
  <div class="signup">
    <div class="form-container">
      <h1>注册</h1>

      <form @submit.prevent="signup">
        <el-tabs v-model="signupBy">
          <el-tab-pane label="手机注册" name="phone">
            <div class="input-field">
              <div class="title">手机号</div>
              <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="邮箱注册" name="email">
            <div class="input-field">
              <div class="title">邮箱</div>
              <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="input-field">
          <div class="title">验证码</div>
          <el-input v-model="form.code" placeholder="请输入验证码">
            <el-button slot="append" @click="sendCode" :disabled="!!sendCodeCountDown">
              <span v-if="sendCodeCountDown">{{sendCodeCountDown}}s</span>
              <span v-else>发送验证码</span>
            </el-button>
          </el-input>
        </div>
        <div class="input-field">
          <div class="title">密码</div>
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </div>
        <div class="error-list">
          <div class="error" v-for="(e, index) in errors" :key="index">{{e}}</div>
        </div>
        <div>
          <button type="submit">立即注册</button>
          <el-button type="text">
            <router-link to="/">忘记密码</router-link>
          </el-button>
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
      code: null
    };
  },
  methods: {
    validate() {
      let f = this.form;
      let e = (this.errors = []);
      let signupBy = this.signupBy;

      if(signupBy == 'phone' && !is.phone(f.phone)){
        e.push('手机格式有误')
      }

      if(signupBy == 'mail' && !is.mail(f.mail)){
        e.push('邮箱格式有误')
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
    signup() {
      if(!this.validate())
      return;

      api('user/create', this.form).then(r => {
        if(r.success){
          api('user/create', this.form);
          this.$router.push('/login');
        }
      })
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

</style>

