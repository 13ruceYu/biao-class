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
          <FilterProp
            @change="setPropFilter($event, 'brand_id')"
            @clear="removePropFilter('brand_id')"
            propName="品牌"
            :data="listBrand"
            :initial="filterRestore.brand_id"
          ></FilterProp>
          <FilterProp
            @change="setPropFilter($event, 'cat_id')"
            @clear="removePropFilter('cat_id')"
            propName="分类"
            :data="listCat"
            :initial="filterRestore.cat_id"
          ></FilterProp>
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
                <input
                  type="checkbox"
                  @click="toggleBool('freeShipping')"
                  :checked="q.freeShipping"
                >
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
import FilterProp from "../components/search/FilterProp";
import api from "../lib/api";
import { capitalize } from "../lib/helper";
export default {
  components: {
    // RegularNav
    ProductCard,
    FilterProp
  },
  data() {
    return {
      formSearch: {},
      q: {}, // 地址传参的暂存区（通过this.$route.query的拷贝）
      list: [],
      total: "",
      listCat: [],
      listBrand: [],
      filterRestore: {
        // brand_id: {}
      }
    };
  },
  mounted() {
    this.q = { ...this.$route.query };
    this.read("cat");
    this.read("brand");
    this.search();
    this.restoreSelectedPropFilter("brand", this.q["@brand_id"], "brand_id");
    this.restoreSelectedPropFilter("cat", this.q["@cat_id"], "cat_id");
  },
  methods: {
    /**
     * 通过属性过滤器的已有传参找到对应的数据
     *
     * 如： 'http://...?...&@cat_id=1'
     * 就应该找到id = 1的那条cat数据，并将其存入this.filterRestore内部，
     * 然后将其传入<FilterProp/>组件中的initial属性中
     * <FilterProp :initial="filterReStore.cat_id"></FilterProp>
     */
    restoreSelectedPropFilter(model, id, filterName) {
      if (!id) return;
      api(`${model}/find`, { id }).then(r => {
        this.$set(this.filterRestore, filterName, r.data);
        // this.filterRestore[filterName] = r.data;
      });
      // this.forEachPropFilter((v, k) => {

      // })
    },
    setPropFilter(it, prop) {
      this.q["@" + prop] = it.id;
      this.reload();
    },
    removePropFilter(prop) {
      delete this.q["@" + prop];
      this.reload();
    },
    read(type) {
      api(`${type}/read`).then(r => {
        if (r.success) {
          this["list" + capitalize(type)] = r.data;
        }
      });
    },
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
    forEachPropFilter(fn) {
      // 从 q 里过滤 propFilter
      let q = this.q;
      for (let key in q) {
        if (!key.startsWith("@")) continue;

        fn(q[key], key);

        // let prop = key.slice(1);
        // propFilterQuery += ` and "${prop}" = "${q[key]}" `;
      }
    },
    search() {
      let q = this.q;

      let keywordQuery = `"title" contains "${q.keyword}"`;
      let minPriceQuery = q.minPrice ? `and "price" >= ${q.minPrice}` : "";
      let maxPriceQuery = q.maxPrice ? `and "price" <= ${q.maxPrice}` : "";
      let freeShippingQuery = q.freeShipping ? `and "shipping_fee"=0` : "";
      let hasDiscountQuery = q.hasDiscount ? `and "discount">0` : "";
      let codQuery = q.cod ? `and "cod"=1` : "";
      let propFilterQuery = "";

      // // 从 q 里过滤 propFilter
      // for (let key in q) {
      //   if (!key.startsWith("@")) continue;

      //   let prop = key.slice(1);
      //   propFilterQuery += ` and "${prop}" = "${q[key]}" `;
      // }

      this.forEachPropFilter((value, key) => {
        let prop = key.slice(1);
        propFilterQuery += ` and "${prop}" = "${value}" `;
      });

      let query = `where(
        ${keywordQuery}
        ${minPriceQuery}
        ${maxPriceQuery}
        ${freeShippingQuery}
        ${hasDiscountQuery}
        ${codQuery}
        ${propFilterQuery}
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
