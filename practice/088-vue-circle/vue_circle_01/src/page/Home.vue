<template>
  <div>
    <div class="container">
      <h1>Home</h1>
      <form class="new-thread" @submit.prevent="onSubmit">
        <input type="text" v-model="threadForm.title" placeholder="标题">
        <textarea rows="5" v-model="threadForm.content" placeholder="内容"></textarea>
        <button type="submit">提交</button>
      </form>
      <div class="timeline">
        <div class="activity" v-for="it in threadList" :key="it.id">
          <router-link :to="'/thread/' + it.id">{{it.title}}</router-link>
          <div class="content">{{it.content}}</div>
          <div class="operation">
            <span v-if="user && it.$user && (it.$user.id === user.id)">
              <button @click="threadForm=it">更新</button>
              <button @click="deleteThread(it.id)">删除</button>
            </span>
          </div>
          <div class="others">
            <span>{{it.$user ? (it.$user.username || it.$user.name):'已注销'}}</span>
            <span class="muted small">发布于：{{it.created_at}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
import formatter from "../lib/dateFormatter.js";

export default {
  mounted() {
    this.readThread();
  },
  data() {
    return {
      threadForm: {},
      error: {
        title: false
      },
      threadList: [],
      user: session.user()
    };
  },
  methods: {
    readThread() {
      api("thread/read", {
        where: { and: { parent_id: null } },
        with: ["belongs_to:user"]
      }).then(r => {
        if (r.success) {
          this.threadList = r.data;
        }
      });
    },

    onSubmit() {
      if (!this.threadForm.title) {
        this.error.title = true;
        return;
      }
      let url = "thread/create";

      this.threadForm.created_at = formatter.format(new Date());
      this.threadForm.cat_id = 1;
      this.threadForm.user_id = session.user().id;

      if (this.threadForm.id) url = "thread/update";

      api(url, this.threadForm).then(r => {
        if (!r.success) return;

        this.threadForm = {};
        this.readThread();
      });
    },

    threadDelete(id) {
      api("thread/delete", { id }).then(r => {
        if (!r.success) return;

        this.readThread();
      });
    }
  }
};
</script>

<style scoped>
.activity {
  border: 1px solid;
  padding: 0.2em;
  margin: 0.5em;
}

.operation button {
  padding: 0.2em;
}
</style>
