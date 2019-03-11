<template>
  <div class="dropdown">
    <div class="filter">
      <input type="search" v-model="keyword">
    </div>
    <div class="list" v-for="it in result" :key="it.id" @click="select(it)">{{it[displayBy]}}</div>
  </div>
</template>

<script>
export default {
  props: ["list", "searchBy", "displayBy", "onSelect"],
  data() {
    return {
      keyword: "",
      result: []
    };
  },
  watch: {
    keyword(n, o) {
      this.filter();
    }
  },
  methods: {
    filter() {
      this.result = this.list.filter(it => {
        return it[this.searchBy].includes(this.keyword);
      });
    },
    select(it) {
      if (!this.onSelect) return;
      this.onSelect(it);
    }
  }
};
</script>

<style scoped>
.dropdown {
  display: block;
}

.filter input {
  width: 100%;
}
</style>
