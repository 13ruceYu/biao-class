<template>
  <div class="nav">
    <div class="container">
      <el-row>
        <el-col :span="12">
          <router-link class="anchor" to="/">首页</router-link>
          <a href="#" class="anchor">item</a>
        </el-col>
        <el-col :span="12" class="text-right">
          <a href="#" class="anchor">item</a>
          <a href="#" class="anchor">item</a>
          <span v-if="session.loggedIn()">
            <router-link
              class="anchor"
              to="/my/setting"
            >{{session.user('nickname') || session.user('mail') || session.user('phone')}}</router-link>
            <a class="anchor" @click="session.logout()">登出</a>
          </span>
          <span v-else>
            <router-link class="anchor" to="/login">登录</router-link>
            <router-link class="anchor" to="/signup">注册</router-link>
          </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import session from "../lib/session";
export default {
  data() {
    return {
      session
    };
  }
};
</script>

<style scoped>
.nav {
  background: #ddd;
}
</style>
