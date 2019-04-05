<template>
  <div class="home">
    <div class="top-banner">
      <el-row :gutter="5" style="margin-bottom: 5px">
        <el-col :md="12" class="main-banner">
          <a href="#">
            <img src="../img/main-banner.png" alt="main-banner">
          </a>
        </el-col>
        <el-col :md="12" class="sub-banner">
          <el-row :gutter="4">
            <el-col :span="12">
              <a href="#">
                <img src="../img/sub-banner01.jpg" alt>
              </a>
            </el-col>
            <el-col :span="12">
              <a href="#">
                <img src="../img/sub-banner02.png" alt>
              </a>
            </el-col>
            <el-col :span="12" style="margin-top: 2px">
              <a href="#">
                <img src="../img/sub-banner03.png" alt>
              </a>
            </el-col>
            <el-col :span="12" style="margin-top: 2px">
              <a href="#">
                <img src="../img/sub-banner04.jpg" alt>
              </a>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <el-row>
        <el-col :md="16" class="list-thread">
          <ThreadCard></ThreadCard>
        </el-col>
        <el-col :md="8"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ThreadCard from "../components/ThreadCard";
export default {
  components: { ThreadCard }
};
</script>

<style scoped>
.top-banner {
  padding: 0 5px;
  margin: 45px 0;
}
</style>
