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
      <!-- 로그인 / 로그아웃 / 회원가입 / 마이페이지 -->
      <nav class="navbar-custom fixed-custom" style="background-color: #aac458;">
        <div>
          <div v-if="cookie">
            <!--cookie가 true일 때 즉, 쿠키가 있다면 보여줄 목록-->
            <button class="btn navbtn-custom" style="margin-right: 70px;" type="button" @click="logOut()">LOG OUT</button>
            <button class="btn navbtn-custom" type="button" onclick="location.href='/user/mypage'">MY PAGE</button>
          </div>
          <div v-else>  <!--쿠키가 없다면 보여줄 목록-->
            <button class="btn navbtn-custom" style="margin-right: 70px;" type="button" onclick="location.href='/user/signup'">SIGN UP</button>
            <button class="btn navbtn-custom" type="button" onclick="location.href='/user/login'">LOG IN</button>
          </div>
        </div>
      </nav>
      <!-- Navigation Bar -->
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" style="background-color: rgb(30, 30, 30);">
        <div class="container">
          <a class="navbar-brand" href="/"><img src="@/assets/logo_white.png" alt="집밥김선생" style="width:210px; height:70px;"/></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fas fa-bars ms-1"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                  <li class="nav-item"><a class="nav-link" href="/mealplan">Meal Plan</a></li>
                  <li class="nav-item"><a class="nav-link" href="/recipe">Recipe</a></li>
                  <li class="nav-item"><a class="nav-link" href="/ingredient">Ingredients Price</a></li>
                  <li class="nav-item"><a class="nav-link" href="/analysis/survey">Diet Analysis</a></li>
              </ul>
          </div>
        </div>
      </nav>
    </body>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {},
  computed: {
    cookie () {
      return document.cookie
    }
  },
  methods: {
    logOut () {
      this.$axios.get('http://localhost:3000/user/logout').then(response => {
        location.href = '/'
        this.deleteCookie('connect.sid')
        location.href = '/'
      }).catch(error => {
        console.log(error)
      })
    },
    deleteCookie (name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    },
    click () {
      if (this.cookie) {
        location.href = '/analysis/survey'
      } else {
        alert('로그인이 필요한 기능입니다.')
        location.href = 'user/login'
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
</style>
