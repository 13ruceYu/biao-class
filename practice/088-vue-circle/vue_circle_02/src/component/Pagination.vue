<template>
  <div class="pagination">
    <div class="btn-group">
      <button class="item" @click="change(1)">首页</button>
      <button class="item" @click="prev">上一页</button>
    </div>
    <div class="btn-group">
      <button
        v-for="it in totalPage"
        :key="it.id"
        :class="it == active ? 'active' : ''"
        @click="onClick(it)"
        v-show="Math.abs(it-active) <= radius"
      >{{it}}</button>
    </div>
    <div class="btn-group">
      <button class="item" @click="next">下一页</button>
      <button class="item" @click="change(total)">末页</button>
    </div>
  </div>
</template>

<script>
export default {
  // props: ["limit", "total", "onChange"],
  props: {
    limit: {},
    total: {},
    radius: {
      default: 2,
    },
    onChange:{},
  },
  data() {
    return {
      active: 1
    };
  },
  mounted() {},
  methods: {
    onClick(page) {
      this.change(page);
    },
    change(page) {
      if (page > this.total) page = this.total;

      if (page < 1) page = 1;
      this.active = page;
      this.onChange && this.onChange(page);
    },
    prev() {
      this.change(this.active - 1);
    },
    next() {
      this.change(this.active + 1);
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.limit);
    }
  }
};
</script>

<style scoped>
.pagination {
  margin: 0.5em 0;
}

.pagination > * {
  display: inline-block;
  margin-right: 0.5em;
}

.pagination > *:last-child {
  margin-right: 0;
}

.active {
  background: #000;
  color: #fff;
  border-color: #000;
}
</style>
