<template>
  <div class="container">
    <h1>近期文章</h1>
    <div class="post-list">
      <div class="post" v-for="post in postList" v-bind:key="post.id">
        <router-link :to="'/post/' + post.id">
          <h2>{{post.title}}</h2>
        </router-link>
        <div class="preview">{{post.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
export default {
  data() {
    return {
      postList: []
    };
  },
  mounted() {
    this.readPost();
  },
  methods: {
    readPost() {
      api("post/read").then(r => {
        this.postList = r.data;
      });
    }
  }
};
</script>