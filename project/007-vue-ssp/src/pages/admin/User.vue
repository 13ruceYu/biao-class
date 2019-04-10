<template>
  <div class="admin-user">
    <el-button @click="ui.formVisible=!ui.formVisible">添加/更新用户</el-button>
    <div class="form-user" v-show="ui.formVisible">
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
          <div class="list-error">
            <div class="error" v-for="(value, key, index) in errors.phone" :key="index">
              <span v-if="value">{{rules.phone[key].msg}}</span>
            </div>
          </div>
        </div>
        <div class="input-field">
          <div class="title">邮箱</div>
          <el-input v-model="form.mail"></el-input>
          <div class="list-error">
            <div class="error" v-for="(value, key, index) in errors.mail" :key="index">
              <span v-if="value">{{rules.mail[key].msg}}</span>
            </div>
          </div>
        </div>
        <div class="input-field">
          <div class="title">密码</div>
          <el-input v-model="form.password"></el-input>
          <div class="list-error">
            <div class="error" v-for="(value, key, index) in errors.password" :key="index">
              <span v-if="value">{{rules.password[key].msg}}</span>
            </div>
          </div>
        </div>
        <div class="el-input-field">
          <el-button type="primary" native-type="submit">确定</el-button>
          <el-button @click="ui.formVisible=false">取消</el-button>
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
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination text-center">
        <el-pagination
          @current-change="flip"
          :page-size="readParam.limit"
          :pager-count="11"
          layout="prev, pager, next"
          :total="total"
          :current-page="readParam.page"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../lib/api";
import { call as valee } from "../../lib/valee";
export default {
  data() {
    return {
      ui: {
        formVisible: false
      },
      form: {},
      formOriginal: {},
      total: 0,
      readParam: {
        limit: 4,
        page: 1,
      },
      list: [],
      errors: {
        // nickname: {unique: false, regex: false}
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
        },
        phone: {
          unique: {
            params: ["user", "exists", "phone"],
            msg: "手机号已存在"
          },
          required: {
            params: "此项为必填项"
          },
          phone: {
            msg: "手机号格式有误"
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
      }
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    flip(page) {
      this.readParam.page = page;
      this.read();
    },
    read() {
      api("user/read", this.readParam).then(r => {
        if (r.success) {
          this.list = r.data;
          this.total = r.total;
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
        if (r.success) {
          this.read();
          this.form = {};
        }
      });
    },
    validateForm() {
      let rules = this.rules;
      let f = this.form;
      let isUpdate = !!f.id;

      let valid = true;

      for (let field in rules) {
        // 判断是否是更新
        if (isUpdate && f[field] === this.formOriginal[field]) {
          continue;
        }

        if (!this.validateField(field)) {
          valid = false;
        }
      }

      return valid;
    },
    validateField(field) {
      let value = this.form[field];
      let fieldValid = true;

      let rules = this.rules[field];

      for (let key in rules) {
        let rule = rules[key];
        let params = rule.params || [];

        let valid = valee(key, value, ...params);
        if (typeof valid == "boolean") {
          this.afterValidate(field, key, valid);
          if (!valid) {
            fieldValid = false;
          }
        } else {
          valid.then(r => {
            this.afterValidate(field, key, r);
            if (!r) fieldValid = false;
          });
        }
      }
      return fieldValid;
    },
    afterValidate(field, rule, valid) {
      let fieldObj = this.errors[field];

      if (!fieldObj) {
        fieldObj = this.$set(this.errors, field, {});
      }

      this.$set(fieldObj, rule, !valid);
    },
    handleEdit(index, row) {
      this.form = { ...row };
      this.formOriginal = row;
    },
    handleDelete(index) {
      if (!confirm("确认删除？")) {
        return;
      }
      api("user/delete", { id: index }).then(r => {
        if (r.success) {
          this.read();
        }
      });
    }
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
  margin: 10px 0;
}
</style>
