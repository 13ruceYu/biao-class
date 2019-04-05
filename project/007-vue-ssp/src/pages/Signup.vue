<template>
  <div class="signup">
    <div class="container-form">
      <div class="form-signup">
        <div class="title text-center">
          <router-link to="/">
            <img src="../img/logo-black.png" alt="logo">
          </router-link>
          <div class="slogan">
            数字生活消费指南
          </div>
        </div>
        <form @submit.prevent="signup">
          <div class="input-field">
            <input type="text" placeholder="手机号码" v-model="form.phone">
          </div>
          <div class="input-field">
            <input type="text" placeholder="昵称" v-model="form.nickname">
          </div>
          <div class="input-field">
            <input type="text" placeholder="密码" v-model="form.password">
          </div>
          <div class="input-field">
            <input type="text" placeholder="再次输入密码" v-model="form.passwordConfirm">
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
            <button type="submit">注册</button>
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
      listError: []
    };
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
  padding: 10px 10px 0 10px;
}

.form-signup {
  padding: 30px 20px;
  border: 1px solid #dbe2e8;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
  box-sizing: border-box;
  background-color: #fff;
}

.input-field.f-small label > * {
  display: inline-block;
  vertical-align: middle;
}

.info {
  margin-top: 20px;
}

.f-small {
  font-size: .875em;
  line-height: 1.4;
  color: #666;
}
</style>
