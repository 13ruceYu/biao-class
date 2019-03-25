<template>
  <el-card class="cart">
    <div slot="header" class="clearfix">
      <span>我的购物车</span>
      <span class="card-close" @click="$emit('close')" style="float:right">关闭</span>
    </div>
    <div v-if="Object.keys(listCart).length < 1">yo，没有东西</div>
    <el-row v-for="(v, k, index) in listCart" :key="index" class="cart-item">
      <el-col :span="3">
        <ProductThumb :data="v" style="padding:2px;border: 1px solid #666"></ProductThumb>
      </el-col>
      <el-col
        :span="10"
        :title="v.product_snapshot.title"
        class="card-title"
      >{{v.product_snapshot.title | cut(18)}}</el-col>
      <el-col :span="4" class="cny hot" style="text-align:center">{{v.product_snapshot.price}}</el-col>
      <el-col :span="7">
        <div data-v-530ad160 class="el-input-number el-input-number--mini">
          <span @click="cartService.change(k, -1)" role="button" class="el-input-number__decrease">
            <i class="el-icon-minus"></i>
          </span>
          <span @click="cartService.change(k, +1)" role="button" class="el-input-number__increase">
            <i class="el-icon-plus"></i>
          </span>
          <div class="el-input el-input--mini">
            <input
              type="text"
              v-model="v.count"
              autocomplete="off"
              aria-label="购物车"
              max="10"
              min="1"
              class="el-input__inner"
              role="spinbutton"
              aria-valuemax="10"
              aria-valuemin="1"
              aria-valuenow="undefined"
              aria-disabled="undefined"
            >
          </div>
        </div>
        <!-- <el-input-number size="mini" :min="1" :max="10" label="描述文字"></el-input-number> -->
      </el-col>

      <!-- <el-col :span="3">{{v.count}}</el-col>
      <el-col :span="2">
        <button type="button" @click="cartService.change(k, 1)">+</button>
      </el-col>-->
    </el-row>
    <p>
      总价：<span class="hot cny">{{orderSum}}</span>
    </p>
    <el-row>
      <el-button @click="createOrder" type="primary" size="mini">结算</el-button>
    </el-row>
  </el-card>
</template>

<script>
import cartService from "../service/cart";
import ProductThumb from "./ProductThumb";
import { createOrder, orderSum } from "../lib/order";
import { obj2Arr } from "../lib/helper";
import session from "../lib/session";
export default {
  components: { ProductThumb },
  data() {
    return {
      listCart: {},
      cartService
    };
  },
  mounted() {
    // this.listCart = cartService.get();
    cartService.onChange(localCart => (this.listCart = localCart));
    // this.listCart = cartService.get();
    // cartService.change(1, +2);
    // eslint-disable-next-line
    // console.log(this.listCart);
  },
  methods: {
    createOrder() {
      createOrder(this.listCartArr, session.user("id")).then(r => {
        this.$router.push(`/my/order/${r.data.id || ""}`);
        cartService.clear();
      });
    }
  },
  computed: {
    listCartArr() {
      return obj2Arr(this.listCart);
    },
    orderSum() {
      return orderSum(this.listCartArr);
    }
  }
};
</script>

<style scoped>
.cart {
  position: fixed;
  z-index: 20;
  border: 1px solid #666;
  right: 0;
  /* top: 20px; */
  background: #fff;
  max-width: 400px;
}

.el-input-number--mini {
  max-width: 100px;
}

.card-close {
  cursor: pointer;
}

.card-title {
  font-size: 14px;
}

.cart-item {
  margin-bottom: 4px;
}
</style>
