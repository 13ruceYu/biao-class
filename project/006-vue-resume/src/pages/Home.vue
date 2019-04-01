<template>
  <div class="home">
    <b-container>
      <b-row align-v="center">
        <b-col md="6" sm="12">
          <div class="slogan">Hello World_</div>
        </b-col>
        <b-col md="6" sm="12" class="text-center">
          <router-link to="/frontend">
            <div class="skill-box">
              <span class="skill-name">前端开发</span>
            </div>
          </router-link>
          <router-link to="/design">
            <div class="skill-box">
              <span class="skill-name">平面设计</span>
            </div>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home {
  margin-top: 200px;
  margin-bottom: 300px;
}

.slogan {
  font-weight: bold;
  font-size: 5em;
}

.skill-box {
  margin: 30px auto;
  box-shadow: 0px 5px 20px 0px rgba(75, 79, 124, 0.1);
  width: 390px;
  height: 120px;
}

.skill-box .skill-name {
  line-height: 120px;
  font-size: 1.8em;
}


</style>
