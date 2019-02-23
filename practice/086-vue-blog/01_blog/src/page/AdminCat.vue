<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <h2>添加/更新分类</h2>
      <div class="input-control">
        <label>名称:</label>
        <input type="text" v-model="current.name">
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
    <table>
      <thead>
        <th>名称</th>
        <th>id</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list" v-bind:key="it.id">
          <td>{{it.name}}</td>
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

      api(`cat/${action}`, this.current).then(r => {
        if (r.success) {
          this.read();
          this.resetCurrent();
        }
      });
    },

    remove(id) {
      if (!confirm("Sure?")) return;
      api("cat/delete", { id }).then(this.read());
    },

    read() {
      api("cat/read").then(r => {
        this.list = r.data;
      });
    },

    resetCurrent() {
      this.current = {};
    }
  }
};
</script>
