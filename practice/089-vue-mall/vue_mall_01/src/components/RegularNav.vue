<template>
  <div class="nav">
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="logo">
            <img src="../img/logo.png" alt="logo">
          </div>
        </el-col>
        <el-col :span="12" class="search">
          <form>
            <el-input suffix-icon="el-icon-search"></el-input>
          </form>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.nav {
  margin-top: 1.5em;
  margin-bottom: .5em;
}

.search {
  margin-top: .5em;
}
</style>
