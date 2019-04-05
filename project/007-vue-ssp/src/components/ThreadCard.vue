<template>
  <div class="thread-card">
    <div class="row head">
      <div class="col avatar">
        <a href="#">
          <img src="../img/avatar.jpg">
        </a>
      </div>
      <div class="col nickname-time">
        <a href="#">少数派编辑部</a>
        <div class="time">22小时前 推荐</div>
      </div>
    </div>
    <div class="cover">
      <a href="#">
        <img src="../img/thread-cover.png">
      </a>
    </div>
    <div class="title-desc">
      <div class="title">
        <a href="#">
          <h3>HomePod 降价 500 元，现在是入手的好时机吗？</h3>
        </a>
      </div>
      <div class="desc">苹果官网 HomePod 降价到 2299 元，还在犹豫要不要买？可以看看我们之前关于 HomePod 的体验文章。</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.thread-card {
  background: #fff;
  border: 1px solid #dbe2e8;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
  padding: 20px;
  margin: 0 0 20px;
}

.head {
  margin-bottom: 20px;
}

.avatar {
  margin-right: 8px;
}

.avatar img {
  width: 40px;
  border-radius: 50%;
}

.nickname-time {
  font-size: 0.75rem;
  padding: 4px 0;
}

.time {
  margin-top: 8px;
  font-size: 0.7rem;
  color: #999;
}

.title h3 {
  font-size: 1.5rem;
  margin: 20px 0 15px 0;
}

.title h3:hover {
  color: #d7191a;
}

.desc {
  color: #4a4a4a;
  line-height: 1.625;
  margin: 0;
}
</style>
