import {
  call as valee
} from "../lib/valee";
import api from "../lib/api";

export default {
  mounted() {
    this.read();
  },
  data() {
    return {
      list: [],
      form: {},
      formOriginal: {},
      errors: {},
      ui: {
        formVisible: false
      },
      total: 0,
      readParam: {
        limit: 4,
        page: 1,
      },
    }
  },
  methods: {
    flip(page) {
      this.readParam.page = page;
      this.read();
    },
    createOrUpdate() {
      let f = this.form;
      let action;

      if (!this.validateForm()) return;

      if (f.id) action = "update";
      else action = "create";

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
      this.errors = {};
    },
    validateForm() {
      let rules = this.rules;
      let f = this.form;
      let isUpdate = !!f.id;

      let valid = true;

      for (let field in rules) {
        // field是 nickname, phone, password

        // 先验证是否是更新，如果是，并且值没有变化，则跳过验证
        if (isUpdate && f[field] === this.formOriginal[field]) continue;

        if (!this.validateField(field)) valid = false;
      }

      return valid;
    },

    validateField(field) {
      let value = this.form[field];
      let fieldValid = true;

      // 先拿到field对应的所有的规则
      // 如 field为 nickname 下所有的规则为
      // {unique: {...}, required: {...}, ...}
      let rules = this.rules[field];

      for (let key in rules) {
        // 单条rule为
        let rule = rules[key];
        let params = rule.params || []; // 规则传参

        let valid = valee(key, value, ...params);

        // 当验证结果直接为布尔值时，则直接将错误存入errors内
        if (typeof valid == "boolean") {
          this.afterValidate(field, key, valid);
          if (!valid) fieldValid = false;
        } else {
          // 异步验证结果处理
          valid.then(r => {
            this.afterValidate(field, key, r);
            if (!r) fieldValid = false;
          });
        }
      }

      return fieldValid;
    },

    afterValidate(field, rule, valid) {
      // 拿到对应的错误对象
      let fieldObj = this.errors[field];

      // 如果不存在，就初始化一个空对象
      if (!fieldObj) fieldObj = this.$set(this.errors, field, {});

      // 将对象中对应的验证规则设为valee返回的结果
      // 如：fieldObj['lengthBetween'] = true;
      this.$set(fieldObj, rule, !valid);
    },

    handleEdit(index, row) {
      this.formOriginal = row;
      this.form = {
        ...row
      };
    },
    handleDelete(index) {
      if (!confirm("确定删除？")) return;
      api("user/delete", {
        id: index
      }).then(r => {
        if (r.success) {
          this.read();
        }
      });
    },
    read() {
      api(`${this.model}/read`, this.readParam).then(r => {
        this.list = r.data;
        this.total = r.total;
      });
    }
  },
};