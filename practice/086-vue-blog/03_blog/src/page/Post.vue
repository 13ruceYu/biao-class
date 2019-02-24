<template>
  <div class="container">
    <div class="title">
      <h2>{{row.title}}</h2>
    </div>
    <div class="cat">
      分类：{{row.$cat ? row.$cat.name : ''}}
      <hr>
    </div>
    <div class="content">
      {{row.content}}
      <hr>
    </div>
    <div class="comment-area">
      <button @click="setCommentFormVisible">评论</button>
      <form v-if="commentFormVisible" @submit.prevent="createComment">
        <input type="email" placeholder="你的邮箱" v-model="currentComment.email">
        <textarea rows="5" placeholder="你的评论" v-model="currentComment.content"></textarea>
        <button type="submit">提交</button>
      </form>
      <div class="comment-list">
        <div class="comment" v-for="it in commentList" :key="it.id">
          <div class="email">{{it.email}} <span v-if="it.reply_to">回复：{{it.$comment.email}}</span> </div>
          <div class="content">{{it.content}}</div>
          <button class="reply-btn" @click="reply(it.id)">回复</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../lib/api';
export default {
  data() {
    return {
      row: {},
      id: this.$route.params.id,
      commentFormVisible: false,
      currentComment: {},
      commentList: []
    }
  },
  mounted() {
    this.findPost(this.id);
    this.currentComment.post_id = this.id;
    this.readCommentList();
  },
  methods: {
    findPost(id) {
      let params = {
        id,
        with: [{
          model: 'cat',
          relation: 'belongs_to'
        }]
      }
      api('post/find', params)
      .then(r => {
        this.row = r.data
      })
    },
    setCommentFormVisible() {
      this.commentFormVisible = !this.commentFormVisible;
    },
    resetCommentForm() {
      this.currentComment.email = '';
      this.currentComment.content = '';
    },
    createComment() {
      api('comment/create', this.currentComment)
      .then(r => {
        if (r.success) {
          this.readCommentList();
          this.resetCommentForm();
        }
      })
    },
    readCommentList() {
      let params = {
        with: [{
          model: 'comment',
          relation: 'belongs_to',
          foreign_key: 'reply_to'
        }],
        where: {
          and: {post_id: this.id}
        }
      }
      api('comment/read', params)
      .then(r => {
        if (r.success)
        this.commentList = r.data;
      })
    },
    reply(id) {
      this.setCommentFormVisible();
      this.currentComment.reply_to = id;
    }
  },
}
</script>

<style scoped>
.comment-area > * {
  margin: .4em 0;
}

.comment-area > button {
  margin-top: 1em;
}

.comment {
  margin-bottom: .5em;
}

.email {
  font-size: .8em;
  color: #555;
}

.reply-btn {
  background: #fff;
  font-size: .7em;
  border: 1px solid
}
</style>
