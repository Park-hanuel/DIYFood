import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import mHomeView from '../views/mHomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/m',
    name: 'MobileHome',
    component: mHomeView
  },
  {
    path: '/mealplan',
    name: 'MealPlanMain',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/1_meal_plan/MealPlanMainView.vue'
      )
  },
  {
    path: '/mealplan/m',
    name: 'MobileMealPlanMain',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/1_meal_plan/mMealPlanMainView.vue'
      )
  },
  {
    path: '/mealplan/step1',
    name: 'MealPlanStep1',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/1_meal_plan/MealPlan1View.vue'
      )
  },
  {
    path: '/mealplan/step1/m',
    name: 'MobileMealPlanStep1',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/1_meal_plan/mMealPlan1View.vue'
      )
  },
  {
    path: '/mealplan/step2',
    name: 'MealPlanStep2',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/1_meal_plan/MealPlan2View.vue'
      )
  },
  {
    path: '/mealplan/step2/m',
    name: 'MobileMealPlanStep2',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/1_meal_plan/mMealPlan2View.vue'
      )
  },
  {
    path: '/mealplan/step3',
    name: 'MealPlanStep3',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/1_meal_plan/MealPlan3View.vue'
      )
  },
  {
    path: '/mealplan/step3/m',
    name: 'MobileMealPlanStep3',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/1_meal_plan/mMealPlan3View.vue'
      )
  },
  {
    path: '/mealplan/step4',
    name: 'MealPlanStep4',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/1_meal_plan/MealPlan4View.vue'
      )
  },
  {
    path: '/mealplan/step4/m',
    name: 'MobileMealPlanStep4',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/1_meal_plan/mMealPlan4View.vue'
      )
  },
  {
    path: '/mealplan/step5',
    name: 'MealPlanStep5',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/1_meal_plan/MealPlan5View.vue'
      )
  },
  {
    path: '/mealplan/step5/m',
    name: 'MobileMealPlanStep5',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/1_meal_plan/mMealPlan5View.vue'
      )
  },
  {
    path: '/recipe',
    name: 'RecipeList',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/2_recipe/RecipeListView.vue'
      )
  },
  {
    path: '/recipe/m',
    name: 'MobileRecipeList',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/2_recipe/mRecipeListView.vue'
      )
  },
  {
    path: '/recipe/foodname/:foodName',
    name: 'DetailRecipe_Name',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/2_recipe/DetailRecipeName.vue'
      )
  },
  {
    path: '/recipe/foodname/:foodName/m',
    name: 'MobileDetailRecipe_Name',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/2_recipe/mDetailRecipeName.vue'
      )
  },
  {
    path: '/recipe/foodcode/:foodCode',
    name: 'DetailRecipe_Code',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/2_recipe/DetailRecipeCode.vue'
      )
  },
  {
    path: '/recipe/foodcode/:foodCode/m',
    name: 'MobileDetailRecipe_Code',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/2_recipe/mDetailRecipeCode.vue'
      )
  },
  {
    path: '/ingredient',
    name: 'IngredientPrice',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/3_ingredient_price/IngredientPriceView.vue'
      )
  },
  {
    path: '/ingredient/m',
    name: 'MobileIngredientPrice',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/3_ingredient_price/mIngredientPriceView.vue'
      )
  },
  {
    path: '/analysis/survey',
    name: 'AnalysisSurvey',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/4_diet_analysis/AnalysisSurveyView.vue'
      )
  },
  {
    path: '/analysis/survey/m',
    name: 'MobileAnalysisSurvey',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/4_diet_analysis/mAnalysisSurveyView.vue'
      )
  },
  {
    path: '/analysis/result',
    name: 'AnalysisResult',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/4_diet_analysis/AnalysisResultView.vue'
      )
  },
  {
    path: '/analysis/result/m',
    name: 'MobileAnalysisResult',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/4_diet_analysis/mAnalysisResultView.vue'
      )
  },
  {
    path: '/user/mypage',
    name: 'MyPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/5_mypage/MyPageView.vue'
      )
  },
  {
    path: '/user/mypage/m',
    name: 'MobileMyPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/5_mypage/mMyPageView.vue'
      )
  },
  {
    path: '/user/mymealplan',
    name: 'MyMealPlan',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/5_mypage/MyMealPlanView.vue'
      )
  },
  {
    path: '/user/mymealplan/m',
    name: 'MobileMyMealPlan',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/5_mypage/mMyMealPlanView.vue'
      )
  },
  {
    path: '/user/login',
    name: 'LogInPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/5_mypage/LogInView.vue'
      )
  },
  {
    path: '/user/login/m',
    name: 'MobileLogInPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/5_mypage/mLogInView.vue'
      )
  },
  {
    path: '/user/signup',
    name: 'SignUpPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/5_mypage/SignUpView.vue'
      )
  },
  {
    path: '/user/signup/m',
    name: 'MobileSignUpPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/5_mypage/mSignUpView.vue'
      )
  },
  {
    path: '/user/signupcompleted',
    name: 'SignUpCompletedPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/5_mypage/SignUpCompletedView.vue'
      )
  },
  {
    path: '/user/signupcompleted/m',
    name: 'MobileSignUpCompletedPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/5_mypage/mSignUpCompletedView.vue'
      )
  },
  {
    path: '/user/info',
    name: 'MyInfoPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/5_mypage/MyInfoView.vue'
      )
  },
  {
    path: '/user/info/m',
    name: 'MobileMyInfoPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/5_mypage/mMyInfoView.vue'
      )
  },
  {
    path: '/user/signout',
    name: 'SignOutPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/5_mypage/SignOutView.vue'
      )
  },
  {
    path: '/user/signout/m',
    name: 'MobileSignOutPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/5_mypage/mSignOutView.vue'
      )
  },
  {
    path: '/user/admin',
    name: 'AdminPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/web/5_mypage/AdminView.vue'
      )
  },
  {
    path: '/user/admin/m',
    name: 'MobileAdminPage',
    component: () =>
      import(
        /* webpackChunkName: "event", webpackPrefetch:true */ '../views/mobile/5_mypage/mAdminView.vue'
      )
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
