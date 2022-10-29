<template>
  <div>
    <!-- MENU BAR -->
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <title>집밥김선생</title>
      <!-- Google fonts-->
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <div>
        <!-- 모바일 메뉴 -->
        <div v-if="mobile">
          <!-- 로그인 / 로그아웃 / 회원가입 / 마이페이지 -->
          <nav class="navbar-custom fixed-custom" style="background-color: #aac458;">
            <div>
              <div style="float: left;">
                <button class="btn navbtn-custom" type="button" onclick="location.href='/'">DIY FOOD</button>
              </div>
              <div v-if="loggedIn">
                <!--cookie가 true일 때 즉, 쿠키가 있다면 보여줄 목록-->
                <button class="btn navbtn-custom" type="button" @click="logOut()">LOG OUT</button>
                <button class="btn navbtn-custom" type="button" onclick="location.href='/user/mypage/m'">MY PAGE</button>
              </div>
              <div v-else>  <!--쿠키가 없다면 보여줄 목록-->
                <button class="btn navbtn-custom" type="button" onclick="location.href='/user/signup/m'">SIGN UP</button>
                <button class="btn navbtn-custom" type="button" onclick="location.href='/user/login/m'">LOG IN</button>
              </div>
            </div>
          </nav>
          <nav class="navbar-mobile fixed-bottom">
            <div>
              <ul style="vertical-align:middle;">
                <li class="navbtn-mobile">
                  <a class="navbtn-mlink" href="/mealplan/m">
                    <img src="https://cdn-icons-png.flaticon.com/512/567/567014.png" alt="" width="45%;" style="filter: invert(100%);">
                    <div><span style="font-size: 0.8rem">식단 계획</span></div>
                  </a>
                </li>
                <li class="navbtn-mobile">
                  <a class="navbtn-mlink" href="/analysis/survey/m">
                    <img src="https://cdn-icons-png.flaticon.com/512/2889/2889577.png" alt="" width="45%;" style="filter: invert(100%);">
                    <div><span style="font-size: 0.8rem">식단 분석</span></div>
                  </a>
                </li>
                <li class="navbtn-mobile">
                  <a class="navbtn-mlink" href="/m">
                    <img src="https://cdn-icons-png.flaticon.com/512/2764/2764007.png" alt="" width="70%;" style="filter: invert(100%); margin-bottom: 15%;">
                  </a>
                </li>
                <li class="navbtn-mobile" style="float:right;">
                  <a class="navbtn-mlink" href="/recipe/m">
                    <img src="https://cdn-icons-png.flaticon.com/512/3363/3363460.png" alt="" width="45%;" style="filter: invert(100%);">
                    <div><span style="font-size: 0.8rem">레시피</span></div>
                  </a>
                </li>
                <li class="navbtn-mobile" style="float:right;">
                  <a class="navbtn-mlink" href="/ingredient/m">
                    <img src="https://cdn-icons-png.flaticon.com/512/6978/6978688.png" alt="" width="45%;" style="filter: invert(100%);">
                    <div><span style="font-size: 0.8rem;">식재료 가격</span></div>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <!-- 웹페이지 메뉴 -->
        <div v-else>
          <!-- 로그인 / 로그아웃 / 회원가입 / 마이페이지 -->
          <nav class="navbar-custom fixed-custom" style="background-color: #aac458;">
            <div>
              <div style="float: left;">
                <button class="btn navbtn-custom" type="button" onclick="location.href='/'">DIY FOOD</button>
              </div>
              <div v-if="loggedIn">
                <!--cookie가 true일 때 즉, 쿠키가 있다면 보여줄 목록-->
                <button class="btn navbtn-custom" type="button" @click="logOut()">LOG OUT</button>
                <button class="btn navbtn-custom" type="button" onclick="location.href='/user/mypage'">MY PAGE</button>
              </div>
              <div v-else>  <!--쿠키가 없다면 보여줄 목록-->
                <button class="btn navbtn-custom" type="button" onclick="location.href='/user/signup'">SIGN UP</button>
                <button class="btn navbtn-custom" type="button" onclick="location.href='/user/login'">LOG IN</button>
              </div>
            </div>
          </nav>
          <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" style="background-color: rgb(30, 30, 30);">
            <div class="container-xxl">
              <a class="navbar-brand" href="/"><img src="@/assets/logo_white.png" alt="집밥김선생" style="width:210px; height:70px; margin-left: 15px;"/></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fas fa-bars ms-1"></i>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive" style="margin-right: 15px">
                  <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                      <li class="nav-item"><a class="nav-link" href="/mealplan">Meal Plan</a></li>
                      <li class="nav-item"><a class="nav-link" href="/recipe">Recipe</a></li>
                      <li class="nav-item"><a class="nav-link" href="/ingredient">Ingredients Price</a></li>
                      <li class="nav-item"><a class="nav-link" href="/analysis">Diet Analysis</a></li>
                  </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </body>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {
    this.isLogined()
    this.mobileCheck()
  },
  computed: {
    cookie () {
      return document.cookie
    }
  },
  data () {
    return {
      loggedIn: false,
      mobile: false
    }
  },
  methods: {
    async isLogined () {
      try {
        const response = await this.$axios.get('http://localhost:3000/islogin', { withCredentials: true })
        this.loggedIn = response.data
      } catch (err) {
        location.reload()
      }
    },
    async logOut () {
      try {
        await this.$axios.get('http://localhost:3000/user/logout', { withCredentials: true })
        location.href = '/'
      } catch (err) {
        alert('다시 시도해주세요.')
      }
    },
    click () {
      if (this.loggedIn) {
        location.href = '/analysis/survey'
      } else {
        alert('로그인이 필요한 기능입니다.')
        location.href = 'user/login'
      }
    },
    mobileCheck () {
      if (window.innerWidth <= 600) {
        this.mobile = true
        console.log('mobile')
      }
    }
  }
}
</script>
<style>
@import "@/css/styles.css";
.navbtn-custom {
  color: #000000;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  height: 100%;
  float: right;
  font-size: 80%;
  align-items: center;
}
.navbtn-custom:hover {
  color: #ffffff;
}
.fixed-custom {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
.navbar {
  height: 100px;
}
.navbar-custom {
  height: 30px;
}
.navbar-mobile{
  height: 85px;
  width: 100%;
  background-color: rgb(30, 30, 30);
}
.navbtn-mobile {
  margin-left:none;
  width: 20%;
  float: left;
  text-align: center;
}
.navbtn-mlink {
  color: white;
  text-decoration: none;
}
ul {
  padding-left: 0;
  list-style:none;
}
</style>
