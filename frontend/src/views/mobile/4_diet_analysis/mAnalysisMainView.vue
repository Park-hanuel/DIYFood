<template>
  <body id="page-m" style="text-align: center; margin: 5px 0px 100px;">
    <div>
      <p style="font-size:3em; font-weight:500; line-height:70px;">
        DIET ANALYSIS
      </p>
      <p style="font-size:1.2em; font-weight:400;">
        식단을 분석하고<br>영양소 섭취 상태를 안내합니다.
      </p>
    </div>
    <div class="text-center">
      <a href="#" @click="goToRegisterFood()">
        <div id="content-box">
          <img src="https://cdn-icons-png.flaticon.com/512/1037/1037855.png" alt="" class="img_style">
          <div class="mt-3 font-gg">
            <p class="font-custom">식단 등록하러 가기</p>
          </div>
        </div>
      </a>
      <a href="#" @click="goToAnalysis()" >
        <div id="content-box">
          <img src="https://cdn-icons-png.flaticon.com/512/3703/3703300.png" alt="" class="img_style">
          <div class="mt-3 font-gg">
            <p class="font-custom">식단 분석하러 가기</p>
          </div>
        </div>
      </a>
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
    goToRegisterFood () {
      if (this.loggedIn === true) {
        location.href = '/user/registerfood/m'
      } else {
        alert('로그인이 필요한 기능입니다.')
        location.href = '/user/login/m'
      }
    },
    goToAnalysis () {
      if (this.loggedIn === true) {
        location.href = '/analysis/survey/m'
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
#content-box{
  width: 70%;
  height: 300px;
  background-color:white;
  margin: 4%;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 10px;
  display:inline-block;
  vertical-align:middle;
}
.img_style {
  height: 50%;
  text-align: center;
  margin: 10px;
  margin-top: 30px;
}
a {
  text-decoration: none;
  color:rgb(50, 50, 50)
}
a:hover {
  color: #48a238
}
.font-custom {
  font-weight: 300;
  font-size: 1.5rem;
  margin-top: 30px
}
</style>
