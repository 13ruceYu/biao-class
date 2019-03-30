<template>
  <div class="global-nav">
    <div class="container">
      <el-row type="flex" justify="space-between">
        <el-col class="nav-left">
          <router-link to="/">
            <img src="../img/logo.png" alt="logo" class="logo">
          </router-link>
        </el-col>
        <el-col class="nav-mid"></el-col>
        <el-col class="text-right nav-right">
          <a href="#">
            <i class="el-icon-edit"></i>
          </a>
          <a href="#">
            <i class="el-icon-search"></i>
          </a>
          <a href="#" v-if="session.user()">
            <div @mouseenter="show" @mouseleave="hide">
              <font-awesome-icon :icon="['fas','user']"/>
              <div class="triangle" v-if="ui.userPop"></div>
              <div class="user-pop" v-if="ui.userPop">
                <router-link to="/my">个人主页</router-link>
                <a href="#">我的私信</a>
                <a href="#">账号设置</a>
                <a href="#">付费栏目</a>
                <a href="#">反馈</a>
                <a href="#" @click="session.logout()">退出登录</a>
              </div>
            </div>
          </a>
          <router-link to="/login" v-else>登录 / 注册</router-link>
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
      session,
      ui: {
        userPop: false
      }
    };
  },
  methods: {
    show() {
      this.ui.userPop = true;
    },
    hide() {
      this.ui.userPop = false;
    }
  }
};
</script>

<style scoped>
a {
  display: inline-block;
}

.container {
  padding: 0 5px;
  position: relative;
}

.global-nav {
  background: #292525;
  height: 60px;
}

.logo {
  height: 60px;
  padding: 11px 0;
}

.nav-right > * {
  color: #bbb;
  padding: 21px 15px;
}

.nav-right > *:hover {
  color: #fff;
}

.nav-right > *:last-child {
  padding-right: 0;
}

.user-pop {
  z-index: 100;
  position: absolute;
  right: -42px;
  top: 48px;
  margin-right: 5px;
  background: #fff;
  min-width: 80px;
  box-sizing: border-box;
  border-width: 0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.35), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 0 0 10px 0;
  border-radius: 2px;
}

.user-pop a {
  display: block;
  font-size: 14px;
  color: #888;
  padding: 2px 16px;
  margin: 8px 0;
}

.user-pop a:hover {
  color: #333;
}

.user-pop a:last-of-type {
  border-top: 1px solid #ccc;
  margin-bottom: 0;
  padding-top: 12px;
}

.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 12.5px 20px 12.5px;
  border-color: transparent transparent #ffffff transparent;
  position: absolute;
  right: -5px;
  z-index: 101;
}
</style>
