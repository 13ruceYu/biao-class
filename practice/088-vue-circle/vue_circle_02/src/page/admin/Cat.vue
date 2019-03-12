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
          <input @keydown="debounceValidate('name')" v-model="form.name">
          <span class="error-list">
            <div v-for="(invalid, e) in errors.name" :key="e.id" class="error">
              <span v-if="invalid">{{rules.name[e].msg}}</span>
            </div>
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
          <td>{{it.name || '-'}}</td>
          <td>
            <div class="btn-group">
              <button @click="fillAndShow(it)">更新</button>
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
      model: "cat",
      rules: {
        name: {
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
  methods: {}
};
</script>

<style></style>
