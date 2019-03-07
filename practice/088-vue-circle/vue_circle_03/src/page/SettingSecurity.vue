<template>
  <div>
    <div class="card">
      <div class="title">安全设置</div>
      <div class="toolbar">
        <button @click="ui.showForm = !ui.showForm">修改密码</button>
      </div>
      <form v-if="ui.showForm" @submit.prevent="onSubmit">
        <div class="input-control">
          <label>
            <div class="title">旧密码</div>
            <input type="text" v-model="form.old">
            <div class="error" v-if="error.old">旧密码有误</div>
          </label>
        </div>
        <div class="input-control">
          <label>
            <div class="title">新密码</div>
            <input type="text" v-model="form.new">
            <div class="error" v-if="error.new">密码长度必须大于6位</div>
          </label>
        </div>
        <div class="input-control">
          <label>
            <div class="title">重复密码</div>
            <input type="text" v-model="form.repeat">
            <div class="error" v-if="error.repeat">两次密码不一致</div>
          </label>
        </div>
        <div class="input-control">
          <button>提交</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import session from '../lib/session'
export default {
  data() {
    return {
      form: {

      },
      ui: {
        showForm:true,
      },
      user:session.getUser('user'),
      error: {
        old: false,
        new: false,
        repeat: false,
      }
    }
  },
  methods: {
    onSubmit() {
      
    },
    validateOld() {
      return this.form.old === this.user.password;
    },
  },
}
</script>