<template>
  <el-row>
    <el-col :span="3" class="type">{{propName}}</el-col>
    <el-col :span="21">
      <div
        @click="select(it)"
        :class="'option' + ((selected && (selected.id == it.id)) ? ' active' : '')"
        v-for="(it, index) in data"
        :key="index"
      >{{it.name}}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["data", "propName", "initial"],
  data() {
    return {
      selected: null
    };
  },
  mounted() {
    if(this.initial){
      this.selected = this.initial;
    }
  },
  methods: {
    select(it) {
      if (this.selected == it) {
        this.selected = null;
        this.$emit('clear', it)
        return;
      }
      this.selected = it;
      this.$emit("change", it);
    }
  },
  watch: {
    initial(n){
      this.select(n);
    }
  },
};
</script>

<style scoped>
.filter .type,
.filter .option {
  display: inline-block;
  padding: 1em;
  cursor: pointer;
}

.filter .option.active {
  background: #ecf5ff;
  color: #409eff;
}

.filter .type {
  color: #666;
  font-size: 0.9em;
}
</style>
