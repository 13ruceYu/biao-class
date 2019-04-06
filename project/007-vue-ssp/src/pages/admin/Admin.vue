<template>
  <div class="admin">
    <div class="admin-head">
      <div class="admin-container">
        <div class="row">
          <div class="col avatar">
            <img src="../../img/avatar.jpg" alt="avatar">
          </div>
          <div class="col intro">
            <div class="nickname">管理员</div>
            <div class="desc">hello admin</div>
          </div>
          <div class="f-right exist">
            <a href="#" @click="session.logout()">
              <i class="el-icon-circle-close-outline"></i>退出
            </a>
          </div>
        </div>
        <div class="nav-tap">
          <el-menu
            default-active="/admin/user"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            :router="true"
          >
            <el-menu-item index="/admin/user">用户管理</el-menu-item>
            <el-menu-item index="/admin/thread">帖子管理</el-menu-item>
            <el-menu-item index="/admin/cat">分类管理</el-menu-item>
            <el-menu-item index="/admin/theme">主题管理</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="admin-view">
      <div class="admin-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import session from "../../lib/session";
export default {
  data() {
    return {
      session
    };
  },
  methods: {
    handleSelect() {
      // console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.admin-head {
  background: #fff;
  margin-bottom: 30px;
  border-bottom: 1px solid #dbe2e8;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  padding-top: 50px;
}

.admin-container {
  max-width: 760px;
  margin: 0 auto;
}

.avatar {
  margin-right: 20px;
}

.avatar img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}

.intro {
  margin-bottom: 20px;
}

.intro .nickname {
  font-size: 1.5rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

.exist a:hover {
  opacity: 0.8;
}

.exist a i {
  margin: 0 3px;
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
