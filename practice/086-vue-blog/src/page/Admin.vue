<template>
  <div class="main">
    <form @submit.prevent="onSubmit">
      <h1>添加/更新文章</h1>
      <div class="input-control">
        <label>标题</label>
        <input type="text" v-model="current.title">
      </div>
      <div class="input-control">
        <label>内容</label>
        <textarea v-model="current.content"></textarea>
      </div>
      <div class="input-control">
        <button type="submit">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
  import '../css/admin.css';
  import api from '../lib/api';

  export default {
    data() {
      return {
        current:{}
      }
    },
    methods: {
      onSubmit() {
        api();
        console.log(this.current);
      }
    },
  };
</script>