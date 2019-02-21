<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <h2>添加/更新文章</h2>
      <div class="input-control">
        <label>标题:</label>
        <input type="text" v-model="current.title">
      </div>
      <div class="input-control">
        <label>内容:</label>
        <textarea rows="6" v-model="current.content"></textarea>
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
        <tr v-for="it in list" v-bind:key="it.id">
          <td>{{it.title}}</td>
          <td :title="it.content">{{it.content | cut}}</td>
          <td>{{it.id}}</td>
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
      list: []
    };
  },

  filters: {
    cut(val) {
      return val.length < 12 ? val : val.substring(0, 12) + "...";
    }
  },

  mounted() {
    this.read();
  },

  methods: {
    onSubmit() {
      this.createOrUpdate();
    },

    createOrUpdate() {
      let action = this.current.id ? "update" : "create";

      api(`post/${action}`, this.current).then(r => {
        if (r.success) {
          this.read();
          this.resetCurrent();
        }
      });
    },

    remove(id) {
      if (!confirm("Sure?")) return;
      api("post/delete", { id }).then(this.read());
    },

    read() {
      api("post/read").then(r => {
        this.list = r.data;
      });
    },

    resetCurrent() {
      this.current = {};
    }
  }
};
</script>
