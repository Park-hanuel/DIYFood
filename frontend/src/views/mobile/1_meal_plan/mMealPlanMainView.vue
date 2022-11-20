<template>
  <body id="page-m" style="text-align: center;">
    <div style="margin-top: 30px;">
      <p style="font-size:3em; font-weight:500; line-height:70px;" class="font-gg">
        이번주 뭐 먹지?
      </p>
      <p style="font-size:2em; font-weight:500;">
        MEAL PLAN
      </p>
      <p style="font-size:1.2rem; font-weight:400;">
        설정된 기간과 예산에 맞춰<br>건강하고 신선한 식단을 추천합니다.
      </p>
    </div>
    <div style="display: inline-block;">
      <section class="content-box-m">
        <div class="bannercard-div">
          <img src="https://cdn-icons-png.flaticon.com/512/3476/3476015.png" alt="" class="bannercard-img-style">
          <span class="bannercard-text-style">기간, 예산, 재료 설정</span>
        </div>
      </section>
      <section class="content-box-m">
        <div class="bannercard-div">
          <img src="https://cdn-icons-png.flaticon.com/512/3565/3565407.png" alt="" class="bannercard-img-style">
          <span class="bannercard-text-style">추천 레시피 선택</span>
        </div>
      </section>
      <section class="content-box-m">
        <div class="bannercard-div">
          <img src="https://cdn-icons-png.flaticon.com/512/5223/5223850.png" alt="" class="bannercard-img-style">
          <span class="bannercard-text-style">식단 계획 완성</span>
        </div>
      </section>
    </div>
    <div id="next-button" style="text-align:center;" >
      <input type="button" class="btn btn-primary btn-lg next-button" @click="click()" value="START!">
    </div>
  </body>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      sampleData: '',
      loggedIn: false
    }
  },
  computed: {
    cookie () {
      return document.cookie
    }
  },
  setup () {},
  created () {
    this.isLogined()
  },
  mounted () {},
  unmounted () {},
  methods: {
    isLogined () {
      this.$axios.get('http://localhost:3000/islogin', { withCredentials: true }).then(response => {
        this.loggedIn = response.data
        console.log(this.loggedIn)
      }).catch(error => {
        console.log(error)
      })
    },
    click () {
      if (this.loggedIn === true) {
        location.href = '/mealplan/step1/m'
      } else {
        alert('로그인이 필요한 기능입니다.')
        location.href = '/user/login/m'
      }
    }
  }
}
</script>

<style>
body{background: #f9f9f9;}
.content-box-m{
  display: inline-block;
  float: left;
  width: 90%;
  height: 100px;
  background-color:white;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding:10px;
  text-align: left;
  vertical-align: middle;
}
.img_style {
  width: 70%;
  text-align: center;
}
.next-button {
  height: 50px;
  width: 30%;
  border-radius: 10px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-bottom: 120px;
  border: none;
}
</style>
