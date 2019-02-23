<template>
  <div class="container">
    <h1>最近更新</h1>
    <div class="post-list">
      <div class="post" v-for="post in postList" :key="post.id">
        <router-link :to="'/post/' + post.id" class="title"><h2>{{post.title}}</h2></router-link>
        <div class="content">{{post.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../lib/api'
export default {
  data() {
    return {
      postList: []
    }
  },
  methods: {
    readPost() {
      api('post/read')
      .then(r => {
        this.postList = r.data;
      })
    }
  },
  mounted() {
    this.readPost();
  },
}
</script>