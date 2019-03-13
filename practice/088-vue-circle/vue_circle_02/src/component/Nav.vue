<template>
  <div class="nav">
    <div class="row container">
      <div class="col-8">
        <div class="logo">
          <router-link to="/">
            <img :src="logo" alt>
          </router-link>
        </div>
      </div>
      <div class="col-16 text-right">
        <div class="search">
          <input type="search" placeholder="此功能尚未实现">
        </div>
        <span id="tourist" v-if="!session.loggedIn()">
          <router-link to="/login">登录 / </router-link>
          <router-link to="/signup">注册</router-link>
        </span>
        <span id="loggedIn" v-else>
          <router-link to="/setting/me">{{session.user().username}} / </router-link>
          <a href="#" class="nav-item" @click="session.logout()">登出</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import session from "../lib/session.js";
import "../css/nav.css";
import logo from "../image/logo.png";
export default {
  data() {
    return {
      logo,
      session
    };
  }
};
</script>