<template>
  <div class="admin-cat">
    <div class="edit-cat">
      <el-button @click="ui.formVisible = true">创建/修改分类</el-button>
      <div class="search f-right">
        <form @submit.prevent="search">
          <el-input placeholder="搜索分类" prefix-icon="el-icon-search" v-model="keyword" clearable></el-input>
          <button type="submit" hidden></button>
        </form>
      </div>
    </div>
    <div class="form-edit" v-if="ui.formVisible">
      <form @submit.prevent="createOrUpdate">
        <div class="input-field">
          <input type="text" placeholder="分类名" v-model="form.name">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.name" :key="e.id">
              <span v-if="invalid">{{rules.name[e].msg}}</span>
            </div>
          </div>
        </div>
        <div class="cancel">
          <el-button @click="ui.formVisible=false">取消</el-button>
        </div>
        <div class="input-field">
          <button type="submit">提交</button>
        </div>
      </form>
    </div>
    <div class="table-cat">
      <el-table :data="list" style="width: 100%" max-height="500">
        <el-table-column fixed prop="name" label="分类名" width="120"></el-table-column>
        <el-table-column prop="id" label="id" min-width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination text-center">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="readParam.limit"
          :current-page="readParam.page"
          @current-change="flip"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import admin from "../../mixins/admin";
export default {
  mixins: [admin],
  data() {
    return {
      model: "cat",
      rules: {
        name: {
          unique: {
            params: ["cat", "exists", "name"],
            msg: "分类名已存在"
          },
          required: {
            msg: "此项为必填项"
          },
        },
      },
      keyword: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
.admin-cat {
  padding-bottom: 30px;
}

.edit-cat,
.cancel {
  margin-bottom: 20px;
}

.table-cat {
  border: 1px solid #ccc;
  padding: 5px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
}
</style>
