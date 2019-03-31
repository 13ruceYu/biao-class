<template>
  <div class="admin">
    <div class="container">
      <el-row>
        <el-col :span="6">
          <el-menu
            :router="true"
            default-active="/admin/product"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="/admin/product">
              <i class="el-icon-star-on"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/order">
              <i class="el-icon-document"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/user">
              <i class="el-icon-goods"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/brand">
              <i class="el-icon-setting"></i>
              <span slot="title">品牌管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/cat">
              <i class="el-icon-menu"></i>
              <span slot="title">分类管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18" class="admin-view">
          <router-view></router-view>
        </el-col>
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
.admin {
  margin-top: 20px;
  margin-bottom: 50px;
}

.admin-view {
  padding-left: 0.5em;
  padding-right: 0.5em;
}
</style>
