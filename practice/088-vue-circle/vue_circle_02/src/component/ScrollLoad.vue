<template>
  <div>
    <span v-if="noMore">没有更多了</span>
    <button v-else class="main" @click="next()">{{mainText}}</button>
  </div>
</template>

<script>
export default {
  props: ["page", "totalPage"],
  mounted() {
    this.current = this.page || 1;
    this.bindScroll();
  },
  data() {
    return {
      current: 1,
      docHeight: 0,
      mainText: "加载更多",
      noMore: false
    };
  },
  methods: {
    next() {
      this.updateDocHeight();
      this.$emit("flip", ++this.current);
    },
    bindScroll() {
      window.addEventListener("scroll", () => {
        if (this.current >= this.totalPage) {
          this.noMore = true;
          return;
        }
        if (this.calcRemain() < 20) {
          if (this.getDocHeight() == this.docHeight) {
            this.mainText = "加载中...";
            return;
          }
          this.mainText = "加载更多";
          this.next();
        }
      });
    },
    getDocHeight() {
      return document.documentElement.scrollHeight;
    },
    updateDocHeight() {
      this.docHeight = this.getDocHeight();
    },
    calcRemain() {
      let html = document.documentElement;
      let htmlHeight = html.scrollHeight;
      let windowHeight = window.innerHeight;
      let scrollTop = html.scrollTop;
      let result = htmlHeight - windowHeight - scrollTop;
      return result;
    }
  }
};
</script>

<style scoped>
button {
  width: 100%;
}
</style>
