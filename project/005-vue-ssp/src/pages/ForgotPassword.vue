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
        <form>
          <div class="input-field">
            <input type="text" placeholder="手机号码 / 邮箱">
          </div>
          <div class="input-field verify">
            <input type="text" placeholder="验证码">
            <span class="send-code">发送验证码</span>
          </div>
          <div class="input-field">
            <input type="text" placeholder="新密码（不少于6位）">
          </div>
          <div class="input-field">
            <input type="text" placeholder="再次输入密码">
          </div>
          <div class="input-field">
            <button type="submit">找回密码</button>
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
  padding: 12px 8px;
  cursor: pointer;
  color: #1c8ce9;
}

.verify .send-code:hover {
  color: #00c3ff;
}
</style>
