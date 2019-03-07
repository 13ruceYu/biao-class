<template>
  <div>
    <h1>用户管理</h1>
    <div class="toolbar">
      <button @click="ui.showForm = !ui.showForm">创建</button>
    </div>
    <form v-if="ui.showForm" @submit.prevent="createOrUpdate">
      <h2>创建/更新用户</h2>
      <div class="input-control">
        <label>
          <div class="title">昵称</div>
          <input type="text" v-model="form.name">
        </label>
      </div>
      <div class="input-control">
        <label>
          <div class="title">简介</div>
          <input type="text" v-model="form.intro">
        </label>
      </div>
      <div class="input-control">
        <label>
          <div class="title">用户名</div>
          <input type="text" v-model="form.username">
        </label>
      </div>
      <div class="input-control">
        <label>
          <div class="title">密码</div>
          <input type="text" v-model="form.password">
        </label>
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
    <table>
      <thead>
        <th>昵称</th>
        <th>简介</th>
        <th>用户名</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list" :key="it.id">
          <td>{{it.name || '-'}}</td>
          <td>{{it.intro || '-'}}</td>
          <td>{{it.username}}</td>
          <td>
            <div class="btn-group">
              <button @click="fill(it)">跟新</button>
              <button @click="remove(it.id)">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../../lib/api";
export default {
  data() {
    return {
      form: {},
      ui: {
        showForm: true
      },
      list: []
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    createOrUpdate() {
      let url = "user/create";
      if (this.form.id) url = "user/update";
      api(url, this.form).then(r => {
        if (r.success) {
          this.read();
          this.resetForm();
        }
      });
    },
    read() {
      api("user/read").then(r => {
        if (r.success) {
          this.list = r.data;
        }
      });
    },
    resetForm() {
      this.form = {};
    },
    fill(it) {
      this.form = it;
    },
    remove(id) {
      if (!confirm("确定删除？")) return;
      api("user/delete", { id }).then(r => {
        if (r.success) {
          this.read();
        }
      });
    }
  }
};
</script>

<style scoped>
h1 {
  margin-top: 0;
  text-align: left;
}
</style>
