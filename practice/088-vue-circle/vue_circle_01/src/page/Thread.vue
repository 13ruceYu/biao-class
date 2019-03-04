<template>
  <div>
    <div class="container">
      <div class="thread-container">
        <h1>{{current.title}}</h1>
        <div class="info">
          <span>作者：{{name(current)}}</span>
          <span class="time">时间：{{current.created_at}}</span>
        </div>
        <div class="sub-thread head">
          <div class="content">{{current.content}}</div>
        </div>
        <div class="sub-thread" v-for="it in subList" :key="it.id">
          <!-- <div class="user">{{name(it)}}</div> -->
          <div class="content">{{it.content}}</div>
          <div class="others">
            <span>{{it.$user ? (it.$user.username || it.$user.name):'已注销'}}</span>
            <span class="muted small">发布于：{{it.created_at}}</span>
          </div>
        </div>
      </div>
      <form @submit.prevent="createSub">
        <textarea rows="5" v-model="form.content"></textarea>
        <button type="submit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
import session from "../lib/session";
import name from "../lib/name";
import formatter from "../lib/dateFormatter";
export default {
  mounted() {
    this.id = this.$route.params.id;
    this.find(this.id);
    this.readSub();
  },
  data() {
    return {
      name,
      current: {},
      form: {},
      subList: []
    };
  },
  methods: {
    find(id) {
      api("thread/find", { id, with: ["belongs_to:user"] }).then(
        r => (this.current = r.data)
      );
    },
    createSub() {
      let form = this.form;
      form.parent_id = this.id;
      form.cat_id = 1;
      form.created_at = formatter.format(new Date());
      form.user_id = session.user().id;

      api("thread/create", this.form).then(r => {
        if (r.success) {
          this.form = {};
          this.readSub();
        }
      });
    },
    readSub() {
      api("thread/read", {
        where: { and: { parent_id: this.id } },
        with: ["belongs_to:user"]
      }).then(r => (this.subList = r.data));
    }
  }
};
</script>

<style scoped>
.thread-container {
  background: #fff;
  padding: 0.5em;
}

.sub-thread {
  border-bottom: 1px solid #aaa;
  margin-bottom: 0.5em;
}

.info .time {
  margin-left: 0.5em;
}

.content {
  white-space: pre-line;
}
</style>
