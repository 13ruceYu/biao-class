<template>
  <div class="panel">
    <h1>用户管理</h1>
    <div class="toolbar">
      <button @click="ui.showForm = !ui.showForm">创建</button>
    </div>
    <form @submit.prevent="createOrUpdate()" v-if="ui.showForm">
      <h3>创建/更新</h3>
      <div class="input-control">
        <label>
          <span class="title">昵称</span>
          <input v-model="form.name">
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">用户名</span>
          <input v-model="form.username" @keyup="validate('username')">
          <div class="error-list">
            <div v-for="(value,key,index) in errors.username" :key="index" class="error">
              <span v-if="value">{{rules.username[key].msg}}</span>
            </div>
          </div>
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">密码</span>
          <input type="password" v-model="form.password">
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">签名</span>
          <input v-model="form.intro">
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
</template>

<script>
import { call as valee } from "../../lib/valee";
import api from "../../lib/api";

export default {
  data() {
    return {
      ui: {
        showForm: true
      },
      form: {},
      list: [],
      rules: {
        username: {
          lengthBetween: {
            params: [4, 12],
            msg: "最小长度需在4至12位之间"
          },
          regex: {
            params: [/^[a-zA-Z]+[0-9]*$/],
            msg: "用户名格式不和法，需包含字母"
          },
          required: {
            msg: "此项为必填项"
          }
        },

        name: {
          required: {
            msg: "此项为必填项"
          }
        }
      },
      errors: {}
    };
  },
  mounted() {
    this.read();
  },
  watch: {},

  methods: {
    validate(field) {
      let rules = this.rules[field];

      for (let key in rules) {
        let rule = rules[key];

        let valid = valee(key,...this.form[field], ...rule.params);

        let fieldObj = this.errors[field]; // 初始化错误

        if (!fieldObj) fieldObj = this.$set(this.errors, field, {});

        this.$set(fieldObj, key, !valid);
      }
    },
    createOrUpdate() {
      let action = "create";
      let isUpdate = this.form.id;

      if (isUpdate) action = "update";

      api(`user/${action}`, this.form).then(r => {
        if (r.success) {
          this.read();
          this.resetForm();
          this.hideForm();
        }
      });
    },
    hideForm() {
      this.ui.showForm = false;
    },
    showForm() {
      this.ui.showForm = true;
    },
    resetForm() {
      this.form = {};
    },
    read() {
      api("user/read").then(r => {
        if (r.success) this.list = r.data;
      });
    },
    remove(id) {
      if (!confirm("确定删除？")) return;

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

<style></style>
