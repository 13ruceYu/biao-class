<template>
  <div>
    <RegularNav/>
    <div class="container overview">
      <el-row class="" :gutter="10">
        <el-col :span="10" class="preview">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="14" class="text">
          <div class="title">辣辣辣辣条</div>
          <div class="well">
            <!-- <el-row>
              <el-col span="6">价格</el-col>
              <el-col span="12">19.90</el-col>
              <el-col span="6"></el-col>
            </el-row>-->
            <dl class="pair">
              <dt>价格</dt>
              <dd class="hot cny">19.90</dd>
            </dl>
            <dl class="pair">
              <dt>运费</dt>
              <dd class="cny">10.00</dd>
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
                送积分
                <span class="hot">666</span>
              </el-col>
            </el-row>
          </div>
          <div class="option">
            <dl class="pair">
              <dt>口味</dt>
              <dd>
                <span class="pill-option">辣</span>
                <span class="pill-option selected">甜</span>
                <span class="pill-option">酸</span>
              </dd>
            </dl>
          </div>
          <div class="sum">
            <dl class="pair">
              <dt>数量</dt>
              <dd>
                <el-input-number size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
              </dd>
            </dl>
          </div>
          <div>
            <dl class="pair">
              <dt>购买</dt>
              <dd>
                <el-button size="small" type="danger">立即购买</el-button>
                <el-button size="small" type="primary">
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
          <img src="http://placekitten.com/1000/2000" alt="">
        </div>
    </div>
  </div>
</template>

<script>
import RegularNav from "../components/RegularNav";
export default {
  components: {
    RegularNav
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

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
  margin-bottom: .5em;
}

.props .info-item {
  font-size: 0.8em;
}
</style>
