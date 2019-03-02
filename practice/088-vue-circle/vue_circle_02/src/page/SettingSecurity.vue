<template>
  <div>
    <div class="card">
      <div class="title">安全设置</div>
      <div class="content">
        <dl>
          <dt>密码</dt>
          <dd>
            <button @click="editMode=!editMode">
              <span v-if="editMode">取消</span>修改密码
            </button>
          </dd>
        </dl>
        <fieldset :disabled="pedding">
          <form v-if="editMode" @submit.prevent="validateAndUpdatePassword">
            <div class="input-control">
              <label>
                <div class="title">旧密码</div>
                <input type="text" v-model="passwordForm.old">
                <span class="error" v-if="error.old">旧密码有误</span>
              </label>
            </div>
            <div class="input-control">
              <label>
                <div class="title">新密码</div>
                <input type="text" v-model="passwordForm.new">
                <span class="error" v-if="error.new">密码长度需大于6位</span>
              </label>
            </div>
            <div class="input-control">
              <label>
                <div class="title">重复新密码</div>
                <input type="text" v-model="passwordForm.repeat">
                <span class="error" v-if="error.repeat">两次密码不一致</span>
              </label>
            </div>
            <button type="submit">提交</button>
          </form>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import store from "../lib/store.js";
export default {
  data() {
    return {
      editMode: true,
      passwordForm: {},
      user: store.get("user"),
      pedding: false,
      error: {
        old: false,
        new: false,
        repeat: false
      }
    };
  },
  methods: {
    validateAndUpdatePassword() {
      // 先验证新密码和重复密码是否符合规范，减少服务器开支
      if (this.validateNew() || this.validateRepeat()) return;

      // 验证旧密码
      this.validateOld();

      // 更新密码
    },
    validateNew() {
      return (this.error.new = this.passwordForm.new.length < 6);
    },
    validateRepeat() {
      return (this.error.repeat =
        this.passwordForm.repeat !== this.passwordForm.new);
    },
    validateOld() {
      this.pedding = true;
      api("user/find", { id: this.user.id, only: ["password"] }).then(r => {
        if (r.success) {
          let validOld = (this.error.old =
            this.passwordForm.old !== r.data.password);
          if (validOld){
            this.pedding = false;
            return;
          } 

          this.updatePassword();
        }
      });
    },
    updatePassword() {
      let user = this.user;
      user.password = this.passwordForm.new;
      this.pedding = true;
      api("user/update", user).then(r => {
        if (r.success) {
          this.passwordForm = {};
          this.editMode = false;
          alert("密码修改成功");
          this.pedding = false;
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
