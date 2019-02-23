<template>
  <div class="container">
    <h1>{{row.title}}</h1>
    <div class="cat">分类：{{row.$cat ? row.$cat.name : ''}}</div><hr>
    <div class="post-content">{{row.content}}</div>
    <div class="comment-area">
      <button @click="setCommentFormVisible">评论</button>
      <form v-if="commentFormVisible" @submit.prevent="createComment">
        <input type="text" placeholder="你的邮箱" v-model="currentComment.email">
        <textarea placeholder="你的评论" v-model="currentComment.content"></textarea>
        <button type="submit">提交</button>
      </form>
      <div class="comment-list">
        <div class="comment" v-for="comment in commentList" :key="comment.id">
          <div class="email">
            {{comment.email}}
            <span v-if="comment.reply_to">回复：
              <span>{{comment.$comment.email}}</span>
            </span>
          </div>
          <div class="content">{{comment.content}}</div>
          <button @click="reply(comment.id)">回复</button>
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
      row: [],
      currentComment: {},
      commentList: [],
      commentFormVisible: false,
      id: null
    };
  },
  mounted() {
    let id = (this.id = this.$route.params.id);
    this.findPost(id);
    this.currentComment.post_id = id;
    this.readComment(id);
  },
  methods: {
    findPost(id) {
      let params = {
        id,
        with: [
          {
            model: 'cat',
            relation: 'belongs_to'
          }
        ]
      }
      api("post/find", params).then(r => {
        this.row = r.data;
      });
    },
    setCommentFormVisible() {
      this.commentFormVisible = !this.commentFormVisible;
    },
    createComment() {
      api("comment/create", this.currentComment).then(r => {
        if (r.success) {
          this.resetCurrentComment();
          this.readComment(this.id);
        }
      });
    },
    resetCurrentComment() {
      this.currentComment.email = "";
      this.currentComment.content = "";
    },
    readComment(id) {
      api("comment/read", {
        with: [
          {
            model: "comment",
            relation: "belongs_to",
            foreign_key: "reply_to"
          }
        ],
        where: { and: { post_id: id } }
      }).then(r => {
        this.commentList = r.data;
      });
    },
    reply(id) {
      this.setCommentFormVisible();
      this.currentComment.reply_to = id;
      this.readComment();
    }
  }
};
</script>

<style scoped>
.post-content {
  white-space: pre-wrap;
}

.comment-area button {
  margin: 0.5em 0;
}

.comment {
  margin: 0.7em 0;
}

.comment .email {
  font-size: 0.8em;
  color: #555;
}

.comment button {
  font-size: 0.7em;
  background: #fff;
  border: 0.5px solid #666;
}
</style>
