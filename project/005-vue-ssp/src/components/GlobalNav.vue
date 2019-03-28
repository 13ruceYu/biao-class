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
          <router-link to="/login">登录 / 注册</router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  display: inline-block;
}

.container {
  padding: 0 5px;
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
</style>
