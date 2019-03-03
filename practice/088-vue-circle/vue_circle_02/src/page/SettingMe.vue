<template>
  <div>
    <div class="card">
      <div class="title">
        基本信息
        <button @click="editMode=!editMode">
          <span v-if="editMode">取消</span>修改
        </button>
      </div>
      <div class="content">
        <fieldset :disabled="updatePedding">
          <form @submit.prevent="update">
            <dl>
              <dt>昵称：</dt>
              <dd>
                <input
                  type="text"
                  v-model="me.name"
                  :readonly="!editMode"
                  v-if="me.name || editMode"
                >
                <span v-else>-</span>
              </dd>
            </dl>
            <dl>
              <dt>个人介绍：</dt>
              <dd>
                <input
                  type="text"
                  v-model="me.intro"
                  :readonly="!editMode"
                  v-if="me.intro || editMode"
                >
                <span v-else>-</span>
              </dd>
            </dl>
            <dl>
              <dt>用户名：</dt>
              <dd>
                <input
                  type="text"
                  v-model="me.username"
                  :readonly="!editMode"
                  v-if="me.username || editMode"
                >
                <span v-else>-</span>
                <span class="error" v-if="error.username">用户名已存在</span>
              </dd>
            </dl>
            <button type="submit" v-if="editMode">提交</button>
          </form>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
import store from "../lib/store.js";
export default {
  mounted() {
    api("user/find", { id: store.get("user").id }).then(r => {
      if (r.success) this.me = r.data;
    });
  },
  data() {
    return {
      me: {},
      editMode: false,
      updatePedding: false,
      error: {
        username: false
      }
    };
  },
  methods: {
    update() {
      this.validateUsername();
    },
    validateUsername() {
      this.updatePedding = true;
      api("user/exists", {
        where: { and: { username: this.me.username } }
      }).then(r => {
        let usernameChanged = this.me.username !== session.user().username;
        if (r.data && usernameChanged) {
          this.error.username = true;
          this.updatePedding = false;
          return;
        }
        api("user/update", this.me).then(r => {
          this.me = r.data;
          alert('用户名修改成功，请重新登录');
          session.logout();
          this.editMode = false;
          this.updatePedding = false;
        });
      });
    }
  }
};
</script>

<style scoped>
.card input {
  border: 0;
  outline: 1px solid;
}

.card input:read-only {
  border: 0;
  outline: 0;
}

</style>
