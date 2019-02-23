<template>
  <div class="container">
    <h1>添加/更新文章</h1>
    <div>
      <form @submit.prevent="createOrUpdatePost">
        <div class="title">
          <label>标题</label>
          <input type="text" v-model="post.title">
        </div>
        <div class="content">
          <label>内容</label>
          <textarea rows="5" v-model="post.content"></textarea>
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
    <div>
      <table>
        <thead>
          <th>标题</th>
          <th>内容</th>
          <th>id</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="it in postList" :key="it.id">
            <td>{{it.title}}</td>
            <td :title="it.content">{{it.content | cut}}</td>
            <td>{{it.id}}</td>
            <td>
              <button @click="post=it">更新</button>
              <button @click="removePost(it.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '../lib/api'

export default {
  data() {
    return {
      post:{},
      postList: []
    }
  },
  mounted() {
    this.readPost();
  },
  filters: {
    cut(val) {
      return val.length < 12 ? val : val.substring(0, 12) + '...';
    }
  },
  methods: {
    readPost(){
      api('post/read')
      .then(r => {
        this.postList = r.data;
      })
    },
    createOrUpdatePost() {
      let action = this.post.id ? 'update' : 'create';
      api(`post/${action}`, this.post)
      .then(r => {
        if (r.success){
          this.readPost();
          this.resetPostForm();
        }
      })
    },
    resetPostForm() {
      this.post = {};
    },
    removePost(id) {
      api('post/delete', {id})
      .then(r => {
        if (r.success)
        this.readPost();
      })
    }
  },
}
</script>

<style scoped>

form button {
  width: 100%;
  padding: .4em;
}

table {
  width: 100%;
  text-align: left;
  margin-top: .5em;
}

th:last-of-type,
td:last-of-type {
  text-align: right;
}
</style>
