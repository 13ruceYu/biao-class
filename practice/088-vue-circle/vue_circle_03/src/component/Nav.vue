<template>
  <div>
    <div class="nav">
      <div class="row container">
        <div class="col-8">
          <div class="logo">
            <img :src="logo">
          </div>
        </div>
        <div class="col-16 text-right">
          <div class="search">
            <input type="search">
          </div>
          <span id="tourist" v-if="!session.loginOrNot('sessionId')">
            <router-link to="/login">登录 /</router-link>
            <router-link to="/signup">注册</router-link>
          </span>
          <span id="loggedIn" v-else>
            <a href="#" class="nav-item">{{session.getUser('user').username}} /</a>
            <a href="#" class="nav-item" @click="session.logout">登出</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../css/nav.css'
import logo from "../image/logo.png";

import session from '../js/session'
export default {
  data() {
    return {
      logo,
      session
    };
  }
};
</script>