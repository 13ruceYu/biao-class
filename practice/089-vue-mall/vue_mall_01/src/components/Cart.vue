<template>
  <div class="cart">
    <h2>购物车</h2>
    <el-row v-for="(v,k, index) in listCart" :key="index">
      <el-col :span="18">{{v.product.title}}</el-col>
      <el-col :span="2" class="cny">{{v.product.price}}</el-col>
      <el-col :span="2">{{v.count}}</el-col>
      <el-col :span="2">
        <button @click="cartService.change(k, 1, product)">+</button>
      </el-col>
    </el-row>
    <!-- <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>-->
  </div>
</template>

<script>
import cartService from "../service/cart";
export default {
  data() {
    return {
      listCart: {},
      cartService,
    };
  },
  mounted() {
    this.listCart = cartService.get();
    cartService.onChange(localCart => (this.listCart = localCart));
    // this.listCart = cartService.get();
    // cartService.change(1, +2);
    // eslint-disable-next-line
    // console.log(this.listCart);
  },
  methods: {}
};
</script>

<style scoped>
.cart {
  position: fixed;
  z-index: 20;
  border: 1px solid #333;
  right: 0;
  /* top: 20px; */
  background: #fff;
  /* max-width: 300px; */
}
</style>
