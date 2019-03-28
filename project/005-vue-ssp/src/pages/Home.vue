<template>
  <div class="home">
    <div class="top-banner">
      <div class="main-banner">
        <a href="#">
          <img src="../img/main-banner.jpg">
        </a>
      </div>
      <div class="sub-banner">
        <div class="row">
          <a href="#">
            <img src="../img/sub-banner01.png">
          </a>
          <a href="#">
            <img src="../img/sub-banner02.png">
          </a>
        </div>
        <div class="row">
          <a href="#">
            <img src="../img/sub-banner03.png">
          </a>
          <a href="#">
            <img src="../img/sub-banner04.png">
          </a>
        </div>
      </div>
    </div>
    <div class="container">
      <el-row :gutter="40">
        <el-col :span="18" class="thread-list">
          <div class="thread-item">
            <div class="row thread-head">
              <div class="col thread-avatar">
                <a href="#">
                  <img src="../img/avatar.png">
                </a>
              </div>
              <div class="col">
                <div class="nickname">
                  <a href="#">bobo</a>
                </div>
                <div class="info">8小时前 推荐</div>
              </div>
              <div class="col more f-right">
                <a href="#">
                  <i class="el-icon-more"></i>
                </a>
              </div>
            </div>
            <div class="row thread-cover">
              <a href="#">
                <img src="../img/thread-cover.png">
              </a>
            </div>
            <div class="row thread-title">
              <h3>
                <a href="#">对我而言，这是五年来最美好的 Apple 发布会</a>
              </h3>
            </div>
            <div class="row thread-desc">站在人文与科技的十字路口，苹果在这场发布会传达了它对自己价值观的坚持。</div>
            <div class="like-comment text-right">
              <span>
                <i class="el-icon-star-off"></i> 97
              </span>
              <span>
                <i class="el-icon-edit-outline"></i> 51
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="side">
          <div class="mall-box">
            <a href="#">
              <img src="../img/mall-box.jpg" alt>
            </a>
          </div>
          <div class="ad-box">
            <div class="ad-item">
              <a href="#">寻求合作 | 支持我们</a>
            </div>
          </div>
          <div class="matrix-box">
            <div class="box-title"><span>Matrix精选</span></div>
            <div class="matrix-box-list">
              <div class="matrix-box-item">
                <div class="item-title">
                  <a href="#">告诉你 AirPods ² 15+个使用技巧</a>
                </div>
                <div class="write">
                  <span class="avatar">
                    <a href="#">
                      <img src="../img/matrix-avatar.jpg" alt>
                    </a>
                  </span>
                  <span class="nickname">
                    <a href="#">马丁的药丸</a>
                  </span>
                </div>
              </div>
              <div class="matrix-box-item">
                <div class="item-title">
                  <a href="#">正经的我，做了个不正经的项目 —— Pornhub 风格 Logo 生成器</a>
                </div>
                <div class="write">
                  <span class="avatar">
                    <a href="#">
                      <img src="../img/matrix-avatar02.jpg" alt>
                    </a>
                  </span>
                  <span class="nickname">
                    <a href="#">Bestony</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="recomd-box"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

.home {
  background: #fafbfc;
}

.top-banner {
  display: flex;
  margin-top: 45px;
  margin-left: 10px;
  margin-right: 10px;
}

.top-banner > * {
  width: 50px;
  flex: 1;
}

.main-banner {
  padding-right: 5px;
}

.main-banner img {
  height: 100%;
  width: 100%;
}

.sub-banner .row {
  display: flex;
}

.sub-banner .row:first-child {
  margin-bottom: 5px;
}

.sub-banner .row a:first-of-type {
  padding-right: 5px;
}

.container {
  margin-top: 20px;
  padding: 0 10px;
}

.thread-item {
  background: #fff;
  border: 1px solid #dbe2e8;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
  padding: 20px;
  margin: 0 0 20px;
}

.thread-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.thread-avatar {
  margin-right: 10px;
}

.thread-head {
  margin-bottom: 20px;
  font-size: 12px;
}

.thread-head .nickname {
  margin: 6px 0;
}

.thread-head .info {
  color: #888;
}

.thread-desc {
  color: #4a4a4a;
  font-size: 0.8em;
  margin-bottom: 15px;
}

.like-comment {
  color: #888;
}

.ad-box a {
  background: #fff;
  display: block;
  border: 1px solid #dbe2e8;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
  margin: 20px 0;
  transition: border 0.3s ease-in-out;
  text-align: center;
  /* vertical-align: middle; */
  line-height: 40px;
  font-size: 0.875rem;
}

.matrix-box-item {
  margin-bottom: 15px;
}

.box-title {
  padding-bottom: 6px;
  border-bottom: 1px solid #e9e9ea;
  margin-bottom: 15px;
}

.box-title span {
  border-bottom: 1px solid #000;
  padding-bottom: 6px;
}

.item-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.write .avatar img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
}

.write > * {
  vertical-align: middle;
  display: inline-block;
}

.write .nickname {
  font-size: 12px;
  color: #666;
}
</style>
