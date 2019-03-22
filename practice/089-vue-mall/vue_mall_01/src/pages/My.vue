<template>
  <div class="my">
    <el-row>
      <el-col :span="6">
        <el-menu
          :router="true"
          default-active="/my/cart"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/my/cart">
            <i class="el-icon-goods"></i>
            <span slot="title">购物车</span>
          </el-menu-item>
          <el-menu-item index="order">
            <i class="el-icon-document"></i>
            <span slot="title">订单</span>
          </el-menu-item>
          <el-menu-item index="setting">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18" class="view">
        <router-view></router-view>
      </el-col>
    </el-row>
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
.view {
  padding: 0 .5em;
}
</style>
