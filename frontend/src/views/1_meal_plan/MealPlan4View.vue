<template>
<body id="page">
  <!-- Head -->
  <div style="margin-top: 30px; " id="head">
    <span style="margin-left: 100px; font-size:4em; font-weight:500;">
      MEAL PLAN
    </span>
    <span style="margin-left: 20px; font-size:1.5em; font-weight:400;">
      설정된 예산에 맞춰 건강하고 신선한 식단을 추천합니다.
    </span>
  </div>
  <!-- Side -->
  <div id="side">
    <div style="text-align: center;">
      <img src="@/assets/recipe-book.png" alt="식단계획4" height="200" width="200" >
    </div>
    <div style="margin-top: 30px; text-align: center;">
      <h3>4. 레시피 선택</h3>
    </div>
  </div>
  <!-- Content -->
  <section id="content">
    <div style="text-align:center;">
      <h1>레시피 선택</h1>
      <p>선택하신 재료와 예산에 맞춰 다음 레시피를 추천합니다. 레시피를 선택해주세요.</p>
    </div>
    <div name="card">
      <div class="card-custom card-img-custom" style="text-align:center;">
        <h4>비빔밥</h4>
        <img src="@/assets/vicky-ng-8hCcjf2BxTk-unsplash.jpg" alt="">
      </div>
    </div>
    <div id="next-button" style="text-align:center;" >
      <a href="/mealplan/step2">
        <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" onClick="location.href='/mealplan/step2'">
      </a>
    </div>
  </section>
</body>

</template>
<script>
export default {
  components: {},
  data () {
    return {
      budget: 30000,
      totalCost: 20000
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>

<style>
  @import "@/css/styles.css";
  body{background: #f3f3f3;}
  .btn-custom {
    margin-bottom: 20px;
  }
  .card-custom {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 3px 3px 3px 3px lightgrey;
    width: 300px;
    height: 500px;
    border-radius: 1rem;
    padding: 10px;
    text-align: center;
  }
  .card-img-custom {
    position: relative;
    width: 150px;
    height: 150px;
  }
  .card-img-custom img {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 80%;
    height: 80%;
    object-fit: cover;
    margin: auto;
}
</style>
