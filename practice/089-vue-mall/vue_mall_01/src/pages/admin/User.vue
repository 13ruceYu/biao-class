<template>
  <div class="admin-user">
    <h1>用户管理</h1>
    <div>
      <el-button-group>
        <el-button size="mini">创建</el-button>
        <el-button size="mini">批量操作</el-button>
      </el-button-group>
    </div>
    <div>
      <h2>添加/修改</h2>
      <el-form>
        <el-input placeholder="请输入内容"></el-input>
      </el-form>
    </div>
    <div>
      <h2>列表</h2>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>