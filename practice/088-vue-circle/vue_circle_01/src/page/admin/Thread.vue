<template>
  <div>
    <h1>帖子管理</h1>
    <Pagination :count="51" :limit="10" :onChange="a"/>
  </div>
</template>

<script>
import Pagination from "../../component/Pagination";

export default {
  components: { Pagination },
  data() {
    return {};
  },
  methods: {
    a() {
      // console.log(page);
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: left;
}
</style>
