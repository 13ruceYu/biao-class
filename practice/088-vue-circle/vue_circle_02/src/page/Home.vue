<template>
  <div>
    <div class="container">
      <h1>Home</h1>
      <div class="action-bar">
        <button @click="showThreadForm" class="primary">发帖</button>
        <!-- <button v-if="session.loggedIn()" @click="ui.threadFormVisible = !ui.threadFormVisible">发帖</button>
        <router-link v-else to="/login">发帖</router-link> -->
      </div>
      <form @submit.prevent="onSubmit" v-if="session.loggedIn() && ui.threadFormVisible">
        <input type="text" placeholder="标题" v-model="threadForm.title">
        <textarea rows="5" placeholder="内容" v-model="threadForm.content"></textarea>
        <button type="submit">提交</button>
      </form>
      <div class="timeline">
        <div class="activity card" v-for="it in threadList" :key="it.id">
          <div class="title">
            <router-link :to="'/thread/' + it.id">标题：{{it.title}}</router-link>
          </div>
          <div class="username">创建者：{{it.$user? it.$user.username : '用户已注销'}}</div>
          <div class="content">
            内容：
            {{it.content | cut}}
          </div>
          <div class="others">创建时间：{{it.created_at}}</div>
          <div class="operation" v-if="it.$user && user">
            <span v-if="it.$user.id === user.id" class="btn-group">
              <button @click="threadForm=it">更新</button>
              <button @click="deleteThread(it.id)">删除</button>
            </span>
          </div>
        </div>
        <div class="more">
          <ScrollLoad :page="1" :pending="threadReadingPending" :totalPage="totalThreadPage" @flip="onFlip"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormatter from "../lib/dateFormatter";
import session from "../lib/session";
import api from "../lib/api";
import ScrollLoad from "../component/ScrollLoad";
export default {
  components: {
    ScrollLoad
  },
  mounted() {
    this.user = session.user();
    this.readThread();
  },
  data() {
    return {
      ui:{
        threadFormVisible:false,
      },
      threadForm: {},
      threadList: [],
      user: {},
      session,
      threadReadParams: {
        with: ["belongs_to:user"],
        where: { and: { parent_id: null } },
        limit: 3
      },
      totalThreadPage: "",
      threadReadingPending: false,
    };
  },
  methods: {
    showThreadForm(){
      if(session.loggedIn())
      this.ui.threadFormVisible = !this.ui.threadFormVisible
      else
      this.$router.push('/login');
    },
    onFlip(page) {
      this.threadReadParams.page = page;
      this.readThread();
    },
    readThread() {
      this.threadReadingPending = true;
      api("thread/read", this.threadReadParams).then(r => {
        if (r.success) {
          this.totalThreadPage = Math.ceil(
            r.total / this.threadReadParams.limit
          );
          this.threadList = [...this.threadList, ...(r.data || [])];
          this.threadReadingPending = false;
        }
      });
    },
    createOrUpdateThread() {
      if (!this.threadForm.title) {
        alert("请填写标题");
        return;
      }

      this.threadForm.cat_id = 1;
      this.threadForm.created_at = dateFormatter.format(new Date());
      this.threadForm.user_id = this.user.id;

      let url;
      this.threadForm.id ? (url = "thread/update") : (url = "thread/create");

      api(url, this.threadForm).then(r => {
        if (r.success) {
          this.threadForm = {};
          this.threadList.unshift(r.data);
        }
      });
    },
    onSubmit() {
      this.user ? this.createOrUpdateThread() : alert("请登录后发言");
    },
    deleteThread(id) {
      api("thread/delete", { id }).then(r => {
        if (r.success) {
          this.threadForm = {};
          this.readThread();
        }
      });
    }
  },
  filters: {
    cut(val) {
      if (!val) return;
      return val.length < 60 ? val : val.substring(0, 60) + "...";
    }
  }
};
</script>

<style scoped>
.activity {
  /* border: 1px solid; */
  margin-bottom: 1em;
  padding: 0.5em;
}

.action-bar {
  margin: .5em 0;
}

.card .title {
  padding-left: 0;
  padding-right: 0;
}
</style>
