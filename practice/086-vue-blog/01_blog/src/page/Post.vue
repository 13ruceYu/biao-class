<template>
  <div class="container">
    <h1>{{row.title}}</h1>
    <div class="post-content">{{row.content}}</div>
  </div>
</template>

<script>
import api from '../lib/api'

export default {
  data() {
    return {
      row:[],
    }
  },
  mounted() {
    this.findPost(this.$route.params.id)
  },
  methods: {
    findPost(id) {
      api('post/find', {id})
      .then(r => {
        this.row = r.data;
      })
    }
  },
}
</script>

<style scoped>
.post-content {
  white-space: pre-wrap;
}
</style>
