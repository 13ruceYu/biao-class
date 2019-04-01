<template>
  <div class="my">
    <div class="container">
      <el-row>
          <el-menu
            :router="true"
            default-active="/my/setting"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            mode="horizontal"
          >
            <el-menu-item index="order">
              <i class="el-icon-document"></i>
              <span slot="title">我的订单</span>
            </el-menu-item>
            <el-menu-item index="setting">
              <i class="el-icon-setting"></i>
              <span slot="title">账号设置</span>
            </el-menu-item>
          </el-menu>
        <div class="view">
          <router-view></router-view>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  }
};
</script>

<style scoped>
.my {
  margin: 30px 0 60px 0;
}

.container {
  padding-bottom: 60px;
}

.view {
  padding: 0 .5em;
}
</style>
