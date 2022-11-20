<template>
    <body>
      <!-- MealPlan-->
        <section class="page-section" id="MealPlan">
          <div class="container">
            <div class="text-center">
              <a href="/mealplan">
                  <h2 class="section-heading text-uppercase">Meal Plan</h2>
              </a>
            </div>
            <div class="row text-center">
                <div class="col-md-4">
                    <span class="fa-stack fa-4x">
                        <a href="/mealplan">
                            <img src="https://cdn-icons-png.flaticon.com/512/3476/3476015.png" alt="MealPlan" style="width: 120px; height: 120px;">
                        </a>
                    </span>
                    <h4 class="my-3">이번주 뭐 먹지?</h4>
                    <p class="text-muted">설정된 예산에 맞춰 건강하고 신선한 식단을 계획합니다.</p>
                </div>
            </div>
            <div class="row">
                <div class="mb-4">
                    <!-- MealPlan Banner-->
                    <div class="MealPlan-Banner"  style="text-align : center;">
                        <img src="@//assets/mealplan_banner.png" alt="" style="max-width: 50%; height: auto;">
                    </div>
                </div>
            </div>
          </div>
        </section>
        <!-- Recipe-->
        <section class="page-section bg-light" id="Recipe">
            <div class="container">
                <div class="text-center">
                    <a href="/recipe">
                        <h2 class="section-heading text-uppercase">Recipe</h2>
                    </a>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <a href="/recipe">
                                <img src="https://cdn-icons-png.flaticon.com/512/3565/3565407.png" alt="recipe" style="width: 120px; height: 120px;">
                            </a>
                        </span>
                        <h4 class="my-3">레시피</h4>
                        <p class="text-muted">요리법 목록과 검색 기능을 제공합니다.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-4">
                        <!-- Recipe item 1-->
                        <div class="Recipe-item" style="text-align : center;">
                            <img src="@/assets/recipe_banner.png" alt="" style="max-width: 70%; height: auto;">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Ingredient-->
        <section class="page-section" id="Ingredient">
            <div class="container">
                <div class="text-center">
                    <a href="/ingredient">
                        <h2 class="section-heading text-uppercase">Ingredients Price</h2>
                    </a>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <a href="/ingredient">
                                <img src="https://cdn-icons-png.flaticon.com/512/3514/3514242.png" alt="ingredient_price" style="width: 120px; height: 120px;">
                            </a>
                        </span>
                        <h4 class="my-3">식재료 시세</h4>
                        <p class="text-muted">오늘의 농축수산물 시장 가격을 안내합니다.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-4">
                        <!-- Recipe item 1-->
                        <div class="Recipe-item" style="text-align : center;">
                            <img src="@/assets/ingredientprice_banner.png" alt="ingredient_price" style="max-width: 70%; height: auto;">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--Diet Analysis-->
        <section class="page-section bg-light" id="Trend">
            <div class="container">
                <div class="text-center">
                    <a href="/analysis">
                        <h2 class="section-heading text-uppercase">Diet Analysis</h2>
                    </a>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <a href="/analysis">
                                <img src="https://cdn-icons-png.flaticon.com/512/1162/1162489.png" alt="price_trend" style="width: 120px; height: 120px;">
                            </a>
                        </span>
                        <h4 class="my-3">식단 분석</h4>
                        <p class="text-muted">회원님의 식단 데이터를 기반으로 필수 영양소 섭취를 비교·분석합니다.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-4">
                        <!-- Recipe item 1-->
                        <div class="Recipe-item" style="text-align : center;">
                            <img src="@/assets/analysis_banner.png" alt="price_trend" style="max-width: 77%; height: auto;">
                        </div>
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
                            <button class="btn btn-primary btn-xl text-uppercase" type="button" onclick="location.href='/user/mypage'">My Page</button>
                            <button class="btn btn-primary btn-xl text-uppercase" type="button" @click="logOut()">Log Out</button>
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
                            <button class="btn btn-primary btn-xl text-uppercase" type="button" onclick="location.href='/user/login'">Log In</button>
                            <button class="btn btn-primary btn-xl text-uppercase" type="button" onclick="location.href='/user/signup'">Sign Up</button>
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
            <button class="btn-up" @click="upClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130906.png" width="20px"></button>
            <button class="btn-down" @click="downClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130907.png" width="20px"></button>
        </div>
    </body>
</template>

<script>
export default {
  name: 'HelloWorld',
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
      loggedIn: null
    }
  },
  created () {
    this.isLogined()
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
    }
  }
}
/* eslint-disable */
</script>

<style>
@import "../css/styles.css";
.padding {
    padding-block: 160px;
}
.footer-custom {
    background-color: #676767;
    color:white
}
</style>
  