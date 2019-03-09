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
          <div class="title">用户名</div>
          <input type="text" v-model="form.username" @keyup="debounceValidate('username')">
          <div class="error-list">
            <div
              class="error"
              v-for="(value, key, index) in errors.username"
              :key="index"
              v-show="value"
            >{{rules.username[key].msg}}</div>
          </div>
        </label>
      </div>
      <div class="input-control">
        <label>
          <div class="title">昵称</div>
          <input type="text" v-model="form.name" @keyup="debounceValidate('name')">
          <div class="error-list">
            <div
              class="error"
              v-for="(value, key, index) in errors.name"
              :key="index"
              v-show="value"
            >{{rules.name[key].msg}}</div>
          </div>
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
          <div class="title">密码</div>
          <input type="text" v-model="form.password" @keyup="debounceValidate('password')">
          <div class="error-list">
            <div
              class="error"
              v-for="(value, key, index) in errors.password"
              :key="index"
              v-show="value"
            >{{rules.password[key].msg}}</div>
          </div>
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
import valee from "../../lib/valee";
export default {
  data() {
    return {
      form: {},
      list: [],
      ui: {
        showForm: true
      },
      rules: {
        username: {
          lengthBetween: {
            params: [4, 12],
            msg: "长度需在4-12位之间"
          },
          regex: {
            params: [/^[a-zA-Z]+[0-9]*$/],
            msg: "用户名格式不合法，需包含字母"
          },
          unique: {
            params: ["user", "exists", "username"],
            msg: "用户名已存在"
          }
        },
        name: {
          lengthBetween: {
            params: [4, 12],
            msg: "长度需在3-12位之间"
          }
        },
        password: {
          lengthBetween: {
            params: [6, 24],
            msg: "密码长度需在6-24位之间"
          },
          regex: {
            params: [/(?=[^0-9]*[0-9]+)(?=[^a-zA-Z]*[a-zA-Z]+)/],
            msg: "密码必须包含字母和数字"
          }
        }
      },
      errors: {},
      timer: {}
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
      let fieldValid = true;

      for (let key in rules) {
        let rule = rules[key];

        let valid = valee[key](this.form[field], ...rule.params);

        if (typeof valid == "boolean") {
          this.afterValidate(field, key, valid);
          if (!valid) fieldValid = false;
        } else {
          valid.then(r => {
            this.afterValidate(field, key, r);
            // if (!valid) fieldValid = false;
          });
        }
      }
      return fieldValid;
    },
    validateForm() {
      let rules = this.rules;

      for (let field in rules) {
        let r = this.validate(field);
        if (!r) return false;
      }

      return true;
    },
    afterValidate(field, key, valid) {
      let fieldObj = this.errors[field];

      if (!fieldObj) fieldObj = this.$set(this.errors, field, {});

      this.$set(fieldObj, key, !valid);
      // fieldObj[key] = !valid;
      // console.log(this.errors);
    },
    createOrUpdate() {
      if (!this.validateForm()) return;
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