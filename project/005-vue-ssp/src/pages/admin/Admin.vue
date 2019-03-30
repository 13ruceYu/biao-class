<template>
  <div>
    <div class="my-head">
      <div class="container row">
        <div class="col col-3 holder"></div>
        <div class="col col-18">
          <div class="user-intro row">
            <div class="avatar col">
              <a href="#">
                <img src="../../img/avatar.png">
              </a>
            </div>
            <div class="right-part col">
              <div class="nickname">你好，管理员</div>
              <div class="brief">hello, admin</div>
            </div>
          </div>
          <div class="nav-tap">
            <el-menu
              default-active="/my/user"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              :router="true"
            >
              <el-menu-item index="/admin/user">用户管理</el-menu-item>
              <el-menu-item index="/admin/thread">文章管理</el-menu-item>
              <el-menu-item index="/admin/cat">分类管理</el-menu-item>
              <el-menu-item index="/admin/theme">主题管理</el-menu-item>
            </el-menu>
          </div>
        </div>
        <div class="col col-3"></div>
      </div>
    </div>
    <div>
      <div class="row container">
        <div class="col col-3 holder"></div>
        <div class="col col-18">
          <router-view></router-view>
        </div>
        <div class="col col-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleSelect() {
      // console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.my-head {
  background-color: #fff;
  margin-bottom: 30px;
  border-bottom: 1px solid #dbe2e8;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  padding-top: 50px;
}

.avatar {
  margin-right: 20px;
}

.avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.nickname {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 10px;
}

.brief {
  margin-bottom: 20px;
}

.statistic {
  margin: 30px 0;
}

.statistic a {
  margin-right: 24px;
  color: #888;
  font-size: 14px;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
  border-top: 1px solid #ddd;
}

.el-menu-item {
  line-height: 50px;
  height: 50px;
  padding: 0 10px;
}

.el-menu-item.is-active {
  border-bottom-color: #333;
  border-width: 3px;
}
</style>
