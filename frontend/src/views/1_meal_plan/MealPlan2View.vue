<template>
<body id="page">
  <div>
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
    <aside id="side">
      <div style="text-align: center;">
        <img src="@/assets/freezer.png" alt="식단계획2" height="200" width="200" >
      </div>
      <div style="margin-top: 30px; text-align: center;">
        <h3>2. 보유 재료 선택</h3>
      </div>
    </aside>
    <!-- Content -->
    <section id="content">
      <div style="text-align:center;">
        <h1>기존 보유 재료 선택</h1>
        <p>이미 보관 중인 재료를 선택해주세요. 선택하신 재료는 식재료 가격을 계산할 때 제외됩니다.</p>
        <div>
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="식량작물">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="특용작물">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="채소류">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="과일류">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="축산물">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="수산물">
        </div>
        <table class="table table-light">
          <thead class="table-bordered">
            <tr>
              <th scope="col" style="width:45%">품목</th>
              <th scope="col" style="width:45%">품종</th>
              <th scope="col" style="width:10%">선택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>사과</td>
              <td>사과</td>
              <td><input type="checkbox" name="checkedItem" id=""></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="next-button" style="text-align:center;" >
        <a href="/mealplan/step3">
          <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" onClick="location.href='/mealplan/step3'">
        </a>
      </div>
    </section>
  </div>
</body>

</template>
<script>
export default {
  components: {},
  data () {
    return {
      sampleData: ''
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
</style>
