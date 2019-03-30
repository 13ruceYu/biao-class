<template>
  <div class="admin-cat">
    <h1>商品管理</h1>
    <div class="tool-bar">
      <el-button-group>
        <el-button type="primary" @click="ui.formVisible = !ui.formVisible">创建</el-button>
      </el-button-group>
    </div>
    <div class="modify-form">
      <form @submit="createOrUpdate" v-if="ui.formVisible">
        <h2>添加/修改</h2>
        <label class="input-field">
          <div class="title">标题</div>
          <input type="text" v-model="form.title" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.title" :key="e.id">
              <span v-if="invalid">{{rules.title[e].msg}}</span>
            </div>
          </div>
        </label>
        <label class="input-field">
          <div class="title">价格</div>
          <input type="number" v-model="form.price" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.price" :key="e.id">
              <span v-if="invalid">{{rules.price[e].msg}}</span>
            </div>
          </div>
        </label>
        <label class="input-field">
          <div class="title">运费</div>
          <input type="number" v-model="form.shipping_fee" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.shipping_fee" :key="e.id">
              <span v-if="invalid">{{rules.shipping_fee[e].msg}}</span>
            </div>
          </div>
        </label>
        <label class="input-field">
          <div class="title">库存</div>
          <input type="number" v-model="form.total" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.total" :key="e.id">
              <span v-if="invalid">{{rules.total[e].msg}}</span>
            </div>
          </div>
        </label>
        <label class="input-field">
          <div class="title">销量</div>
          <input type="number" v-model="form.sales" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.sales" :key="e.id">
              <span v-if="invalid">{{rules.sales[e].msg}}</span>
            </div>
          </div>
        </label>
        <label class="input-field">
          <div class="title">折扣</div>
          <input type="number" step="0.01" v-model="form.discount" class="el-input__inner">
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.discount" :key="e.id">
              <span v-if="invalid">{{rules.discount[e].msg}}</span>
            </div>
          </div>
        </label>
        <label class="input-field">
          <div class="title">分类</div>
          <Dropdown
            api="cat/read"
            searchBy="name"
            displayBy="name"
            klass="el-input__inner"
            :onSelect="makeSelect('cat_id')"
          />
          <!-- <input type="text" v-model="form.name" class="el-input__inner"> -->
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.cat_id" :key="e.id">
              <span v-if="invalid">{{rules.cat_id[e].msg}}</span>
            </div>
          </div>
        </label>
        <label class="input-field">
          <div class="title">品牌</div>
          <Dropdown
            api="brand/read"
            searchBy="name"
            displayBy="name"
            klass="el-input__inner"
            :onSelect="makeSelect('brand_id')"
          />
          <!-- <input type="text" v-model="form.name" class="el-input__inner"> -->
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.brand_id" :key="e.id">
              <span v-if="invalid">{{rules.brand_id[e].msg}}</span>
            </div>
          </div>
        </label>

        <label class="input-field">
          <div class="title">独有属性</div>
          <!-- <button type="button" class="el-button">+</button> -->
          <div class="row">
            <input v-model="propForm.key" type="text" class="even" placeholder="名称">
            <input v-model="propForm.value" type="text" class="even" placeholder="可选的值，请用“|”隔开">
            <button @click="addProp" type="button">+</button>
          </div>
          <div class="row" v-for="(value, key, index) in form.prop" :key="index">
            <span>{{key}}</span>：
            <span>{{value}}</span>
            <!-- <input type="text" class="even" placeholder="名称">
            <input type="text" class="even" placeholder="可选的值，请用“|”隔开">-->
            <button type="button" @click="removeProp(key)">删除</button>
            <button type="button" @click="fillPropForm(key,value)">编辑</button>
          </div>
          <div class="error-list">
            <div class="error" v-for="(invalid, e) in errors.total" :key="e.id">
              <span v-if="invalid">{{rules.total[e].msg}}</span>
            </div>
          </div>
        </label>
        <div class="input-field">
          <div class="title">上传主图</div>
          <Uploader :autoUpload="true" @uploadSuccess="singleCoverUploaded"></Uploader>
          <el-row :gutter="3" class="thumbnail">
            <el-col :span="6" v-for="(img, index) in form.main_img" :key="index">
              <img :src="fileUrl(img)" :alt="img.name">
              <div>{{img._original_name}}</div>
              <button type="button" @click="deleteCover(index)">删除</button>
            </el-col>
          </el-row>
        </div>
        <div class="input-field">
          <div class="title">商品详情</div>
          <button type="button" @click="insertDesc('text')">添加文字</button>
          <button type="button" @click="insertDesc('image')">添加图片</button>
          <div>
            <div v-for="(it, index) in form.detail" :key="index" class="segment">
              <button type="button" @click="removeDesc(index)">删除</button>
              <div v-if="it.type === 'text'" class="text">
                <el-input type="textarea" v-model="it.value"></el-input>
              </div>
              <div v-else class="image">
                <Uploader
                  :autoUpload="true"
                  @uploadSuccess="singleDescImageUploaded($event, index)"
                ></Uploader>
                <div v-if="it.value">
                  <img :src="fileUrl(it.value)" alt>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="input-field">
          <div class="title">新品</div>
          <el-switch v-model="form.is_new" active-color="#13ce66" inactive-color="#999"></el-switch>
        </div>
        <div class="input-field">
          <div class="title">热卖</div>
          <el-switch v-model="form.is_hot" active-color="#13ce66" inactive-color="#999"></el-switch>
        </div>
        <div class="input-field">
          <div class="title">货到付款</div>
          <el-switch v-model="form.cod" active-color="#13ce66" inactive-color="#999"></el-switch>
        </div>
        <div class="input-field">
          <div class="title">轮播展示</div>
          <el-switch v-model="form.is_carousel" active-color="#13ce66" inactive-color="#999"></el-switch>
        </div>
        <div class="input-field" v-if="form.is_carousel">
          <div class="title">上传轮播图片</div>
          <Uploader :autoUpload="true" @uploadSuccess="carouselUploaded"></Uploader>
          <img v-if="form.carousel_img" :src="fileUrl(form.carousel_img)">
          <button type="button" @click="deleteCarousel">删除</button>
        </div>
        <button type="submit" class="el-button el-button--primary">提交</button>
        <button type="button" class="el-button" v-if="ui.formVisible==true" @click="resetForm">取消</button>
      </form>
      <!-- <el-form>
        <el-input placeholder="请输入内容"></el-input>
      </el-form>-->
    </div>
    <div class="product-table">
      <h2>列表</h2>
      <p>总商品数：{{total}}</p>
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" min-width="200" fixed="left"></el-table-column>
        <el-table-column prop="price" label="价格" min-width="100"></el-table-column>
        <el-table-column prop="shipping_fee" label="运费" min-width="100"></el-table-column>
        <el-table-column prop="total" label="库存" min-width="100"></el-table-column>
        <el-table-column prop="$cat.name" label="分类" min-width="100"></el-table-column>
        <el-table-column prop="$brand.name" label="品牌" min-width="100"></el-table-column>
        <el-table-column label="主图" min-width="200">
          <template slot-scope="scope">
            <el-row :gutter="2">
              <el-col
                :span="8"
                class="thumbnail"
                v-for="(img, index) in scope.row.main_img"
                :key="index"
              >
                <img :src="fileUrl(img)" :alt="img.name">
                <div class="desc">{{img._original_name}}</div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="110">
          <template slot-scope="scope">
            <el-button @click="fill(scope.row)" type="text" size="small">更新</el-button>
            <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination text-center">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="readParam.limit"
          :current-page="readParam.page"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import admin from "../../mixins/admin";
