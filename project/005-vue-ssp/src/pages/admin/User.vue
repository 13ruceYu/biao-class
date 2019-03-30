<template>
  <div class="admin-user">
    <div class="edit-user">
      <el-button @click="ui.formVisible = true">修改/创建用户</el-button>
      <div class="search f-right">
        <form @submit.prevent="search">
          <el-input placeholder="搜索用户" prefix-icon="el-icon-search" v-model="keyword" clearable></el-input>
          <button type="submit" hidden></button>
        </form>
      </div>
    </div>
    <div class="form-edit" v-if="ui.formVisible">
      <form @submit.prevent="createOrUpdate">
        <div class="input-field">
          <input type="text" placeholder="昵称" v-model="form.nickname">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.nickname" :key="e.id">
              <span v-if="invalid">{{rules.nickname[e].msg}}</span>
            </div>
          </div>
        </div>
        <div class="input-field">
          <input type="text" placeholder="手机号码" v-model="form.phone">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.phone" :key="e.id">
              <span v-if="invalid">{{rules.phone[e].msg}}</span>
            </div>
          </div>
        </div>
        <div class="input-field">
          <input type="text" placeholder="密码" v-model="form.password">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.password" :key="e.id">
              <span v-if="invalid">{{rules.password[e].msg}}</span>
            </div>
          </div>
        </div>
        <div class="cancel">
          <el-button @click="ui.formVisible=false">取消</el-button>
        </div>
        <div class="input-field">
          <button type="submit">提交</button>
        </div>
      </form>
    </div>
    <div class="table-user">
      <el-table :data="list" style="width: 100%" max-height="500">
        <el-table-column fixed prop="nickname" label="昵称" width="120"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="password" label="密码" min-width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination text-center">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="readParam.limit"
          :current-page="readParam.page"
          @current-change="flip"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import admin from "../../mixins/admin";
export default {
  mixins: [admin],
  data() {
    return {
      model: "user",
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
      },
      keyword: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
.admin-user {
  padding-bottom: 30px;
}

.edit-user,
.cancel {
  margin-bottom: 20px;
}

.table-user {
  border: 1px solid #ccc;
  padding: 5px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
}
</style>
