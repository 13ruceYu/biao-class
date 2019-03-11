<template>
  <div class="panel">
    <h1>用户管理</h1>
    <div class="toolbar">
      <button @click="toggleForm()">
        <span v-if="!ui.showForm">创建</span>
        <span v-else>取消</span>
      </button>
    </div>
    <form @submit.prevent="createOrUpdate()" v-if="ui.showForm">
      <h3>创建/更新</h3>
      <div class="input-control">
        <label>
          <span class="title">用户名</span>
          <input @keydown="debounceValidate('username')" v-model="form.username">
          <span class="error-list">
            <!--{{errors.username}}-->
            <span
              v-if="invalid"
              v-for="(invalid, e) in errors.username"
              :key="e.id"
              class="error"
            >{{rules.username[e].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">密码</span>
          <input @keydown="debounceValidate('password')" v-model="form.password">
          <span class="error-list">
            <span
              v-if="invalid"
              v-for="(invalid, e) in errors.password"
              :key="e.id"
              class="error"
            >{{rules.password[e].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">昵称</span>
          <input @keydown="debounceValidate('name')" v-model="form.name">
          <span class="error-list">
            <!--<span v-if="invalid" v-for="(invalid, e) in errors.name" class="error">{{rules.name[e].msg}}</span>-->
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">签名</span>
          <input @keydown="debounceValidate('intro')" v-model="form.intro">
          <span class="error-list">
            <!--<span v-if="invalid" v-for="(invalid, e) in errors.intro" class="error">{{rules.intro[e].msg}}</span>-->
          </span>
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

    <Pagination :total="total" :limit="readParams.limit" :onChange="flip"/>
  </div>
</template>

<script>
import adminMixin from "../../mixin/admin";

export default {
  mixins: [adminMixin],
  data() {
    return {
      model: "user",
      rules: {
        username: {
          unique: {
            params: ["user", "exists", "username"],
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
        },
        name: {
          // required : {
          //   msg : '此项为必填项',
          // },
        }
      }
    };
  }
};
</script>

<style></style>
