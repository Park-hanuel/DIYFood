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
    <div style="text-align:center; display: flex;">
      <!-- Side -->
      <div id="side">
        <div style="text-align: center;">
          <img src="@/assets/check-list.png" alt="식단계획1" height="200" width="200" >
        </div>
        <div style="margin-top: 30px; text-align: center;">
          <h3>1. 조건 설정</h3>
        </div>
      </div>
      <!-- Content -->
      <div id="content">
        <div style="text-align:center;">
          <h1>기간 및 예산 설정</h1>
          <p>식재료 선택과 레시피 추천을 위해 몇가지 조건을 설정합니다. </p>
        </div>
        <div id="mealplan" style="margin-left: 30px; margin-top: 40px;">
          <p></p>
          <form action="/mealplan/step2" method="get">
            <div>
              <h5>1. 하루 식사 횟수를 설정해주세요.</h5>
              <label class="margin_left"><input type="radio" class="form-check-input" value=1 v-model="number">  한 끼</label>
              <label class="margin_left"><input type="radio" class="form-check-input" value=2 v-model="number">  두 끼</label>
              <label class="margin_left"><input type="radio" class="form-check-input" value=3 v-model="number">  세 끼</label>
            </div>
            <p></p>
            <h5>2. 예산을 설정해주세요.</h5>
            <label class="margin_left">
              <input type="number" min="1" max="30" v-model="budget">  만원 이내
              <span style="margin-left:5px; color: gray;">(1인분 기준)</span>
            </label>
            <p></p>
            <div>
              <h5>3. 날짜를 설정해주세요.</h5>
                <label class="margin_left"><input type="date" v-model="date"> </label>
                <span style="margin-left:5px; color: gray;">(식재료 가격은 최신 데이터를 기준으로 계산됩니다.)</span>
            </div>
            <p></p>
            <div>
              <h5>4. 지역을 설정해주세요.</h5>
              <select class="margin_left">
                  <option value="">지역</option>
                  <option value="seoul">서울</option>
              </select>
              <span style="margin-left:5px; color: gray;">(서울 외 지역은 추후 지원 예정입니다.)</span>
            </div>
            <div style="text-align:center;" >
              <a href="/mealplan/step2">
                <button class="btn btn-primary btn-lg next-button text-uppercase" @click="submitSetting()">NEXT</button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</body>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      number: 1,
      budget: 1,
      date: ''
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    // localStorage에 조건값 저장
    submitSetting () {
      localStorage.setItem('number', this.number) // 레시피 선택 때 필요
      localStorage.setItem('budget', this.budget + '0000') // 식재료 선택 때 필요
      localStorage.setItem('date', this.date) // 식단 계획 완성 때 필요
    }
  }
}
</script>
<style>
  @import "@/css/styles.css";
  body{background: #f3f3f3;}
</style>
