<template>
  <div>
    <div class="card">
      <div class="title">基本资料</div>
      <div class="content">
        <div class="edit">
          <button @click="editMode=!editMode">
            <span v-if="editMode">取消</span>修改
          </button>
        </div>
        <form @submit.prevent="onSubmit">
          <fieldset :disabled="pedding">
            <dl>
              <dt>昵称：</dt>
              <dd>
                <input type="text" v-model="me.name" :readonly="!editMode" v-if="editMode || me.name">
                <span v-else>-</span>
              </dd>
            </dl>
            <dl>
              <dt>自我介绍：</dt>
              <dd>
                <input type="text" v-model="me.intro" :readonly="!editMode" v-if="editMode || me.intro">
                <span v-else>-</span>
              </dd>
            </dl>
            <dl>
              <dt>用户名：</dt>
              <dd>
                <input type="text" v-model="me.username" :readonly="!editMode">
              </dd>
            </dl>
            <button type="submit" v-if="editMode">提交</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
import session from "../lib/session";
export default {
  mounted() {
    this.user = session.getUser("user");
    api("user/find", { id: this.user.id }).then(r => {
      if (r.success) {
        this.me = r.data;
      }
    });
  },
  data() {
    return {
      me: {},
      user: {},
      editMode: false,
      pedding: false
    };
  },
  methods: {
    onSubmit() {
      this.pedding = true;
      this.validateUsername();
    },
    validateUsername() {
      let usernameChanged = this.me.username !== this.user.username;
      api("user/exists", {
        where: { and: { username: this.me.username } }
      }).then(r => {
        if (r.data && usernameChanged) {
          alert("用户名已存在");
          this.pedding = false;
          return;
        }

        if (!usernameChanged) {
          api("user/update", this.me).then(r => {
            if (r.success) {
              this.me = r.data;
              this.editMode = false;
              this.pedding = false;
            }
          });
        } else this.updateUsername();
      });
    },
    updateUsername() {
      api("user/update", this.me).then(r => {
        if (r.success) {
          this.me = r.data;
          this.editMode = false;
          this.pedding = false;
          alert("用户名修改成功，请重新登录");
          session.logout();
        }
      });
    }
  }
};
</script>

<style scoped>
.card {
  margin-left: 5px;
}

dl {
  margin: 5px 0;
}

dl > * {
  display: inline-block;
}

dl dd {
  margin-left: 5px;
}

.card input {
  border: 0;
  outline: 1px solid;
}

.card input:focus {
  outline: 1px solid tomato;
}

.card input:read-only {
  border: 0px;
  outline: 0px;
}

fieldset:disabled {
  background: orange;
  border: 3px solid;
}
</style>
