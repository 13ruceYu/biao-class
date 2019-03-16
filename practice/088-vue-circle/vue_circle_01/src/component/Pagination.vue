<template>
  <div class="pagination">
    <div class="btn-group">
      <button class="item" @click="change(1)">首页</button>
      <button class="item" @click="prev">上一页</button>
    </div>
    <div class="btn-group">
      <button
        class="item"
        :class="num==active?'active':''"
        v-for="(num, index) in total"
        :key="index"
        @click="onClick(num)"
      >{{num}}</button>
    </div>
    <div class="btn-group">
      <button class="item" @click="next">下一页</button>
      <button class="item" @click="change(total)">末页</button>
    </div>
  </div>
</template>

<script>
export default {
  // props:{},
  props: ["count", "limit", "onChange"],
  data() {
    return {
      active: 4
    };
  },
  computed: {
    total() {
      return Math.ceil(this.count / this.limit);
    }
  },
  methods: {
    onClick(page) {
      this.page(page);
    },
    change(page) {
      if (page > this.total) page = this.total;
      if (page < 1) page = 1;
      this.active = page;
      if (this.onChange) this.onChange(page);
    },
    prev() {
      this.change(this.active - 1);
    },
    next() {
      this.change(this.active + 1);
    }
  }
};
</script>

<style scoped>
.pagination {
  margin: 0.5em auto;
}

.pagination > * {
  display: inline-block;
  margin-right: 0.5rem;
}

.item.active {
  background: #000;
  color: #fff;
  border: 1px solid #000;
}

.item {
  padding: 2px 6px;
}
</style>
