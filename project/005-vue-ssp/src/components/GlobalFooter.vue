<template>
  <div class="footer">
    <div class="share">
      <a href="#" class="mail"><font-awesome-icon :icon="['fas','envelope']"/></a>
      <a href="#" class="weibo"><font-awesome-icon :icon="['fab','weibo']"/></a>
      <a href="#" class="weixin"><font-awesome-icon :icon="['fab','weixin']"/></a>
      <a href="#" class="twitter"><font-awesome-icon :icon="['fab','twitter']"/></a>
    </div>
    <div class="link">
      <a href="#">支持我们</a>
      <a href="#">作者招募</a>
      <a href="#">用户协议</a>
      <a href="#">FAQ</a>
      <a href="#">Contact Us</a>
    </div>
    <div class="copyright">
      © 2013-2019 少数派 | 粤ICP备09128966号-4 | CC BY-NC 4.0
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer {
  padding: 40px 0;
  text-align: center;
  background: #fff;
}

.share a {
  font-size: 25px;
  padding: 0 10px;
}

.share a:hover {
  opacity: .8;
}

.mail {
  color: #1c8ce9;
}

.weibo {
  color: #e25550;
}

.weixin {
  color: #42bd41;
}

.twitter {
  color: #2ba3ef;
}

.link {
  margin: 40px 0;
}

.link a {
  margin: 0 20px;
}

.copyright {
  font-size: 12px;
  color: #666;
}

</style>