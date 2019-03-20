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
        <el-table-column prop="title" label="标题" min-width="100"></el-table-column>
        <el-table-column prop="price" label="价格" min-width="100"></el-table-column>
        <el-table-column prop="shipping_fee" label="运费" min-width="100"></el-table-column>
        <el-table-column prop="total" label="库存" min-width="100"></el-table-column>
        <el-table-column prop="$cat.name" label="分类" min-width="100"></el-table-column>
        <el-table-column prop="$brand.name" label="品牌" min-width="100"></el-table-column>
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
export default {
  mixins: [admin],
  components: { Dropdown },
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
            params: [0.001],
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
    removeProp(key){
      this.$delete(this.form.prop, key)
    },
    fillPropForm(key, value){
      this.$set(this.propForm, 'key', key);
      this.$set(this.propForm, 'value', value);
    }
  }
};
</script>

