<template>
  <div class="container">
    <div class="post-area">
      <h2>{{post.title}}</h2>
      <div class="content">{{post.content}}</div>
    </div>
    <div class="comment-area">
      <button class="comment-btn" @click="setFormVisible">评论</button>
      <form v-if="formVisible" @submit.prevent="createComment">
        <input type="text" placeholder="你的邮箱" v-model="currentComment.email">
        <textarea rows="4" placeholder="你的评论" v-model="currentComment.content"></textarea>
        <button type="submit">提交</button>
      </form>
      <div class="comment-list">
        <div class="comment" v-for="it in commentList" :key="it.id">
          <div class="email">{{it.email}} <span v-if="it.reply_to">回复：{{it.$reply_back.email}}</span> </div>
          <div class="content">{{it.content}}</div>
          <div class="reply">
            <button @click="reply(it.id)">回复</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
export default {
  data() {
    return {
      post: {},
      id: null,
      formVisible: false,
      currentComment: {},
      commentList: []
    };
  },
  mounted() {
    let id = (this.id = this.$route.params.id);
    this.findPost(id);
    this.readComment(id);
    this.currentComment.post_id = id;
  },
  methods: {
    findPost(id) {
      api("post/find", { id }).then(r => {
        this.post = r.data;
      });
    },
    setFormVisible() {
      this.formVisible = !this.formVisible;
    },
    createComment() {
      api("comment/create", this.currentComment).then(r => {
        if (r.success) {
          this.readComment(this.id);
          this.resetForm();
        }
      });
    },
    readComment(id) {
      api("comment/read", { 
        with:[{
          model: 'comment',
          relation: 'belongs_to',
          foreign_key: 'reply_to',
          as: 'reply_back'
        }],
        where: { and: { post_id: id } } }).then(r => {
        this.commentList = r.data;
      });
    },
    resetForm() {
      this.currentComment.email = "";
      this.currentComment.content = "";
    },
    reply(id) {
      this.setFormVisible();
      this.currentComment.reply_to = id;
    }
  }
};
</script>

<style scoped>
.content {
  white-space: pre-wrap;
}

.comment-btn {
  margin: 0.5em 0;
}

.comment-list {
  margin: 0.8em 0;
}

.comment {
  margin-bottom: 0.5em;
}

.email {
  font-size: 0.8em;
  color: #555;
}

.reply button {
  font-size: .5em;
  padding: .2em;
}
</style>
