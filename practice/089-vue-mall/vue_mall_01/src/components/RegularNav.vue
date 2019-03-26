<template>
  <div class="nav">
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="logo">
            <img src="../img/logo.png" alt="logo">
          </div>
        </el-col>
        <el-col :span="12" class="search">
          <form @submit.prevent="toSearch">
            <el-input v-model="formSearch.keyword" suffix-icon="el-icon-search"></el-input>
          </form>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formSearch:{},
    }
  },
  methods: {
    toSearch(){
      this.$router.push({path: '/search', query: this.formSearch})
    }
  },
};
</script>

<style scoped>
.nav {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.search {
  margin-top: 0.5em;
}
</style>
