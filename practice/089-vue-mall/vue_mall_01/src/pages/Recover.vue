<template>
  <div class="recover">
    <div class="form-container">
      <h1>账号找回</h1>

      <form>
        <div v-if="step==1">
          <el-tabs v-model="recoverBy">
            <el-tab-pane label="手机找回" name="phone">
              <div class="input-field">
                <div class="title">通过手机号找回</div>
                <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane label="邮箱找回" name="mail">
              <div class="input-field">
                <div class="title">通过邮箱找回</div>
                <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-if="step==2">
          <div class="input-field">
            <div class="title">验证码</div>
            <el-input v-model="form.code" placeholder="请输入验证码">
              <el-button slot="append" @click="sendCode" :disabled="!!sendCodeCountDown">
                <span v-if="sendCodeCountDown">{{sendCodeCountDown}}s</span>
                <span v-else>发送验证码</span>
              </el-button>
            </el-input>
          </div>
        </div>
        <div v-if="step==3">
          <div class="input-field">
            <div class="title">重置密码</div>
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </div>
        </div>
        <div class="error-list">
          <div class="error" v-for="(e, index) in errors" :key="index">{{e}}</div>
        </div>
        <button @click="nextStep" class="el-button--primary">下一步</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
// import { is } from "../lib/valee";

export default {
  data() {
    return {
      recoverBy: "phone",
      form: {
        phone: "",
        mail: "",
        password: "",
        code: ""
      },
      sendCodeCountDown: 0,
      errors: [],
      code: null,
      step: 1,
      user: ""
    };
  },
  methods: {
    nextStep() {
      let f = this.form;
      let by = this.recoverBy;
      this.errors = [];

      switch (this.step) {
        case 1:
          api("user/first", {
            where: {
              and: {
                [by]: f[by]
              }
            }
          }).then(r => {
            if (r.success) {
              let user = r.data;
              if (!user) {
                this.errors.push("账号不存在");
              } else {
                this.user = user;
                this.step++;
              }
            }
          });
          break;
        case 2:
          if (this.code !== f.code) {
            this.errors.push("验证码有误");
          } else {
            this.step++;
          }
          break;
        case 3:
          api("user/update", { id: this.user.id, password: f.password }).then(
            r => {
              if (r.success) {
                this.$router.push("/login");
              }
            }
          );
          break;
      }
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

      if (this.recoverBy == "phone") {
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

