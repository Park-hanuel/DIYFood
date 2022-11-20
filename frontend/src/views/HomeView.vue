<template>
<div>
  <head>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <div class="home">
      <header class="masthead">
          <div class="container">
              <div class="masthead-subheading">with DIY Food</div>
              <div class="masthead-heading text-uppercase">Make Your Day Healthier</div>
              <a class="btn btn-primary btn-xl text-uppercase margin-space font-gg" href="/mealplan">식단 추천받기</a>
              <a class="btn btn-primary btn-xl text-uppercase margin-space font-gg" href="/analysis">식단 등록하기</a>
          </div>
      </header>
      <HelloWorld></HelloWorld>
    </div>
  </body>
</div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  created () {
    this.mobileCheck()
  },
  data () {
    return {
      mobile: false
    }
  },
  methods: {
    mobileCheck () {
      if (window.innerWidth <= 600) {
        this.mobile = true
        location.href = '/m'
      }
    }
  }
}
/* eslint-disable */
</script>

<style>
@import "../css/styles.css";
.margin-space {
  margin-top: 60px;
}
</style>
