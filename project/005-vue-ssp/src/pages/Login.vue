<template>
  <div class="signup">
    <div class="container-form">
      <div class="title text-center">
        <router-link to="/">
          <img src="../img/logo02.png" alt="logo">
        </router-link>
      </div>
      <div class="signup-form">
        <form>
          <div class="input-field">
            <input type="text" placeholder="手机号码 / 邮箱">
          </div>
          <div class="input-field">
            <input type="text" placeholder="密码">
          </div>
          <div class="input-field f-small">
            <input type="checkbox">
            <span>
              记住密码
            </span>
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
export default {};
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
  margin: 50px auto;
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
</style>
