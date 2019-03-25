<template>
  <div>
    <RegularNav/>
    <div class="container overview">
      <el-row class :gutter="10">
        <el-col :span="10" class="preview">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-if="!row.main_img || row.main_img.length==0">
              <img src="https://mock-cdn.biaoyansu.com/MOCK-FILE-5c95c135a4d8b1.00195893.jpeg" alt>
            </el-carousel-item>
            <el-carousel-item v-for="it in row.main_img" :key="it.id">
              <img :src="fileUrl(it)" alt>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="14" class="text">
          <div class="title">{{row.title}}</div>
          <div class="well">
            <!-- <el-row>
              <el-col span="6">价格</el-col>
              <el-col span="12">19.90</el-col>
              <el-col span="6"></el-col>
            </el-row>-->
            <dl class="pair">
              <dt>价格</dt>
              <dd class="hot cny">{{row.price}}</dd>
            </dl>
            <dl class="pair">
              <dt>运费</dt>
              <dd class="cny">{{row.shipping_fee}}</dd>
            </dl>
          </div>
          <div class="sale-info">
            <el-row>
              <el-col :span="8">
                月销量
                <span class="hot">999</span>
              </el-col>
              <el-col :span="8">
                累计评价
                <span class="hot">888</span>
              </el-col>
              <el-col :span="8">
                库存
                <span class="hot">{{row.total}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="option">
            <dl class="pair" v-for="(options,key, index) in row.prop" :key="index">
              <dt>{{key}}</dt>
              <dd>
                <span
                  @click="setProp(key, option)"
                  v-for="(option, index) in options"
                  :key="index"
                  :class="'pill-option ' + (form.prop[key] === option ? 'selected' :'')"
                >{{option}}</span>
              </dd>
            </dl>
          </div>
          <div class="sum">
            <dl class="pair">
              <dt>数量</dt>
              <dd>
                <el-input-number v-model="form.count" size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
              </dd>
            </dl>
          </div>
          <div>
            <dl class="pair">
              <dt>购买</dt>
              <dd>
                <el-button size="small" type="danger" @click="createOrder">立即购买</el-button>
                <el-button size="small" type="primary" @click="addToCart">
                  加入购物车
                  <i class="el-icon-goods el-icon--right"></i>
                </el-button>
              </dd>
            </dl>
          </div>
          <div>
            <dl class="pair">
              <dt>承诺</dt>
              <dd>
                <a href="#" class="anchor">破损包退</a>
                <a href="#" class="anchor">正品保证</a>
                <a href="#" class="anchor">极速退款</a>
                <a href="#" class="anchor">七天无理由退换</a>
                <a href="#" class="anchor">支付方式</a>
              </dd>
            </dl>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container detail">
      <div class="props">
        <el-row :gutter="5">
          <el-col class="info-item" :span="8">生产许可证编号：SC11333019700024</el-col>
          <el-col class="info-item" :span="8">产品标准号：GB/T10782</el-col>
          <el-col class="info-item" :span="8">厂名：杭州郝姆斯食品有限公司</el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col class="info-item" :span="8">厂名：杭州郝姆斯食品有限公司</el-col>
          <el-col class="info-item" :span="8">生产许可证编号：SC11333019700024</el-col>
          <el-col class="info-item" :span="8">产品标准号：GB/T10782</el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col class="info-item" :span="8">品牌: BE＆CHEERY/百草味</el-col>
          <el-col class="info-item" :span="8">包装方式: 包装</el-col>
          <el-col class="info-item" :span="8">食品添加剂：见包装</el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col class="info-item" :span="8">包装方式: 包装</el-col>
          <el-col class="info-item" :span="8">生产许可证编号：SC11333019700024</el-col>
          <el-col class="info-item" :span="8">产品标准号：GB/T10782</el-col>
        </el-row>
      </div>
      <div class="content">
        <div v-for="(it, index) in row.detail" :key="index">
          <div v-if="it.type === 'text'">{{it.value}}</div>
          <div v-else>
            <img :src="fileUrl(it.value)" :alt="it.value.name">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
import session from "../lib/session";
import { fileUrl } from "../lib/helper";
import { createOrder } from "../lib/order";
import RegularNav from "../components/RegularNav";
import cartService from "../service/cart";

export default {
  components: {
    RegularNav
  },
  data() {
    return {
      cartService,
      row: {
        id: null
      },
      form: {
        prop: {},
        count: 1
      }
    };
  },
  mounted() {
    this.row.id = this.$route.params.id;
    this.find();
    // cartService.onChange(localCart => console.log(localCart))
  },
  methods: {
    addToCart() {
      let row = this.row;
      let form = this.form;
      if (!this.validateForm()) return;
      cartService.change(row.id, form.count, row, form.prop);
    },
    setProp(key, value) {
      this.$set(this.form.prop, key, value);
    },
    createOrder() {
      let p = this.row;
      let f = this.form;
      f.product_id = p.id;
      f.product_snapshot = p;

      // let order = {
      //   detail: [f]
      // };
      // order.sum = orderSum(order.detail);
      // order.user_id = session.user("id");

      // if (order.user_id) {
      //   alert("请登录后购买");
      //   return;
      // }

      // console.log(order);

      if (!this.validateForm()) return;

      // api("order/create", order).then(r => {
      //   if (r.success) {
      //     this.$router.push(`/my/order/${r.data.id || ""}`);
      //   }
      // });
      createOrder([f], session.user('id')).then(r => {
          this.$router.push(`/my/order/${r.data.id || ""}`);
      })
    },
    validateForm() {
      if(session.isAdmin()){
        alert('管理员暂不可购买商品');
        return;
      }
      
      if (!this.allPropsChecked()) {
        alert("请选择所有必要的信息");
        return false;
      }

      if (!this.form.count) {
        alert("请选择需要购买的数量");
        return false;
      }

      return true;
    },
    allPropsChecked() {
      let p = this.row.prop;
      for (let key in p) {
        if (!this.form.prop[key]) return false;
      }
      return true;
    },
    fileUrl,
    find() {
      api("product/find", this.row).then(r => {
        this.row = r.data;
        this.normalize();
        // console.log(r);
      });
    },
    normalize() {
      let p = this.row.prop;
      let betterProp = {};

      for (let key in p) {
        let options = p[key];
        betterProp[key] = options.split("|");
      }

      this.$set(this.row, "prop", betterProp);
    }
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
} */

/* .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */

.overview {
  margin-top: 1em;
}

.pair > *:nth-child(odd) {
  font-size: 80%;
}

.overview .hot.cny {
  font-size: 120%;
}

.text > * {
  margin-bottom: 0.8em;
}

.title {
  font-weight: bold;
  font-size: 1.2rem;
}

.sale-info {
  font-size: 0.8em;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  padding: 0.2em 0;
}

.pill-option {
  display: inline-block;
  margin-right: 0.5em;
  padding: 0.2em 0.3em;
  border: 2px solid #888;
  font-size: 90%;
  cursor: pointer;
}

.pill-option.selected {
  border-color: #e10;
}

dd .anchor {
  font-size: 0.75rem;
}

.detail > * {
  margin-bottom: 1em;
}

.props {
  border: 1px solid #ccc;
  padding: 1em;
  color: #888;
}

.props > * {
  margin-bottom: 0.5em;
}

.props .info-item {
  font-size: 0.8em;
}

.option .pair {
  margin-bottom: 0.3em;
}
</style>
