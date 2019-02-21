<template>
  <div class="container">
    <h2>添加/更新文章</h2>
    <form @submit.prevent="onSubmit">
      <div class="input-control">
        <label>标题</label>
        <input type="text" v-model="current.title">
      </div>
      <div class="input-control">
        <label>内容</label>
        <textarea v-model="current.content"></textarea>
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>

    <table>
      <thead>
        <th>标题</th>
        <th>内容</th>
        <th>id</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list" :key="it.id">
          <td>{{it.title}}</td>
          <td>{{it.content}}</td>
          <td>{{it.id}}</td>
          <td>
            <button>删除</button>
            <button>更新</button>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import api from '../lib/api'

export default {
  data() {
    return {
      current:{},
      list: [],
    }
  },
  mounted() {
    this.read();
  },
  methods: {
    onSubmit() {
      this.createOrUpdate();
      this.resetCurrent();
    },

    createOrUpdate() {
      let action = this.current.id ? 'update' : 'create';
      api(`post/${action}`, this.current)
      .then(r => {
        this.read();
      })
    },

    remove() {
      api('post/delete', )
    },

    read() {
      api('post/read')
      .then(r => {
        this.list = r.data
      })
    },

    resetCurrent() {
      this.current = {};
    }
  },
};
</script>

<style scoped>
form input,
form textarea,
form button {
  width: 100%;
}

table {
  width: 100%;
}

th {
  text-align: left;
}

td:last-of-type,
th:last-of-type {
  text-align: right;
}
</style>
