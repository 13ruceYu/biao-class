<template>
  <div class="container">
    <div class="title">
      <h1>{{row.title}}</h1>
    </div>
    <div class="content">{{row.content}}</div>
    <div class="comment-area">
      <button type="button" @click="setCommentFormVisible">评论</button>
      <form v-if="commentFormVisible" @submit.prevent="createComment">
        <input type="email" placeholder="你的邮箱" v-model="commentForm.email">
        <textarea placeholder="你的评论" v-model="commentForm.content"></textarea>
        <button type="submit">提交</button>
      </form>
      <div class="comment-list">
        <div class="comment" v-for="it in commentList" :key="it.id">
          <div class="email">
            {{it.email}}
            <span v-if="it.reply_to"><span style="font-weight:bold">回复</span>：{{it.$reply_too.email}}</span>
          </div>
          <div class="content">{{it.content}}</div>
          <div class="reply">
            <button @click="reply(it)">回复</button>
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
      row: {},
      commentFormVisible: false,
      commentForm: {},
      commentList: [],
      id: null
    };
  },
  mounted() {
    let id = (this.id = this.$route.params.id);
    this.findPost(id);
    this.readComment(id);
    this.commentForm.post_id = id;
  },
  methods: {
    findPost(id) {
      api("post/find", { id }).then(r => {
        this.row = r.data;
      });
    },
    createComment() {
      api("comment/create", this.commentForm).then(r => {
        if (r.success) {
          this.resetCommentForm();
          this.readComment(this.id);
        }
      });
    },
    readComment(id) {
      let params = {
        with: [
          {
            model: "comment",
            relation: "belongs_to",
            foreign_key: "reply_to",
            as: 'reply_too'
          }
        ],
        where: { and: { post_id: id } }
      };
      api("comment/read", params).then(r => {
        this.commentList = r.data;
      });
    },
    resetCommentForm() {
      this.commentForm.email = "";
      this.commentForm.content = "";
    },
    setCommentFormVisible() {
      this.commentFormVisible = !this.commentFormVisible;
    },
    reply(it) {
      this.setCommentFormVisible();
      this.commentForm.reply_to = it.id;
    }
  }
};
</script>

<style scoped>
.content {
  white-space: pre-wrap;
}

.comment-area button {
  margin: 1em 0;
}

.comment-list .comment {
  margin-bottom: 0.8em;
}

.comment-list .email {
  font-size: 0.6em;
  color: #555;
}

.reply button {
  font-size: 0.5em;
  border: 0.5px solid;
}
</style>





