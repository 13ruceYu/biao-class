<template>
  <div>
    <div class="container">
      <div class="thread-container">
        <div class="main-thread">
          <div class="title">{{mainThread.title}}</div>
          <div class="info">
            <span>{{mainUser?mainUser.username:'已注销'}}</span>
            <span class="create-time">创建时间：{{mainThread.created_at}}</span>
          </div>
          <div class="content">{{mainThread.content}}</div>
        </div>
        <div class="title">跟帖</div>
        <form @submit.prevent="createSub">
          <textarea rows="5" v-model="subForm.content"></textarea>
          <button type="submit">提交</button>
        </form>
        <div class="sub-thread-container">
          <div class="sub-thread" v-for="it in subList" :key="it.id">
            <div class="content">{{it.content}}</div>
            <div class="info">
              <span>{{it.$user?it.$user.username:'已注销'}}</span>
              <span class="create-time">{{it.created_at}}</span>
            </div>
            <div class="operation" v-if="it.$user && user">
              <span v-if="it.$user.id === user.id">
                <button @click="subForm=it">更新</button>
                <button @click="deleteSub(it.id)">删除</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
import dateFormatter from "../lib/dateFormatter.js";
export default {
  mounted() {
    let id = this.$route.params.id;
    this.user = session.user();
    api("thread/find", { id, with: ["belongs_to:user"] }).then(r => {
      if (r.success) {
        this.mainThread = r.data;
        this.mainUser = r.data.$user;
      }
    });
    this.readSub();
  },
  data() {
    return {
      user: {},
      mainThread: {},
      mainUser: {},
      subForm: {},
      subList: []
    };
  },
  methods: {
    createSub() {
      this.subForm.parent_id = this.mainThread.id;
      this.subForm.created_at = dateFormatter.format(new Date());
      this.subForm.cat_id = 1;
      this.subForm.user_id = session.user().id;

      let url = "thread/create";
      if (this.subForm.id) url = "thread/update";

      api(url, this.subForm).then(r => {
        if (r.success) {
          this.readSub();
          this.subForm = {};
        }
      });
    },
    readSub() {
      api("thread/read", {
        where: { and: { parent_id: this.$route.params.id } },
        with: ["belongs_to:user"]
      }).then(r => (this.subList = r.data));
    },
    deleteSub(id) {
      api("thread/delete", { id }).then(r => {
        if (r.success) {
          this.readSub();
        }
      });
    }
  }
};
</script>

<style scoped>
.main-thread {
  margin-bottom: 1em;
}

.create-time {
  margin-left: 0.5em;
}

.sub-thread {
  border-bottom: 1px solid #aaa;
  margin-bottom: 1em;
}
</style>
