<template>
  <div class="home">
    <RegularNav/>
    <div class="container carousel hidden-xs-only">
      <el-carousel :interval="4000" height="480px">
        <el-carousel-item v-for="(it, index) in list_carousel" :key="index">
          <router-link :to="`/product/${it.id}`">
            <img :src="fileUrl(it.carousel_img)" alt>
          </router-link>
          <!-- <h3>{{ it }}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <h2>新品</h2>
      <el-row class="card-list" :gutter="10">
        <el-col :md="6" :sm="6" :xs="12" v-for="(it, index) in list_new" :key="index">
          <ProductCard :data="it"></ProductCard>
        </el-col>
      </el-row>
      <h2>促销</h2>
      <el-row class="card-list" :gutter="10">
        <el-col :md="6" :sm="6" :xs="12" v-for="(it, index) in list_hot" :key="index">
          <ProductCard :data="it"></ProductCard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import RegularNav from "../components/RegularNav";
import ProductCard from "../components/ProductCard";
import { fileUrl } from "../lib/helper";
import api from "../lib/api";
export default {
  components: {
    RegularNav,
    ProductCard
  },
  data() {
    return {
      currentDate: "",
      list_new: {},
      list_hot: {},
      list_carousel: {}
    };
  },
  mounted() {
    this.read("new");
    this.read("hot");
    this.read("carousel");
  },
  methods: {
    fileUrl,
    read(type) {
      api("product/read", { where: { and: { ["is_" + type]: true } } }).then(
        r => {
          if (r.success) {
            this["list_" + type] = r.data || [];
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.home {
  margin-bottom: 60px;
}

h2 {
  border-left: 4px solid #ff6b6b;
  padding-left: 10px;
}

.carousel {
  margin-top: 2em;
}

.el-carousel__item h3 {
  /* color: #475669; */
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */

</style>
