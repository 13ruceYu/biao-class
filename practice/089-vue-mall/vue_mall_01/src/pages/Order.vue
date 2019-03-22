<template>
  <div class="order">
    <h1>我的订单</h1>
    <el-card v-if="$route.params.id" class="card">
      <div slot="header" class="clearfix">
        <span>订单详情</span>
        <router-link to="/my/order/" style="float:right">关闭</router-link>
      </div>
      <div>
        <div class="pair">
          <div>订单号：</div>
          <div>{{form.id}}</div>
        </div>
        <div class="pair">
          <div>总价：</div>
          <div class="cny">{{form.sum}}</div>
        </div>
        <div class="pair">
          <div>付款方式：</div>
          <div>{{lang.payment[form._pay_by] || '-'}}</div>
        </div>
        <div class="pair">
          <div>订单状态：</div>
          <div>{{form._paid ? '已支付' : '未支付'}}</div>
        </div>
        <div v-if="!form._paid">
          <div class="title">请选择支付方式：</div>
          <div>(测试支付费用为0.2元)</div>
          <div class="pay-btn">
            <el-button @click="generatePaymentUrl('wechat')">微信支付</el-button>
            <el-button @click="generatePaymentUrl('alipay')">支付宝</el-button>

            <div v-if="form.$payment">
              <div v-if="form._pay_by === 'wechat'">
                <img :src="form.$payment.qrcode" alt="微信支付二维码" class="qrcode">
                <el-button type="primary" @click="find">支付完毕</el-button>
              </div>
              <div v-else>
                <a :href="form.$payment.url">点击跳转支付宝支付</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="订单号" width="100"></el-table-column>
      <el-table-column prop="sum" label="总价" width="100"></el-table-column>
      <el-table-column label="支付状态" min-width="100">
        <template slot-scope="scope">{{scope.row._paid ? '已支付' : '未支付'}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="110">
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <router-link :to="`/my/order/${scope.row.id}`">详情</router-link>
          </el-button>
          <!-- <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import session from "../lib/session";
import { url } from "../lib/helper";
import api from "../lib/api";
export default {
  data() {
    return {
      list: [],
      form: {},
      lang: {
        payment: {
          alipay: "支付宝",
          wechat: "微信支付"
        }
      }
    };
  },
  mounted() {
    this.read();
    this.form.id = this.$route.params.id;
    if (this.form.id) {
      this.find();
    }
  },
  methods: {
    generatePaymentUrl(type) {
      this.form._pay_by = type;
      api("order/payment/url", {
        id: this.form.id,
        pay_by: type,
        fee: 0.2,
        return_url: url("/#/my/order")
      }).then(r => {
        this.$set(this.form, "$payment", r.data);
      });
    },
    find() {
      api("order/find", { id: this.$route.params.id }).then(r => {
        if (r.success) {
          this.form = r.data;
        }
      });
    },
    read() {
      api("order/read", {
        where: { and: { user_id: session.user("id") } }
      }).then(r => {
        this.list = r.data;
      });
    }
  },
  watch: {
    $route: "find"
  }
};
</script>

<style scoped>
.pair {
  margin-bottom: 15px;
}

.card {
  margin-bottom: 15px;
}

.pay-btn {
  margin: 0.5em 0;
}

.qrcode {
  max-width: 200px;
}


</style>
