<template>
  <div>
    <div class="nav">
      <div class="row container">
        <div class="col-8">
          <div class="logo">
            <router-link to="/">
              <img :src="logo">
            </router-link>
          </div>
        </div>
        <div class="col-16 text-right">
          <div class="search">
            <input type="search">
          </div>
          <span id="tourist" v-if="!session.loginOrNot('sessionId')">
            <router-link to="/login">登录 / </router-link>
            <router-link to="/signup">注册</router-link>
          </span>
          <span id="loggedIn" v-else>
            <router-link class="nav-item" to="/setting/me">{{session.getUser('user').username}} / </router-link>
            <a href="#" class="nav-item" @click="session.logout">登出</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css/nav.css";
import logo from "../image/logo.png";

import session from "../lib/session";
export default {
  data() {
    return {
      logo,
      session
    };
  }
};
</script>