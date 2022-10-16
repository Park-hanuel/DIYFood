<template>
<div>
  <head>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <div class="home" style="margin-top:29px; margin-bottom: 79px;">
      <header class="masthead" style="margin-top: 0px; padding-top: 8rem; padding-bottom: 8rem; ">
        <div class="container">
          <div style="margin-bottom: 50px">
            <img src="@/assets/logo_white.png" alt="logo" width="70%;">
          </div>
          <div class="masthead-subheading">with DIY Food</div>
          <div class="masthead-heading text-uppercase">Make<br>Your Day<br>Healthier</div>
            <a class="btn btn-primary btn-xl text-uppercase margin-space" href="#MealPlan">더 알아보기</a>
        </div>
      </header>
        <!-- MealPlan-->
        <section class="page-section page-size" id="MealPlan">
          <div class="container">
            <div class="text-center">
              <a href="/mealplan/m">
                  <h2 class="section-heading text-uppercase">Meal Plan</h2>
              </a>
            </div>
            <div class="row text-center">
                <div class="col-md-4">
                    <span class="fa-stack fa-4x">
                        <a href="/mealplan/m">
                            <img src="https://cdn-icons-png.flaticon.com/512/3476/3476015.png" alt="MealPlan" style="width: 120px; height: 120px;">
                        </a>
                    </span>
                    <h4 class="my-3">식단 계획</h4>
                    <p class="text-muted">설정된 예산에 맞춰<br>건강하고 신선한 식단을 추천합니다.</p>
                </div>
            </div>
          </div>
        </section>
        <!-- Recipe-->
        <section class="page-section bg-light" id="Recipe">
            <div class="container">
                <div class="text-center">
                    <a href="/recipe/m">
                        <h2 class="section-heading text-uppercase">Recipe</h2>
                    </a>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <a href="/recipe/m">
                                <img src="https://cdn-icons-png.flaticon.com/512/3565/3565407.png" alt="recipe" style="width: 120px; height: 120px;">
                            </a>
                        </span>
                        <h4 class="my-3">레시피</h4>
                        <p class="text-muted">요리법 목록과 검색 기능을 제공합니다.</p>
                    </div>
                </div>
            </div>
        </section>
        <!-- Ingredient-->
        <section class="page-section" id="Ingredient">
            <div class="container">
                <div class="text-center">
                    <a href="/ingredient/m">
                        <h2 class="section-heading text-uppercase">Ingredients Price</h2>
                    </a>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <a href="/ingredient/m">
                                <img src="https://cdn-icons-png.flaticon.com/512/3514/3514242.png" alt="ingredient_price" style="width: 120px; height: 120px;">
                            </a>
                        </span>
                        <h4 class="my-3">식재료 가격 정보</h4>
                        <p class="text-muted">오늘의 농축수산물 시장 가격을 안내합니다.</p>
                    </div>
                </div>
            </div>
        </section>
        <!--Diet Analysis-->
        <section class="page-section bg-light" id="Trend">
            <div class="container">
                <div class="text-center">
                    <a href="/analysis/survey/m">
                        <h2 class="section-heading text-uppercase">Diet Analysis</h2>
                    </a>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <a href="/analysis/survey/m">
                                <img src="https://cdn-icons-png.flaticon.com/512/1162/1162489.png" alt="price_trend" style="width: 120px; height: 120px;">
                            </a>
                        </span>
                        <h4 class="my-3">식단 분석</h4>
                        <p class="text-muted">회원님의 식단 계획 데이터를 기반으로<br>필수 영양소 섭취를 비교·분석합니다.</p>
                    </div>
                </div>
            </div>
        </section>
        <!-- MyPage-->
        <section class="page-section padding" id="MyPage">
            <div class="container" v-if="this.loggedIn === true">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase" style="color:white ;">My Page</h2>
                    <h3 class="section-subheading " style="color: white ;">마이페이지 | 로그아웃</h3>
                </div>
                <form id="MyPageForm">
                    <div class="row align-items-stretch mb-5">
                        <div class="text-center">
                            <button class="btn btn-primary btn-xl text-uppercase btn-mobile" type="button" onclick="location.href='/user/mypage/m'">My Page</button>
                        </div>
                        <div class="text-center">
                            <button class="btn btn-primary btn-xl text-uppercase btn-mobile" type="button" @click="logOut()">Log Out</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="container" v-else>
                <div class="text-center">
                    <h2 class="section-heading text-uppercase" style="color:white ;">My Page</h2>
                    <h3 class="section-subheading " style="color: white ;">로그인 | 회원가입</h3>
                </div>
                <form id="MyPageForm">
                    <div class="row align-items-stretch mb-5">
                        <div class="text-center">
                            <button class="btn btn-primary btn-xl text-uppercase btn-mobile" type="button" onclick="location.href='/user/login/m'">Log In</button>
                        </div>
                        <div class="text-center">
                            <button class="btn btn-primary btn-xl text-uppercase btn-mobile" type="button" onclick="location.href='/user/signup/m'">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <!-- Footer-->
        <footer class="footer py-4 footer-custom">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 text-lg-start">Copyright &copy; DIY Food 2022</div>
                </div>
            </div>
        </footer>
        <div>
            <button class="btn-up-m" @click="upClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130906.png" width="20px"></button>
            <button class="btn-down-m" @click="downClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130907.png" width="20px"></button>
        </div>
    </div>
  </body>
</div>

</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {},
  props: {
    msg: String
  },
  computed: {
    cookie () {
      return document.cookie
    }
  },
  data () {
    return {
      loggedIn: null,
      mobile: false
    }
  },
  created () {
    this.isLogined()
    this.mobileCheck()
  },
  methods: {
    isLogined () {
      this.$axios.get('http://localhost:3000/islogin', { withCredentials: true }).then(response => {
        this.loggedIn = response.data
        console.log(this.loggedIn)
      }).catch(error => {
        console.log(error)
      })
    },
    logOut () {
      this.$axios.get('http://localhost:3000/user/logout', { withCredentials: true }).then(response => {
        location.href = '/'
      }).catch(error => {
        console.log(error)
      })
    },
    upClick () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    downClick () {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    },
    mobileCheck () {
      if (window.innerWidth <= 600) {
        this.mobile = true
      } else {
        location.href = '/'
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
.btn-mobile {
  padding: 10px;
  width: 150px;
  height: 60px;
  margin-bottom: 15px;
}
.footer-custom {
  background-color: #323232;
  color: rgb(208, 208, 208);
}
</style>
