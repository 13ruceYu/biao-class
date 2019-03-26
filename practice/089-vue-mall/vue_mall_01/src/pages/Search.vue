<template>
  <div>
    <div class="nav">
      <div class="container">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="logo">
              <img src="../img/logo.png" alt="logo">
            </div>
          </el-col>
          <el-col :span="12" class="search">
            <form @submit.prevent="reload">
              <el-input v-model="q.keyword" suffix-icon="el-icon-search"></el-input>
            </form>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
    </div>
    <!-- <RegularNav/> -->
    <!-- <div class="container">
      <form class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
        <button type="submit" hidden></button>
      </form>
    </div>-->
    <div class="container">
      <div class="filter">
        <div class="table">
          <el-row>
            <el-col :span="3" class="type">品牌</el-col>
            <el-col :span="21">
              <div class="option">三只松鼠</div>
              <div class="option">百草味</div>
              <div class="option">良品铺子</div>
              <div class="option">周黑鸭</div>
              <div class="option">乐事</div>
              <div class="option">奥利奥</div>
              <div class="option">卫龙</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="type">分类</el-col>
            <el-col :span="21">
              <div class="option">膨化食品</div>
              <div class="option">传统糕点</div>
              <div class="option">肉类即食</div>
              <div class="option">饼干</div>
              <div class="option">豆干零食</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="type">包装方式</el-col>
            <el-col :span="21">
              <div class="option">包装</div>
              <div class="option">散装</div>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="bar">
            <div class="group">
              <el-button-group>
                <el-button @click="setSortBy('id')" size="mini">新品</el-button>
                <el-button @click="setSortBy('price')" size="mini">价格</el-button>
                <el-button @click="setSortBy('sales')" size="mini">销量</el-button>
              </el-button-group>
            </div>
            <div class="group price-limit">
              <el-row>
                <el-col :span="12">
                  <input
                    size="mini"
                    type="number"
                    placeholder="最低价格"
                    v-model="q.minPrice"
                    @keyup="reload"
                  >
                </el-col>
                <el-col :span="12">
                  <input
                    size="mini"
                    type="number"
                    placeholder="最高价格"
                    v-model="q.maxPrice"
                    @keyup="reload"
                  >
                </el-col>
              </el-row>
            </div>
            <div class="group">
              <label>
                <input type="checkbox" @click="toggleBool('freeShipping')" :checked="q.freeShipping">
                包邮
              </label>
              <label>
                <input type="checkbox" @click="toggleBool('hasDiscount')" :checked="q.hasDiscount">                
                折扣
              </label>
              <label>
                <input type="checkbox" @click="toggleBool('cod')" :checked="q.cod">                
                货到付款
              </label>
              <!-- <el-checkbox-group>
                <el-checkbox label="包邮"></el-checkbox>
                <el-checkbox label="折扣"></el-checkbox>
                <el-checkbox label="货到付款"></el-checkbox>
              </el-checkbox-group>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="result">
        <el-row class="card-list" :gutter="5">
          <el-col :span="6" v-for="(it, index) in list" :key="index">
            <ProductCard :data="it"></ProductCard>
          </el-col>
        </el-row>
        <!-- <el-pagination layout="prev, pager, next" :total="1000" class="text-center"></el-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
// import RegularNav from "../components/RegularNav";
import ProductCard from "../components/ProductCard";
import api from "../lib/api";
export default {
  components: {
    // RegularNav
    ProductCard
  },
  data() {
    return {
      formSearch: {},
      q: {}, // 地址传参的暂存区（通过this.$route.query的拷贝）
      list: [],
      total: ""
    };
  },
  mounted() {
    this.q = { ...this.$route.query };
    this.search();
  },
  methods: {
    toggleBool(type) {
      if (this.q[type]) {
        delete this.q[type];
      } else {
        this.q[type] = "1";
      }
      this.reload();
    },
    setSortBy(type) {
      this.q.sortBy = type;
      this.reload();
    },
    reload() {
      this.$router.push({ path: "/search", query: { ...this.q } });
    },
    search() {
      let q = this.q;

      let keywordQuery = `"title" contains "${q.keyword}"`;
      let minPriceQuery = q.minPrice ? `and "price" >= ${q.minPrice}` : "";
      let maxPriceQuery = q.maxPrice ? `and "price" <= ${q.maxPrice}` : "";
      let freeShippingQuery = q.freeShipping ? `and "shipping_fee"=0` : '';
      let hasDiscountQuery = q.hasDiscount ? `and "discount">0` : '';
      let codQuery = q.cod ? `and "cod"=1` : '';

      let query = `where(
        ${keywordQuery}
        ${minPriceQuery}
        ${maxPriceQuery}
        ${freeShippingQuery}
        ${hasDiscountQuery}
        ${codQuery}
      )`;

      let param = {
        query,
        sort_by: [q.sortBy || "id"]
      };

      api("product/read", param).then(r => {
        if (r.success) {
          this.list = r.data;
          this.total = r.total;
        }
      });
    }
  },
  watch: {
    $route: {
      deep: true,
      handler(n) {
        this.q = { ...n.query };
        this.search();
      }
    }
  }
};
</script>

<style scoped>
.search {
  margin: 0.8em 0;
}

.filter .table > * {
  border: 1px solid #bbb;
  border-top-width: 0;
  font-size: 0.8em;
}

.filter .table > *:first-child {
  border-top-width: 1px;
}

.filter .type,
.filter .option {
  display: inline-block;
  padding: 1em;
  cursor: pointer;
}

.filter .type {
  color: #666;
  font-size: 0.9em;
}

.bar {
  margin-top: 0.5em;
}

.bar > * {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5em;
}

.bar .price-limit {
  width: 120px;
}

.bar .el-checkbox {
  margin-right: 10px;
}

.result {
  margin-top: 0.8em;
}

.price-limit input {
  width: 100%;
  font-size: 14px;
}
</style>
