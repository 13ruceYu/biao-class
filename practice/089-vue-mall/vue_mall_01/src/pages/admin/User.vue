<template>
  <div class="admin-user">
    <h1>用户管理</h1>
    <div class="tool-bar">
      <el-button-group>
        <el-button type="primary" @click="ui.formVisible = !ui.formVisible">创建</el-button>
      </el-button-group>
    </div>
    <div class="modify-form">
      <form @submit="createOrUpdate" v-if="ui.formVisible">
        <h2>添加/修改</h2>
        <div class="input-field">
          <div class="title">昵称</div>
          <input type="text" v-model="form.nickname" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.nickname" :key="e.id">
              <span v-if="invalid">{{rules.nickname[e].msg}}</span>
            </div>
          </div>
        </div>
        <div class="input-field">
          <div class="title">电话</div>
          <input type="text" v-model="form.phone" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.phone" :key="e.id">
              <span v-if="invalid">{{rules.phone[e].msg}}</span>
            </div>
          </div>
        </div>
        <div class="input-field">
          <div class="title">邮箱</div>
          <input type="email" v-model="form.mail" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.mail" :key="e.id">
              <span v-if="invalid">{{rules.mail[e].msg}}</span>
            </div>
          </div>
        </div>
        <div class="input-field">
          <div class="title">密码</div>
          <input type="text" v-model="form.password" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.password" :key="e.id">
              <span v-if="invalid">{{rules.password[e].msg}}</span>
            </div>
          </div>
        </div>
        <button type="submit" class="el-button el-button--primary">提交</button>
        <button type="button" class="el-button" v-if="ui.formVisible==true" @click="resetForm">取消</button>
      </form>
      <!-- <el-form>
        <el-input placeholder="请输入内容"></el-input>
      </el-form>-->
    </div>
    <div>
      <h2>列表</h2>
      <p>总用户数：{{total}}</p>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="nickname" label="昵称" width="100"></el-table-column>
        <el-table-column prop="phone" label="手机" width="150"></el-table-column>
        <el-table-column prop="mail" label="邮箱" min-width="200"></el-table-column>
        <el-table-column fixed="right" label="操作" width="110">
          <template slot-scope="scope">
            <el-button @click="fill(scope.row)" type="text" size="small">更新</el-button>
            <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination text-center">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="readParam.limit"
          :current-page="readParam.page"
          @current-change="changePage"
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
            params: [4, 12],
            msg: "最小长度需在4至12位之间"
          },
          regex: {
            params: [/^[a-zA-Z]+[0-9]*$/],
            msg: "用户名格式不和法，需包含字母"
          }
        },
        mail: {
          unique: {
            params: ["user", "exists", "mail"],
            msg: "邮箱已存在"
          },
          mail: {
            msg: "邮箱格式有误"
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
      }
    };
  }
};
</script>

