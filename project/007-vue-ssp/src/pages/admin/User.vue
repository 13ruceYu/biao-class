<template>
  <div class="admin-user">
    <el-button>添加/更新用户</el-button>
    <div class="form-user">
      <form @submit="createOrUpdate">
        <div class="input-field">
          <div class="title">昵称</div>
          <el-input v-model="form.nickname"></el-input>
          <div class="list-error">
            <div class="error" v-for="(value, key, index) in errors.nickname" :key="index">
              <span v-if="value">{{rules.nickname[key].msg}}</span>
            </div>
          </div>
        </div>
        <div class="input-field">
          <div class="title">手机号</div>
          <el-input v-model="form.phone"></el-input>
        </div>
        <div class="input-field">
          <div class="title">邮箱</div>
          <el-input v-model="form.mail"></el-input>
        </div>
        <div class="input-field">
          <div class="title">密码</div>
          <el-input v-model="form.password"></el-input>
        </div>
        <div class="el-input-field">
          <el-button type="primary" native-type="submit">确定</el-button>
          <el-button>取消</el-button>
        </div>
      </form>
    </div>
    <div class="table-user">
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed prop="nickname" label="昵称" width="150"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="mail" label="邮箱" width="120"></el-table-column>
        <el-table-column prop="password" label="密码" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "../../lib/api";
export default {
  data() {
    return {
      form: {},
      list: [],
      errors: {
        nickname: {unique: false, regex: false}
      },
      rules: {
        nickname: {
          unique: {
            params: ["user", "exists", "nickname"],
            msg: "用户名已存在"
          },
          required: {
            msg: "此项为必填项"
          },
          lengthBetween: {
            params: [2, 12],
            msg: "最小长度需在2至12位之间"
          },
          regex: {
            params: [/^[a-zA-Z0-9\u4e00-\u9fa5]{2,10}$/],
            msg: "用户名格式不和法，需包含字母"
          }
        }
      }
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    read() {
      api("user/read").then(r => {
        if (r.success) {
          this.list = r.data;
        }
      });
    },
    createOrUpdate() {
      let f = this.form;
      let action;

      if (!this.validateForm()) {
        return;
      }

      if (f.id) {
        action = "update";
      } else {
        action = "create";
      }

      api(`user/${action}`, f).then(r => {
        if(r.success) {
          this.read();
        }
      })
    },
    validateForm() {

    },
    handleEdit() {},
    handleDelete() {}
  }
};
</script>

<style scoped>
.form-user {
  max-width: 500px;
}

.el-input-field {
  margin: 15px 0;
}

.table-user {
  border: 1px solid #ccc;
  padding: 5px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
}
</style>
