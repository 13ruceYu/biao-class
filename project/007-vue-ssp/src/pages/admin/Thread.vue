<template>
  <div class="admin-thread">
    <el-button @click="ui.formVisible=!ui.formVisible">添加/更新文章</el-button>
    <div class="form-thread">
      <form @submit.prevent="createOrUpdate">
        <div class="input-field">
          <div class="title">封面</div>
          <Uploader :autoUpload="true" @uploadSuccess="imgUpload"></Uploader>
          <div v-if="form.cover">
            <img :src="form.cover" alt="">
          </div>
          <!-- <div class="list-error">
            <div class="error" v-for="(value, key, index) in errors.nickname" :key="index">
              <span v-if="value">{{rules.nickname[key].msg}}</span>
            </div>
          </div>-->
        </div>
        <div class="input-field">
          <div class="title">标题</div>
          <el-input v-model="form.title"></el-input>
          <!-- <div class="list-error">
            <div class="error" v-for="(value, key, index) in errors.nickname" :key="index">
              <span v-if="value">{{rules.nickname[key].msg}}</span>
            </div>
          </div>-->
        </div>
        <div class="input-field">
          <div class="title">内容</div>
          <VueEditor v-model="form.content" useCustomImageHandler @imageAdded="handleImageAdded"></VueEditor>
        </div>
        <div class="el-input-field">
          <el-button type="primary" native-type="submit">确定</el-button>
          <el-button @click="ui.formVisible=false;form = {}">取消</el-button>
        </div>
      </form>
    </div>
    <div class="table-thread">
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed prop="title" label="标题" min-width="150"></el-table-column>
        <el-table-column prop="user_id" label="作者id" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination text-center">
        <el-pagination
          @current-change="flip"
          :page-size="readParam.limit"
          :pager-count="11"
          layout="prev, pager, next"
          :total="total"
          :current-page="readParam.page"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import admin from "../../mixins/admin";
import { VueEditor } from "vue2-editor";
import session from "../../lib/session";
import api from "../../lib/api";
import Uploader from "../../components/Uploader";
// import axios from "axios";
export default {
  mixins: [admin],
  components: { VueEditor, Uploader },
  data() {
    return {
      model: "thread",
      form: {
        user_id: null,
        cover: '',
      }
    };
  },
  mounted() {
    this.form.user_id = session.user("id");
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);

      api("_file/create", formData).then(r => {
        if(r.success) {
          let url = 'https://' + r.data['_base_url'] + '/' + r.data['_key'];
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        }
      })
    },
    imgUpload(img) {
      let imgUrl = 'https://' + img['_base_url'] + '/' + img['_key'];
      this.form.cover = imgUrl;
    }
  }
};
</script>

<style scoped>
.el-input-field {
  margin: 15px 0;
}
</style>
