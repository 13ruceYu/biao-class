<template>
  <div>
    <div class="card">
      <h1>用户管理</h1>
      <div class="toolbar">
        <button @click="ui.showForm = !ui.showForm">创建</button>
      </div>

      <form v-if="ui.showForm" @submit.prevent="createOrUpdate">
        <h3>创建/更新用户</h3>
        <div class="input-control">
          <label>
            <div class="title">昵称</div>
            <input type="text" v-model="form.name">
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
            <div class="title">签名</div>
            <input type="text" v-model="form.intro">
          </label>
        </div>
        <div class="input-control">
          <label>
            <div class="title">密码</div>
            <input type="password" v-model="form.password">
          </label>
        </div>
        <div class="input-control">
          <button type="submit">提交</button>
        </div>
      </form>

      <table>
        <thead>
          <th>昵称</th>
          <th>用户名</th>
          <th>签名</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="it in list" :key="it.id">
            <td>{{it.name || '-'}}</td>
            <td>{{it.username || '-'}}</td>
            <td>{{it.intro || '-'}}</td>
            <td>
              <div class="btn-group">
                <button @click="fill(it)">更新</button>
                <button @click="remove(it.id)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from "../../lib/api.js";
export default {
  mounted() {
    this.read();
  },
  data() {
    return {
      form: {},
      ui: {
        showForm: true
      },
      list: []
    };
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
    remove(id) {
      if (!confirm("确定删除?")) return;
      api("user/delete", { id }).then(r => {
        if (r.success) this.read();
      });
    },
    fill(it) {
      this.form = it;
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: left;
}

.card .title {
  padding: 0;
}

form {
  padding: 0;
}
</style>
