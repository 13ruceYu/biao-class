<template>
  <div>
    <input type="file" @change="onFill">
  </div>
</template>

<script>
import api from "../lib/api";
export default {
  props: ["autoUpload"],
  data() {
    return {
      file: null
    };
  },
  methods: {
    onFill(e) {
      let input = e.target;
      let f = (this.file = input.files[0]);

      if (!f) return;

      let fd = new FormData();
      fd.append("file", f);

      this.$emit("change", f);
      if (this.autoUpload) {
        let fd = new FormData();
        fd.append("file", f);
        api("_file/create", fd).then(r => {
          if (r.success) {
            input.value = "";
            this.$emit("uploadSuccess", r.data);
          } else {
            this.$emit("uploadFail", r);
          }
        });
      }
    }
  }
};
</script>

<style>
</style>