import Dropdown from "../../components/Dropdown";
import Uploader from "../../components/Uploader";
import { fileUrl } from "../../lib/helper";

export default {
  mixins: [admin],
  components: { Dropdown, Uploader },
  data() {
    return {
      model: "product",
      propForm: {},
      readParam: {
        with: [
          "belongs_to:cat",
          "belongs_to:brand"
          // {
          //   model: "cat",
          //   relation: "belongs_to",
          //   foreign_key: "cat_id",
          //   as: "cat"
          // },
          // {
          //   model: "brand",
          //   relation: "belongs_to",
          //   foreign_key: "brand_id",
          //   as: "brand"
          // }
        ]
      },
      rules: {
        title: {
          required: {
            msg: "标题为必填项"
          }
        },
        price: {
          min: {
            params: [0.001],
            msg: "价格不可小于0"
          },
          required: {
            msg: "价格为必填项"
          }
        },
        cat_id: {
          required: {
            msg: "分类为必填项"
          }
        },
        brand_id: {
          required: {
            msg: "品牌为必填项"
          }
        },
        shipping_fee: {
          min: {
            params: [0],
            msg: "运费不可小于0"
          }
        },
        total: {
          min: {
            params: [0],
            msg: "库存不可小于0"
          }
        }
      }
    };
  },
  methods: {
    carouselUploaded(data) {
      this.$set(this.form, "carousel_img", data);
    },
    deleteCarousel(){
      this.form.carousel_img = {};
    },
    deleteCover(index) {
      this.$delete(this.form.main_img, index);
    },
    fileUrl,
    addProp() {
      let pf = this.propForm;
      let f = this.form;
      let key = pf.key;
      let value = pf.value;

      if (!key || !value) return;

      if (!f.prop) this.$set(f, "prop", {});

      this.$set(f.prop, key, value);
      this.propForm = {};
    },
    removeProp(key) {
      this.$delete(this.form.prop, key);
    },
    fillPropForm(key, value) {
      this.$set(this.propForm, "key", key);
      this.$set(this.propForm, "value", value);
    },
    singleCoverUploaded(data) {
      if (!this.form.main_img) {
        this.$set(this.form, "main_img", []);
        // this.form.main_img = [];
      }
      this.form.main_img.push(data);
    },
    insertDesc(type) {
      if (!this.form.detail) {
        this.$set(this.form, "detail", []);
      }

      this.form.detail.push({ type });
    },
    singleDescImageUploaded(image, index) {
      // console.log(image, detail);
      this.updateDesc(index, image);
    },
    updateDesc(index, value) {
      this.$set(this.form.detail[index], "value", value);
    },
    removeDesc(index) {
      this.form.detail.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.segment {
  border: 1px solid #888;
  margin: 0.5em 0;
}

.thumbnail .desc {
  font-size: 10px;
}
</style>


