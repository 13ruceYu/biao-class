<template>
  <div class="global-nav">
    <div class="container">
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <div class="logo">
            <router-link to="/">
              <img src="../img/logo-white.png" alt="logo">
            </router-link>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="reserve"></div>
        </el-col>
        <el-col :span="6">
          <div class="nav-right text-right">
            <a href="#">
              <i class="el-icon-edit"></i>
            </a>
            <a href="#">
              <i class="el-icon-search"></i>
            </a>
            <router-link to="/login">登录</router-link>
            <el-dropdown trigger="click" placement="bottom">
              <span class="el-dropdown-link">
                <i class="el-icon-bell"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="notify">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <router-link to="/my">用户名</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
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
  margin-left: 14px;
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
