<template>
  <div class="login">
    <div class="form-container">
      <h1>登录</h1>
      <form :model="form">
        <div class="input-field">
          <div class="title">手机号/邮箱</div>
          <el-input v-model="form.uniqueName"></el-input>
        </div>
        <div class="input-field">
          <div class="title">密码</div>
          <el-input v-model="form.password"></el-input>
        </div>
        <div>
          <el-button type="primary">登录</el-button>
          <el-button type="text">
            <router-link to="/">忘记密码</router-link>
          </el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        uniqueName: "",
        password: ""
      }
    };
  }
};
</script>
