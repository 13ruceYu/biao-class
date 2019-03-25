<template>
  <div class="nav">
    <div class="container">
      <el-row>
        <el-col :span="12">
          <router-link class="anchor" to="/">首页</router-link>
          <a href="#" class="anchor">item</a>
        </el-col>
        <el-col :span="12" class="text-right">
          <span @click="ui.showCart=!ui.showCart" class="anchor">购物车<span>({{cartCount}})</span> </span>
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
    <Cart @close="()=>ui.showCart=false" v-show="ui.showCart"></Cart>
  </div>
</template>

<script>
import session from "../lib/session";
import Cart from "./Cart";
import cartService from "../service/cart";
export default {
  components: { Cart },
  data() {
    return {
      session,
      ui: {
        showCart: false
      },
      cartCount:0,
    };
  },
  mounted() {
    cartService.onChange(() => {
      this.cartCount = cartService.productCount();
    })
  },
};
</script>

<style scoped>
.nav {
  background: #ddd;
}
a {
  cursor: pointer;
}
</style>
