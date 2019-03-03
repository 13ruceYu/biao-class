<template>
  <div>
    <div class="card">
      <div class="title">
        基础信息
        <button @click="editMode=!editMode">
          <span v-if="editMode">取消</span>编辑
        </button>
      </div>
      <form class="content" @submit.prevent="update">
        <fieldset :disabled="updatePedding">
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
              <input
                type="text"
                v-model="me.intro"
                :readonly="!editMode"
                v-if="editMode || me.intro"
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
                v-if="editMode || me.username"
              >
              <span v-else>-</span>
            </dd>
            <span class="error" v-if="error.usernameExists">用户名已存在</span>
          </dl>
        </fieldset>
        <button type="submit" v-if="editMode">完成修改</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import store from "../lib/store.js";
export default {
  mounted() {
    api("user/first", { id: store.get("user").id }).then(r => {
      let data = r.data;
      this.meSaved = data;
      this.me = { ...data };
    });
  },
  data() {
    return {
      me: {}, //当前用户的数据
      meSaved: {},
      editMode: false, // 是否为编辑模式
      updatePedding: false,
      error: {
        usernameExists: false
      }
    };
  },
  methods: {
    update() {
      this.updatePedding = true;
      api("user/exists", {
        where: { and: { username: this.me.username } }
      }).then(r => {
        let usernameChanged = this.me.username !== this.meSaved.username;
        if (r.data && usernameChanged) {
          this.error.usernameExists = true;
          this.updatePedding = false;
          return;
        }

        this.error.usernameExists = false;
        api("user/update", this.me).then(r => {
          this.me = r.data;
          this.editMode = false;
          this.updatePedding = false;
        });
      });
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: left;
}

[disabled] {
  opacity: 0.5;
}

.error {
  color: #b10;
}
</style>
