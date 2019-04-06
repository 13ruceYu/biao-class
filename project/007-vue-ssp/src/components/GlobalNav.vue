<template>
  <div class="global-nav">
    <div class="container">
      <el-row type="flex" justify="space-between">
        <el-col :span="8">
          <div class="logo">
            <router-link to="/">
              <img src="../img/logo-white.png" alt="logo">
            </router-link>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="reserve"></div>
        </el-col>
        <el-col :span="8">
          <div class="nav-right text-right">
            <a href="#">
              <i class="el-icon-edit"></i>
            </a>
            <a href="#">
              <i class="el-icon-search"></i>
            </a>
            <router-link to="/my/activity" v-if="session.loggedIn() && !session.user('IS_ADMIN')">{{session.user('nickname')}}</router-link>
            <router-link to="/admin/user" v-else-if="session.loggedIn() && session.user('IS_ADMIN')">{{session.user('nickname')}}</router-link>
            <router-link to="/login" v-else>登录</router-link>
          </div>
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
    }
  },
};
</script>

<style scoped>
.global-nav {
  background: #292525;
  height: 60px;
}

.logo a {
  display: inline-block;
}

.logo img {
  width: 108px;
  margin: 11px 0;
}

.nav-right {
  color: #888;
  line-height: 60px;
}

.nav-right > * {
  margin-left: 18px;
}

.nav-right a:hover {
  color: #ccc;
}

.nav-right i {
  font-size: 1.1em;
}

.nav-right .el-icon-bell {
  font-size: 1.2em;
}

.notify {
  margin-top: -10px;
}
</style>
