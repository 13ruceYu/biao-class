<template>
  <div>
    <img :src="url" alt>
  </div>
</template>

<script>
import { fileUrl } from "../lib/helper";
import holder from "../config/holder";
export default {
  props: ["data"],
  computed: {
    url() {
      let d = this.data;
      let img = d.product_snapshot.main_img;
      if (!img || !img.length) return holder.productMainImg;
      return fileUrl(img[0]);
    }
  }
};
</script>

<style>
</style>
