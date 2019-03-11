<template>
  <div class="panel">
    <h1>帖子管理</h1>
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
              :key="e.id"
              class="error"
            >{{rules.title[e].msg}}</span>
          </span>
        </label>
      </div>
      <div class="input-control">
        <label>
          <span class="title">内容</span>
          <textarea @keydown="debounceValidate('content')" v-model="form.content"></textarea>
          <span class="error-list">
            <span
              v-if="invalid"
              v-for="(invalid, e) in errors.content"
              :key="e.id"
              class="error"
            >{{rules.content[e].msg}}</span>
          </span>
        </label>
      </div>

      <div class="input-control">
        <label>
          <span class="cat_id">分类ID</span>
          <Dropdown :list="catList" searchBy="name" displayBy="name" :onSelect="onCatSelect"/>
          <span class="error-list">
            <span
              v-if="invalid"
              v-for="(invalid, e) in errors.cat_id"
              :key="e.id"
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
        <th>标题</th>
        <th>内容</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="it in list" :key="it.id">
          <td>{{it.title || '-'}}</td>
          <td>{{it.content || '-'}}</td>
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
import api from "../../lib/api";
import Dropdown from "../../component/Dropdown";


export default {
  mixins: [adminMixin],
  components: {Dropdown},
  data() {
    return {
      model: "thread",
      catList: [],
      rules: {
        title: {
          required: {
            msg: "此项为必填项"
          },
          lengthBetween: {
            params: [1, 64],
            msg: "最小长度需在1至64位之间"
          }
        }
      }
    };
  },
  mounted() {
    this.readCat();
  },
  methods: {
    readCat() {
      api("cat/read").then(r => {
        if (r.success) {
          this.catList = r.data;
        }
      });
    },
    onCatSelect(it) {
      this.form.cat_id = it.id;
      console.log(this.form);
    }
  }
};
</script>

<style></style>
