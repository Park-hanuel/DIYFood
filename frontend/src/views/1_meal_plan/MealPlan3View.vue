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
      <img src="@/assets/basket.png" alt="식단계획3" height="200" width="200" >
    </div>
    <div style="margin-top: 30px; text-align: center;">
      <h3>3. 새로운 재료 선택</h3>
    </div>
  </div>
  <!-- Content -->
  <section id="content">
    <div style="text-align:center;">
      <h1>새로운 식재료 선택</h1>
      <p>새로 구매하실 식재료를 선택해주세요. 선택하신 재료로 식재료 가격을 계산합니다.</p>
      <div>
        <input type="button" class="btn btn-primary btn-lg btn-custom" value="식량작물">
        <input type="button" class="btn btn-primary btn-lg btn-custom" value="특용작물">
        <input type="button" class="btn btn-primary btn-lg btn-custom" value="채소류">
        <input type="button" class="btn btn-primary btn-lg btn-custom" value="과일류">
        <input type="button" class="btn btn-primary btn-lg btn-custom" value="축산물">
        <input type="button" class="btn btn-primary btn-lg btn-custom" value="수산물">
      </div>
      <table class="table table-light" style="vertical-align: middle;">
        <thead class="table-bordered">
          <tr>
            <th scope="col" style="width:35%">품목</th>
            <th scope="col" style="width:35%">품종</th>
            <th scope="col" style="width:20%">가격</th>
            <th scope="col" style="width:10%">선택</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in itemList" :key="index">
            <td>{{data.itemName}}</td>
            <td>{{data.detailItemCode}}</td>
            <td>{{data.price}}</td>
            <td><button class="btn" @click="[clickBtn(data.id - 1), itemSelection(data.id - 1)]"><img src="" width="25px"></button></td>
          </tr>
        </tbody>
      </table>
      <div>
        <progress id="progress" value="24500" max="30000"></progress>
        <h6>나의 예산 : {{budget}}원, 총 가격 : {{totalCost}}원</h6>
        <h6>{{checkedItem}}</h6>
      </div>
    </div>
    <div id="next-button" style="text-align:center;" >
      <a href="/mealplan/step4">
        <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" onClick="location.href='/mealplan/step4'">
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
      itemList: []
    }
  },
  setup () {},
  created () {
    this.getGroceryData()
  },
  mounted () {},
  unmounted () {},
  methods: {
    getGroceryData () {
      this.$axios.get('http://localhost:3000/grocery').then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.itemList = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
  @import "@/css/styles.css";
  body{background: #f3f3f3;}
  .btn-custom {
    margin-bottom: 20px;
  }
  #progress {
    appearance: none;
    width: 700px;
    height: 30px;
  }
  #progress::-webkit-progress-bar {
      background:#f0f0f0;
      border-radius:10px;
      box-shadow: inset 3px 3px 10px #ccc;
  }
  #progress::-webkit-progress-value {
      border-radius:10px;
      background: #138127;
      background: -webkit-linear-gradient(to right, #d7d000, #699900);
      background: linear-gradient(to right, #d7d000, #699900);

  }
</style>
