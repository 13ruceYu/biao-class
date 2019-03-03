<template>
  <div>
    <div class="card">
      <div class="title">安全设置</div>
      <div class="content">
        <dl>
          <dt>密码</dt>
          <dd>
            <button @click="changePasswordVisible=!changePasswordVisible">
              <span v-if="changePasswordVisible">取消</span>修改密码
            </button>
          </dd>
        </dl>
        <fieldset :disabled="changePasswordPedding">
          <form v-if="changePasswordVisible" @submit.prevent="validateAndChangePassword">
            <div class="input-control">
              <label>
                <span class="title">旧密码</span>
                <input type="text" v-model="passwordForm.old">
                <span class="error" v-if="errorPassword.old">旧密码有误</span>
              </label>
            </div>
            <div class="input-control">
              <label>
                <span class="title">新密码</span>
                <input type="text" v-model="passwordForm.new">
                <span class="error" v-if="errorPassword.new">密码长度需大于6位</span>
              </label>
            </div>
            <div class="input-control">
              <label>
                <span class="title">重复新密码</span>
                <input type="text" v-model="passwordForm.repeat">
                <span class="error" v-if="errorPassword.repeat">两次密码输入不一致</span>
              </label>
            </div>
            <button type="submit">提交修改</button>
          </form>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
import store from "../lib/store";
export default {
  data() {
    return {
      changePasswordVisible: true,
      changePasswordPedding: false, // 禁用表单防止重复提交
      passwordForm: {},
      user: store.get("user"),
      errorPassword: {
        old: false,
        new: false,
        repeat: false
      }
    };
  },
  methods: {
    validateAndChangePassword() {
      // 先验证新密码，减小开支
      if (this.invalidNewPassword() || this.invalidRepeatPassword()) {
        return;
      }
      // 验证旧密码
      api("user/find", { id: this.user.id, only: ["password"] }).then(r => {
        this.changePasswordPedding = true;
        let invalidOld = this.passwordForm.old !== r.data.password;
        if (invalidOld) {
          this.errorPassword.old = true;
          this.changePasswordPedding = false;
          return;
        }
        this.changePasswordPedding = true;

        this.errorPassword.old = false;
        // 更新密码
        let user = this.user;
        user.password = this.passwordForm.new;
        this.changePassword();
      });
    },
    changePassword() {
      let user = this.user;
      api("user/update", user).then(r => {
        if (!r.success) {
          alert("密码更新失败");
          return;
        }
        alert("密码更新成功");
        this.passwordForm = {};
        this.changePasswordVisible = false;
        this.changePasswordPedding = false;
      });
    },
    invalidNewPassword() {
      return (this.errorPassword.new = this.passwordForm.new.length < 6);
    },
    invalidRepeatPassword() {
      return (this.errorPassword.repeat =
        this.passwordForm.repeat !== this.passwordForm.new);
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: left;
}
</style>
