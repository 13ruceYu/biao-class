<template>
  <div class="nav">
    <div class="container">
      <el-row>
        <el-col :span="12">
          <a href="#" class="anchor">item</a>
          <a href="#" class="anchor">item</a>
          <a href="#" class="anchor">item</a>
          <a href="#" class="anchor">item</a>
        </el-col>
        <el-col :span="12" class="text-right">
          <a href="#" class="anchor">item</a>
          <a href="#" class="anchor">item</a>
          <router-link class="anchor" to="/login">登录</router-link>
          <router-link class="anchor" to="/signup">注册</router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.nav {
  background: #ddd;
}
</style>
