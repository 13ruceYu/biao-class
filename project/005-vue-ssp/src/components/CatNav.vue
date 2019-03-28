<template>
  <div class="cat-nav">
    <div class="container">
      <el-row type="flex" justify="space-between">
        <el-col :span="3" class="text-center cat-item">
          <a href="#">热门文章</a>
        </el-col>
        <el-col :span="3" class="text-center cat-item">
          <a href="#">应用推荐</a>
        </el-col>
        <el-col :span="3" class="text-center cat-item">
          <a href="#">生活方式</a>
        </el-col>
        <el-col :span="3" class="text-center cat-item">
          <a href="#">新玩意</a>
        </el-col>
        <el-col :span="3" class="text-center cat-item">
          <a href="#">正版软件</a>
        </el-col>
        <el-col :span="3" class="text-center cat-item">
          <a href="#">付费栏目</a>
        </el-col>
        <el-col :span="3" class="text-center cat-item">
          <a href="#">Matrix</a>
        </el-col>
        <el-col :span="3" class="text-center cat-item">
          <a href="#">专题广场</a>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.cat-nav {
  border-bottom: 1px solid #ccc;
}

.cat-item {
  border-left: 1px solid #ccc;
  padding: 10px 0;
  font-weight: 700;
  font-size: .9em;
}

.cat-item a:hover {
  color: #d7191a;
}

.cat-item:last-of-type {
  border-right: 1px solid #ccc;
}
</style>
