<template>
  <div class="dropdown">
    <div class="filter">
      <input
        type="search"
        v-model="keyword"
        @focus="visible=true;reset()"
        @blur="hideResult(); $emit('blur')"
        :class="klass"
      >
    </div>
    <div class="list" v-if="visible">
      <div
        class="option"
        v-for="it in result"
        :key="it.id"
        @mousedown="select(it)"
      >{{it[displayBy]}}</div>
    </div>
  </div>
</template>

<script>
import api from "../lib/api";
export default {
  props: ["list", "searchBy", "displayBy", "onSelect", "api", "klass"],
  data() {
    return {
      keyword: "",
      result: [],
      visible: false,
      timer: null
    };
  },
  mounted() {
    // 检查是异步还是同步
    if (this.api) {
      this.filterAsync();
    } else {
      this.result = [...this.list];
    }
  },
  watch: {
    // 监测 keyword 的变化
    keyword() {
      if (this.api) this.debounceFilterAsync();
      else this.filter();
    }
  },
  methods: {
    filter() {
      this.result = this.list.filter(it => {
        return it[this.searchBy].includes(this.keyword);
      });
    },
    select(it) {
      if (it) this.keyword = it[this.displayBy];
      if (!this.onSelect || !it) return;
      this.onSelect(it);
    },
    reset() {
      this.keyword = "";
      this.select(null);
    },
    hideResult() {
      setTimeout(() => {
        this.visible = false;
      }, 1);
    },
    filterAsync() {
      let params = {};
      // 是否有输入，有的话就将param传入
      if (this.keyword)
        params = {
          query: `where("${this.searchBy}" contains "${this.keyword}")`
        };
      // 拿到result的值
      api(this.api, params).then(r => {
        if (r.success) {
          this.result = r.data || [];
        }
      });
    },
    debounceFilterAsync() {
      // 取消异步过滤的抖动
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.filterAsync();
      }, 500);
    }
  }
};
</script>

<style scoped>
.dropdown {
  display: block;
  position: relative;
}

/* .filter input {
  width: 100%;
  border: none;
  outline: none;
} */

.list {
  background: #fff;
  border: 1px solid #555;
  position: absolute;
  width: 100%;
  z-index: 1;
}

.option {
  padding: 0.2em 0.5em;
}

.option:hover {
  background: #ddd;
}
</style>
