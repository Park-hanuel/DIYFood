<template>
  <body id="page">
    <div>
      <div>
        <!-- Side -->
        <div id="side">
          <div style="margin-top: 30px; " id="head">
            <h1>
              MEAL PLAN
            </h1>
          </div>
          <div style="text-align: center;">
            <img src="https://cdn-icons-png.flaticon.com/512/1889/1889972.png" alt="식단계획4" height="50%" width="50%">
          </div>
          <div style="margin-top: 30px; text-align: center;">
            <h3>4. 레시피 선택</h3>
          </div>
        </div>
      <!-- Content -->
      <section id="content">
        <div style="text-align:center;">
          <h1>레시피 선택</h1>
          <p>선택하신 재료를 가장 많이 포함한 순서대로 레시피들을 추천합니다. 레시피를 선택해주세요.</p>
        </div>
        <!-- Recipe Card -->
        <div v-for="(data, index) in recipeList" :key="index">
          <div name="card" class="card-custom">
            <div class="cropped" style="text-align:center; width: 100%; height: 50%; overflow: hidden; border-radius: 5%;">
              <img :src=data.foodImageURL width="100%" style="margin: -18%;" onerror="this.src='https://ifh.cc/g/RXYY1z.png'">
            </div>
            <div style="height: 10%;"><h6 style="text-align:center; margin-top: 10px;">{{data.foodName}}</h6></div>
            <div class="word" style="height: 30%;"><span>재료 : {{data.foodIngredient}}</span></div>
            <div style="height: 10%; width: 100%; text-align:center;">
              <p>선택
                <label>
                  <input type="checkbox" class="form-check-input">
                </label>
              </p>
            </div>
          </div>
        </div>
        <div id="next-button" style="text-align:center;" >
          <a href="/mealplan/step2">
            <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" onClick="location.href=/mealplan/step2">
          </a>
        </div>
      </section>
    </div>
  </div>
</body>

</template>
<script>
export default {
  components: {},
  data () {
    return {
      ingredients: '재료1, 재료2, 재료3, 재료4, 재료5, 재료6, 재료7',
      recipeList: [
        {
          foodName: '죽',
          foodImageURL: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00017_2.png',
          foodIngredient: '고구마죽, 고구마 100g(2/3개), 설탕 2g(1/3작은술), 찹쌀가루 3g(2/3작은술),물 200ml(1컵), 잣 8g(8알)',
          intersectionIngredientList: ['고구마', '잣'],
          persent: '30'
        },
        {
          foodName: '누룽지 두부 계란죽',
          foodImageURL: 'http://http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00016_2.png.foodsafetykorea.go.kr/uploadimg/cook/10_00017_2.png',
          foodIngredient: '채소준비 애호박 30g(1/6개), 표고버섯 20g(2개), 당근 5g(3×2×1cm)  누룽지 죽 누룽지 70g(1/3컵), 순두부 100g(1/4모), 달걀 50g(1개),참기름 3g(2/3작은술), 소금 약간, 참깨 약간, 흰 후추 약간)',
          intersectionIngredientList: ['달걀', '애호박'],
          persent: '40'
        },
        {
          foodName: '고구마죽',
          foodImageURL: 'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00017_2.png',
          foodIngredient: '고구마죽, 고구마 100g(2/3개), 설탕 2g(1/3작은술), 찹쌀가루 3g(2/3작은술),물 200ml(1컵), 잣 8g(8알)',
          intersectionIngredientList: ['고구마', '잣'],
          persent: '30'
        }
      ]
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>

<style>
  @import "@/css/styles.css";
  body{background: #f3f3f3;}
  .btn-custom {
    margin-bottom: 20px;
  }
  .card-custom {
    background-color: #f3f3f3;
    width: 30%;
    height: 350px;
    border-radius: 1rem;
    padding: 10px;
    float: left;
    margin: 1.6%;
  }
  .word {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-wrap : break-word;
    text-align : left;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
</style>
