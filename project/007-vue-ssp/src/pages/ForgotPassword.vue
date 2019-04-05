<template>
  <div class="signup">
    <div class="container-form">
      <div class="form-signup">
        <div class="title text-center">
          <router-link to="/">
            <img src="../img/logo-black.png" alt="logo">
          </router-link>
        </div>
        <h3>找回密码</h3>
        <form @submit.prevent="signup">
          <div class="input-field">
            <input type="text" placeholder="手机号码" v-model="form.phone">
          </div>
          <div class="input-field code-input">
            <input type="text" placeholder="输入验证码" v-model="form.code">
            <div class="send-code" @click="sendCode" :disabled="sendCodeCountDown">
              <span v-if="sendCodeCountDown">{{sendCodeCountDown}} s</span>
              <span v-else>发送验证码</span>
            </div>
          </div>
          <div class="input-field">
            <input type="text" placeholder="密码（不少于6位）" v-model="form.password">
          </div>
          <div class="input-field">
            <input type="text" placeholder="再次输入密码" v-model="form.passwordConfirm">
          </div>
          <div class="list-error">
            <div class="error" v-for="(e, index) in listError" :key="index">{{e}}</div>
          </div>
          <div class="input-field">
            <router-link to="/login">又记起密码了？</router-link>
          </div>
          <div class="input-field">
            <button type="submit">确认</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      listError: [],
      sendCodeCountDown: null,
    };
  },
  methods: {
    sendCode() {}
  },
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
  padding: 10px 10px 0 10px;
}

.form-signup {
  padding: 30px 20px;
  border: 1px solid #dbe2e8;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
  box-sizing: border-box;
  background-color: #fff;
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

.input-field a {
  color: #4a90e2;
}
</style>
