<template>
  <div class="admin">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-menu
          :router="true"
          default-active="/admin/user"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="order">
            <i class="el-icon-document"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/user">
            <i class="el-icon-goods"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="brand">
            <i class="el-icon-setting"></i>
            <span slot="title">品牌管理</span>
          </el-menu-item>
          <el-menu-item index="cat">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <h1>管理页</h1>
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