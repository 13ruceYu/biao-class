<template>
  <div>
    <h1>订单管理</h1>
    <div>
      <h2>列表</h2>
      <p>总数：{{total}}</p>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="id" label="订单号" width="180"></el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">{{scope.row._paid ? '已支付' : '未支付'}}</template>
        </el-table-column>
        <el-table-column prop="sum" label="总费用" width="180"></el-table-column>
        <el-table-column prop="detail.length" label="产品数" width="180"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="fill(scope.row)" type="text" size="small">更新</el-button>
            <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-center">
        <el-pagination
          :page-size="readParam.limit"
          :current-page="readParam.page"
          layout="prev, pager, next"
          :total="total"
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
      model: "order"
    };
  },
  methods: {}
};
</script>
