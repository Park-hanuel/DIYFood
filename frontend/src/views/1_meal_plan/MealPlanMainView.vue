<template>
  <body id="page" style="text-align: center;">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        MEAL PLAN
      </p>
      <p style="font-size:1.5em; font-weight:400;">
        설정된 예산에 맞춰 건강하고 신선한 식단을 추천합니다.
      </p>
    </div>
    <div style="display: inline-block;">
      <section id="content-box" style="margin-left:50px">
        <img src="https://cdn-icons-png.flaticon.com/512/3476/3476015.png" alt="" class="img_style">
        <div style="margin-top:30px;">
          <p>기간, 예산, 재료를<br>설정하고</p>
        </div>
      </section>
      <section id="content-box">
        <img src="https://cdn-icons-png.flaticon.com/512/3565/3565407.png" alt="" class="img_style">
        <div style="margin-top:30px;" >
          <p>추천 레시피를<br>선택해서</p>
        </div>
      </section>
      <section id="content-box">
        <img src="https://cdn-icons-png.flaticon.com/512/5223/5223850.png" alt="" class="img_style">
        <div style="margin-top:30px;">
          <p>식단 계획을<br>완성합니다.</p>
        </div>
      </section>
      <div id="next-button" style="text-align:center;" >
        <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" @click="click()" value="START!">
      </div>
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
  computed: {
    cookie () {
      return document.cookie
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    click () {
      if (this.cookie) {
        location.href = '/mealplan/step1'
      } else {
        alert('로그인이 필요한 기능입니다.')
        location.href = '/user/login'
      }
    }
  }
}
</script>

<style>
body{background: #f3f3f3;}
#content-box{
  float: left;
  width: 200px;
  height: 300px;
  background-color:white;
  margin-right: 50px;
  margin-top: 10px;
  margin-bottom: 0px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding-top: 30px;
  padding-bottom: 10px;
}
.img_style {
  height: 150px;
  width: 150px;
  text-align: center;
}
.next-button {
  height: 50px;
  width: 20%;
  border-radius: 10px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  border: none;
}
</style>
