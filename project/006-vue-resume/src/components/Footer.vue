<template>
  <div class="footer">
    <a href="https://github.com/13ruceYu" target="_blank">
      <font-awesome-icon :icon="['fab','github']"/>
      <span class="brand-name">Github</span>
    </a>
    <a href="https://www.behance.net/bruceyuhond07c" target="_blank">
      <font-awesome-icon :icon="['fab','behance']"/>
      <span class="brand-name">Behance</span>
    </a>
    <span class="copyright">2019 © BRUCE YU</span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 20px;
  padding: 8px 36px;
  display: block;
  width: 100%;
}

.footer > * {
  margin: 0 10px;
  font-size: 1.2rem;
}

.brand-name {
  padding-left: 5px;
}

.copyright {
  float: right;
  color: #999;
}
</style>
