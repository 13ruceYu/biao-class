<template>
  <div class="product-card">
    <el-card :body-style="{ padding: '0px' }" class="card">
      <router-link :to="`/product/${data.id}`">
        <img :src="data.main_img ? fileUrl(data.main_img[0]) : holder.productMainImg" class="image">
      </router-link>

      <div style="padding: 10px;">
        <router-link :to="`/product/${data.id}`">
          <span class="title">{{data.title | cut(18)}}</span>
        </router-link>

        <div class="price">
          <span class="cny hot">{{data.price}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {fileUrl} from "../lib/helper";
import holder from "../config/holder";
export default {
  props: ['data'],
  data() {
    return {
      holder
    }
  },
  methods: {
    fileUrl,
  },
};
</script>

<style scoped>
.card a {
  color: #222;
}

.card a:hover {
  color: #555;
}

.card .price {
  margin-top: 12px;
}

.card .title {
  font-size: 14px;
}

.product-card {
  margin-bottom: 10px;
}
</style>
