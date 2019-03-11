<template>
  <div class="panel">
    <h1>分类管理</h1>
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
          <span class="title">标题</span>
          <input @keydown="debounceValidate('title')" v-model="form.title">
          <span class="error-list">
            <span
              v-if="invalid"
              v-for="(invalid, e) in errors.title"
              class="error"
            >{{rules.title[e].msg}}</span>
          </span>
        </label>
      </div>

      <div class="input-control">
        <label>
          <span class="cat_id">分类ID</span>
          <Dropdown :list="userList" searchBy="username" displayBy="name" :onSelect="onSelect"/>
          <span class="error-list">
            <span
              v-if="invalid"
              v-for="(invalid, e) in errors.cat_id"
              class="error"
            >{{rules.cat_id[e].msg}}</span>
          </span>
        </label>
      </div>

      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>

    <table>
      <thead>
        <th>名称</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list" :key="it.id">
          <td>{{it.title || '-'}}</td>
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
import Dropdown from "../../component/Dropdown";

export default {
  components:{Dropdown},
  mixins: [adminMixin],
  mounted() {
    this.yo();
  },
  data() {
    return {
      model: "cat",
      userList:{},
      rules: {
        title: {
          required: {
            msg: "此项为必填项"
          },
          lengthBetween: {
            params: [1, 12],
            msg: "最小长度需在1至64位之间"
          }
        }
      }
    };
  },
  methods: {
    yo() {
      console.log("yo");
    },
    onSelect() {},
  }
};
</script>

<style></style>
