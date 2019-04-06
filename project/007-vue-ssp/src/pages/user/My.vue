<template>
  <div class="my">
    <div class="my-head">
      <div class="my-container">
        <div class="row">
          <div class="col avatar">
            <img src="../../img/avatar.jpg" alt="avatar">
          </div>
          <div class="col intro">
            <div class="nickname">whh</div>
            <div class="desc">懒</div>
            <div class="statistic">
              <a href="#" class="following">关注 11</a>
              <a href="#" class="followed">被关注 24</a>
              <a href="#" class="liked">获赞数 98</a>
            </div>
          </div>
          <div class="f-right exist">
            <a href="#" @click="session.logout()">
              <i class="el-icon-circle-close-outline"></i>退出
            </a>
          </div>
        </div>
        <div class="nav-tap">
          <el-menu
            default-active="/my/activity"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            :router="true"
          >
            <el-menu-item index="/my/activity">动态</el-menu-item>
            <el-menu-item index="/my/profile">基本信息</el-menu-item>
            <el-menu-item index="/my/account">账号密码</el-menu-item>
            <el-menu-item index="/my/message">私信</el-menu-item>
            <el-menu-item index="/my/auth">实名认证</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="my-view">
      <div class="my-container">
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
.my-head {
  background: #fff;
  margin-bottom: 30px;
  border-bottom: 1px solid #dbe2e8;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  padding-top: 50px;
}

.my-container {
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
