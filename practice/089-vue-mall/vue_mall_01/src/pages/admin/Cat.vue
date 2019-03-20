<template>
  <div class="admin-cat">
    <h1>分类管理</h1>
    <div class="tool-bar">
      <el-button-group>
        <el-button type="primary" @click="ui.formVisible = !ui.formVisible">创建</el-button>
      </el-button-group>
    </div>
    <div class="modify-form">
      <form @submit="createOrUpdate" v-if="ui.formVisible">
        <h2>添加/修改</h2>
        <div class="input-field">
          <div class="title">分类名</div>
          <input type="text" v-model="form.name" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.name" :key="e.id">
              <span v-if="invalid">{{rules.name[e].msg}}</span>
            </div>
          </div>
        </div>
        <div class="input-field">
          <div class="title">父级分类</div>
          <Dropdown
            api="cat/read"
            searchBy="name"
            displayBy="name"
            klass="el-input__inner"
            :onSelect="makeSelect('parent_id')"
          />
          <!-- <input type="text" v-model="form.name" class="el-input__inner"> -->
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.name" :key="e.id">
              <span v-if="invalid">{{rules.name[e].msg}}</span>
            </div>
          </div>
        </div>
        <button type="submit" class="el-button el-button--primary">提交</button>
        <button type="button" class="el-button" v-if="ui.formVisible==true" @click="resetForm">取消</button>
      </form>
      <!-- <el-form>
        <el-input placeholder="请输入内容"></el-input>
      </el-form>-->
    </div>
    <div class="cat-table">
      <h2>列表</h2>
      <p>总分类数：{{total}}</p>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="name" label="分类名" min-width="100"></el-table-column>
        <el-table-column prop="$parent.name" label="父级分类名" min-width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="110">
          <template slot-scope="scope">
            <el-button @click="fill(scope.row)" type="text" size="small">更新</el-button>
            <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination text-center">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="readParam.limit"
          :current-page="readParam.page"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import admin from "../../mixins/admin";
import Dropdown from "../../components/Dropdown";
export default {
  mixins: [admin],
  components: { Dropdown },
  data() {
    return {
      model: "cat",
      readParam: {
        with: [
          {
            model: "cat",
            relation: "belongs_to",
            foreign_key: "parent_id",
            as: "parent"
          }
        ]
      },
      rules: {
        name: {
          unique: {
            params: ["cat", "exists", "name"],
            msg: "分类名已存在"
          },
          required: {
            msg: "此项为必填项"
          }
        }
      }
    };
  },
  methods: {}
};
</script>

