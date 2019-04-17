<template>
  <div class="thread">
    <div class="container-thread">
      <div class="cover">
        <img :src="thread.cover" alt="">
      </div>
      <div class="title">
        <h1>{{thread.title}}</h1>
      </div>
      <div class="author row">
        <div class="avatar col"><img src="../img/avatar.jpg"></div>
        <div class="nickname col">{{thread.user_id}}</div>
      </div>
      <div class="content">
        <div v-html="thread.content" class="real-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
export default {
  mounted() {
    api('thread/find', {id: `${this.$route.params.id}`}).then(r => {
      if(r.success) {
        this.thread = r.data;
      }
    })
  },
  data() {
    return {
      thread: {},
    }
  },
}
</script>

<style scoped>
.thread {
  margin-top: 25px;
}

.container-thread {
  max-width: 700px;
  margin: 0 auto;
}

.title h1 {
  font-size: 1.8rem;
  line-height: 1.4;
}

.author .nickname {
  line-height: 30px;
  margin-left: 15px;
}

.avatar img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.content {
  color: #4a4a4a;
  line-height: 26px;
}

</style>
