<template>
  <div class="admin-brand">
    <h1>品牌管理</h1>
    <div class="tool-bar">
      <el-button-group>
        <el-button size="mini" @click="ui.formVisible = !ui.formVisible">创建</el-button>
      </el-button-group>
    </div>
    <div class="modify-form">
      <form @submit="createOrUpdate" v-if="ui.formVisible">
        <h2>添加/修改</h2>
        <div class="input-field">
          <div class="title">品牌名</div>
          <input type="text" v-model="form.name">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.name" :key="e.id">
              <span v-if="invalid">{{rules.name[e].msg}}</span>
            </div>
          </div>
        </div>
        <button type="submit">提交</button>
      </form>
      <!-- <el-form>
        <el-input placeholder="请输入内容"></el-input>
      </el-form>-->
    </div>
    <div>
      <h2>列表</h2>
      <p>总用户数：{{total}}</p>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="name" label="品牌名" min-width="100"></el-table-column>
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
export default {
  mixins: [admin],
  data() {
    return {
      model: "brand",
      rules: {
        name: {
          unique: {
            params: ["brand", "exists", "name"],
            msg: "品牌名已存在"
          },
          required: {
            msg: "此项为必填项"
          },
        },
      }
    };
  }
};
</script>

