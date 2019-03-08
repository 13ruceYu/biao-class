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
          <input @keyup="validate('username')" v-model="form.username">
          <span class="error-list">
            <div
              v-for="(value,key,index) in errors.username"
              :key="index"
              class="error"
              v-show="value"
            >{{rules.username[key].msg}}</div>
          </span>
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
import valee from "../../lib/valee";
import api from "../../lib/api";

export default {
  data() {
    return {
      ui: {
        showForm: true
      },
      form: {},
      list: [],
      // 定义主表单中所有验证规则
      // {
      //   属性名: {
      //     规则1: {
      //       params: [...], 给验证器函数的传参
      //       msg: '...' 错误信息
      //     },
      //     规则2: ...
      //   }
      // }
      rules: {
        username: {
          // unique  : {
          //   params : [ 'user/exists' ],
          //   msg    : '用户名已存在',
          // },
          lengthBetween: {
            params: [4, 12],
            msg: "最小长度需在4至12位之间"
          },
          regex: {
            params: [/^[a-zA-Z]+[0-9]*$/],
            msg: "用户名格式不和法，需包含字母"
          }
        },
        name: {
          required: {
            msg: "此项为必填项"
          }
        }
      },

      // formStatus : {
      //   username : 'pending',
      // },

      // 记录所有的主表单错误
      // {
      //   属性名: {
      //     规则1: true, 不合法
      //     规则2: false, 合法
      //   }
      // }
      errors: {
      }
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    /**
     * 验证一个属性（如username）
     * @param {string} field e.g. 'username'
     */
    validate(field) {
      // 先拿到所有的规则 rules
      // {
      //   lengthBetween : {
      //     params : [ 4, 12 ],
      //       msg    : '最小长度需在4至12位之间',
      //   }
      //   required : {
      //       msg    : '此项为必填项',
      //   }
      // }
      let rules = this.rules[field];

      // 检查每一条规则是否合法
      for (let key in rules) {
        // 比如说是lengthBetween
        // {
        //   params : [ 4, 12 ],
        //     msg    : '最小长度需在4至12位之间',
        // }
        let rule = rules[key];

        // 调用biao valee对应的验证函数
        // 比如说valee.lengthBetween('whh', 4, 12)
        let valid = valee[key](this.form[field], ...rule.params);

        // 拿到对应的错误对象
        let fieldObj = this.errors[field];

        // 如果不存在，就初始化一个空对象
        // errors: {
        //  username: {},
        // }
        if (!fieldObj) fieldObj = this.$set(this.errors, field, {});

        // 将对象中对应的验证规则设为valee返回的结果
        // 如：fieldObj['lengthBetween'] = true;
        fieldObj[key] = !valid;
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
  },
  // computed: {
  //   usernameErrors() {
  //     let obj = {};
  //     let uErrs = {};
  //     uErrs = this.errors.username;
  //     for(let key in uErrs) {
  //       if (uErrs[key]){
  //         obj[key] = uErrs[key];
  //       }
  //     }
  //     console.log(obj);
  //     return obj;
  // }}
};
</script>

<style></style>
