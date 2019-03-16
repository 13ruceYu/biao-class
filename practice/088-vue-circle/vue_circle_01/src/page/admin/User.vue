<template>
  <div class="panel">
    <h1>用户管理</h1>
    <div class="toolbar">
      <button @click="toggleForm()">创建</button>
    </div>
    <form @submit.prevent="createOrUpdate()" v-if="ui.showForm">
      <h3>创建/更新</h3>
      <div class="input-control">
        <label>
          <span class="title">用户名</span>
          <input v-model="form.username" @keyup="debounceValidate('username')">
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
          <input type="password" v-model="form.password" @keyup="validate('password')">
          <div class="error-list">
            <div v-for="(value,key,index) in errors.password" :key="index" class="error">
              <span v-if="value">{{rules.password[key].msg}}</span>
            </div>
          </div>
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">昵称</span>
          <input v-model="form.name" @keyup="validate('name')">
          <div class="error-list">
            <div class="error" v-for="(value,key, index) in errors.name" :key="index">
              <span v-if="value">{{rules.name[key].msg}}</span>
            </div>
          </div>
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

    <Pagination :count="100" :limit="10"/>
  </div>
</template>

<script>
import { call as valee } from "../../lib/valee";
import api from "../../lib/api";
import Pagination from "../../component/Pagination";

export default {
  components:{
    Pagination
  },
  data() {
    return {
      ui: {
        showForm: false
      },
      form: {},
      list: [],
      rules: {
        username: {
          lengthBetween: {
            params: [4, 12],
            msg: "长度需在4至12位之间"
          },
          regex: {
            params: [/^[a-zA-Z]+[0-9]*$/],
            msg: "用户名格式不和法，需包含字母"
          },
          required: {
            msg: "此项为必填项"
          },
          unique: {
            params: ["user", "exists", "username"],
            msg: "用户名已存在"
          }
        },

        password: {
          required: {
            msg: "密码为必填项"
          },
          lengthBetween: {
            params: [6, 24],
            msg: "密码长度需在6位24位之间"
          },
          regex: {
            params: [/(?=[^0-9]*[0-9]+)(?=[^a-zA-Z]*[a-zA-Z]+)/],
            msg: "密码必须包含字母和数字"
          }
        }
      },
      errors: {},
      timer: null
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    debounceValidate(field) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.validate(field);
      }, 500);
    },
    validate(field) {
      let rules = this.rules[field];
      let value = this.form[field];
      let fieldValid = true;

      for (let key in rules) {
        let rule = rules[key];
        let params = rule.params || []; // 拿到验证条件

        let valid = valee(key, value, ...params); // 打散放入

        if (typeof valid == "boolean") {
          this.afterValidate(field, key, valid);
          if (!valid) fieldValid = false;
        } else {
          valid.then(r => {
            this.afterValidate(field, key, r);
          });
        }
      }
      return fieldValid;
    },
    validateForm() {
      let rules = this.rules;

      for (let field in rules) {
        if (!this.validate(field)) return false;
      }
      return true;
    },
    afterValidate(field, key, valid) {
      let fieldObj = this.errors[field]; // 初始化错误

      if (!fieldObj) fieldObj = this.$set(this.errors, field, {});

      this.$set(fieldObj, key, !valid);
    },
    createOrUpdate() {
      if (!this.validateForm()) return;

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
    toggleForm() {
      if (this.ui.showForm) {
        this.hideForm();
      } else {
        this.showForm();
        this.resetForm();
      }
    },
    hideForm() {
      this.ui.showForm = false;
    },
    showForm() {
      this.ui.showForm = true;
    },
    resetForm() {
      this.errors = {};
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
