import {
  call as valee
} from "../lib/valee";
import api from "../lib/api";
export default {
  data() {
    return {
      ui: {
        formVisible: true
      },
      list: [],
      form: {},
      formOriginal: null,
      errors: {},
      total: 1,
      readParam: {
        limit: 2,
        page: 1
      },
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    changePage(page) {
      this.readParam.page = page;
      this.read();
    },
    read() {
      api(`${this.model}/read`, this.readParam).then(r => {
        if (r.success) {
          this.list = r.data;
          this.total = r.total;
        }
      });
    },
    fill(row) {
      this.ui.formVisible = true;
      this.formOriginal = row;
      this.form = {
        ...row
      };
    },
    createOrUpdate() {
      if (!this.validateForm()) {
        return;
      }

      let f = this.form;

      let action;
      if (f.id) {
        action = "update";
      } else {
        action = "create";
      }

      api(`${this.model}/${action}`, f).then(r => {
        if (r.success) {
          this.read();
          this.resetForm();
        }
      });
    },
    resetForm() {
      this.ui.formVisible = false;
      this.form = {};
      this.errors = [];
    },
    remove(id) {
      if (!confirm("确定删除？")) return;

      api(`${this.model}/delete`, {
        id
      }).then(r => {
        if (r.success) {
          this.read();
        }
      });
    },
    /**
     * 验证表单中所有的属性
     */
    validateForm() {
      let rules = this.rules;
      let valid = true;
      let f = this.form;
      let isUpdate = !!f.id;

      for (let field in rules) {
        // 如果是个更新并且所更新的值完全没有更改，则跳过验证
        if (isUpdate && f[field] === this.formOriginal[field]) {
          continue;
        }
        if (!this.validate(field)) {
          valid = false;
        }
      }

      return valid;
    },
    /**
     * 验证一个属性（如username）
     * @param {string} field e.g. 'username'
     */
    validate(field) {
      let value = this.form[field];
      let fieldValid = true;
      // 先拿到所有的规则
      // {
      //   lengthBetween : {
      //     params : [ 4, 12 ],
      //       msg    : '最小长度需在4至12位之间',
      //   }
      //   required : {
      //       msg    : '此项为必填项',
      //   }
      // }
      let rules = this.rules[field];

      // 检查每一条规则是否合法
      for (let key in rules) {
        // 比如说是lengthBetween
        // {
        //   params : [ 4, 12 ],
        //     msg    : '最小长度需在4至12位之间',
        // }
        let rule = rules[key];
        let params = rule.params || [];

        // 调用biao valee对应的验证函数
        // 比如说valee.lengthBetween('whh', 4, 12)
        let valid = valee(key, value, ...params);

        if (typeof valid == "boolean") {
          this.afterValidate(field, key, valid);
          if (!valid) fieldValid = false;
        } else {
          valid.then(r => {
            this.afterValidate(field, key, r);
            if (!r) fieldValid = false;
          });
        }
      }

      return fieldValid;
    },

    /**
     * 当某一个字段的某一个规则验证完毕时
     * @param {string} field
     * @param {bool} valid
     */
    afterValidate(field, key, valid) {
      // 拿到对应的错误对象
      let fieldObj = this.errors[field];

      // 如果不存在，就初始化一个空对象
      if (!fieldObj) fieldObj = this.$set(this.errors, field, {});

      // 将对象中对应的验证规则设为valee返回的结果
      // 如：fieldObj['lengthBetween'] = true;
      this.$set(fieldObj, key, !valid);
    },

    makeSelect(prop) {
      // let me = this;
      // return function(it) {
      //   me.form[prop] = it.id;
      // }
      // 箭头函数来规避传统方式动态导致的混论
      return it => {
        this.form[prop] = it.id;
      }
    }
  }
};