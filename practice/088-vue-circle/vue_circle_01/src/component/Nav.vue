<template>
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
        <span id="loggedIn" v-if="session.loggedIn()">
          <a href="#" class="nav-item">{{session.user().username}}</a>
          <a href="#" @click="session.logout()" class="nav-item">登出</a>
        </span>
        <span id="tourist" v-else>
          <router-link to="/login" class="nav-item">登录</router-link>
          <router-link to="/signup" class="nav-item">注册</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../image/logo.png'
import session from '../lib/session'

export default {
  data() {
    return {
      logo,
      session
    }
  },
};
</script>

<style scoped>
.nav {
  background: #fff;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.5rem;
}

.nav .logo {
  width: 50px;
}

.nav-item {
  padding: 0 .4em;
}
</style>
