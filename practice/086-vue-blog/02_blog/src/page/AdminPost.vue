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
        <textarea rows="5" v-model="current.content"></textarea>
      </div>
      <div class="input-control">
        <label>分类</label>
        <select v-model="current.cat_id">
          <option v-for="it in catList" :key="it.id" :value="it.id">{{it.name}}</option>
        </select>
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
        <th>分类</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list" :key="it.id">
          <td>{{it.title}}</td>
          <td :title="it.content">{{it.content | cut}}</td>
          <td>{{it.id}}</td>
          <td>{{it.$cat ? it.$cat.name : ''}}</td>
          <td>
            <button @click="remove(it.id)">删除</button>
            <button @click="current = it">更新</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../lib/api";

export default {
  data() {
    return {
      current: {},
      list: [],
      catList: []
    };
  },
  mounted() {
    this.read();
    this.readCat();
  },
  filters: {
    cut(val) {
      return val.length < 12 ? val : val.substring(0, 12) + '...';
    }
  },
  methods: {
    onSubmit() {
      this.createOrUpdate();
      this.resetCurrent();
    },

    createOrUpdate() {
      let action = this.current.id ? "update" : "create";
      api(`post/${action}`, this.current).then(r => {
        if (r.success) {
          this.read();
        }
      });
    },

    remove(id) {
      api('post/delete', {id})
      .then(this.read())
    },

    read() {
      let params = {
        with: [
          {
            model: 'cat',
            relation: 'belongs_to'
          }
        ]
      }
      api('post/read', params)
      .then(r=> {
        this.list = r.data;
      })
    },

    readCat() {
      api('cat/read')
      .then(r=> {
        this.catList = r.data;
      })
    },

    resetCurrent() {
      this.current = {};
    }
  }
};
</script>

<style scoped>

th {
  text-align: left;
}

td:last-of-type,
th:last-of-type {
  text-align: right;
}

td button:last-of-type {
  border-left: none;
}

button[type=submit] {
  margin: .5em 0;
}
</style>
