<template>
  <div class="container">
    <h2>文章列表</h2>
    <div class="post-list" v-for="post in postList" :key="post.id">
      <div class="post">
        <div class="title">
          <a href="#">
            <h3>{{post.title}}</h3>
          </a>
        </div>
        <div class="preview">
          {{post.content}}
        </div>
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
  mounted() {
    this.readPost();
  },
  methods: {
    readPost() {
      api('post/read')
      .then(r => {
        this.postList = r.data;
      })
    }
  },
}
</script>