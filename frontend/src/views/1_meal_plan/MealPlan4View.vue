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
        <!-- Loading -->
        <div style="width:100%">
          <div v-if="isLoading" class="loading-container">
            <div class="loading">
              <Fade-loader />
            </div>
            <div class="loading-text">
              <h4>레시피를 불러오는 중입니다.</h4>
            </div>
          </div>
          <!-- Recipe Card -->
          <div v-for="(data, index) in recipeList" :key="index">
            <div name="card" class="card-custom">
              <div class="cropped" style="text-align:center; width: 100%; height: 50%; overflow: hidden; border-radius: 5%;">
                <img :src=data.foodImage width="100%" style="margin: -18%;" onerror="this.src='https://ifh.cc/g/RXYY1z.png'">
              </div>
              <div style="height: 10%;"><h6 style="text-align:center; margin-top: 10px;">{{data.foodName}}</h6></div>
              <div class="word" style="height: 30%;"><span>재료 : {{data.foodIngredient}}</span></div>
              <div style="height: 10%; width: 100%; text-align:center;">
                <span style="float:left;">재료 매칭률 : {{parseInt(data.percent)}}%</span>
                <span style="float:right;"><b style="margin-right:5px">선택</b>
                  <label>
                    <input type="checkbox" class="form-check-input" :value="data.foodCode" v-model="checkedList">
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align:center; width:100%" >
          <!-- <a href="/mealplan/step2"> -->
            <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" style="margin-left:30%; margin-right: 30%" @click="submitRecipeList()">
          <!-- </a> -->
        </div>
      </section>
    </div>
  </div>
</body>
</template>

<script>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

export default {
  components: { FadeLoader },
  data () {
    return {
      isLoading: true,
      recipeList: [],
      checkedList: [],
      date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    }
  },
  setup () {},
  created () {
    this.getRecipeData()
  },
  mounted () {},
  unmounted () {},
  methods: {
    getRecipeData () {
      this.$axios.get('http://localhost:3000/recipe/userlist', { withCredentials: true }).then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.recipeList = response.data
        this.isLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    submitRecipeList () {
      this.$axios.post('http://localhost:3000/recipe/userlist', { recipeList: this.checkedList, date: this.date }, { withCredentials: true })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
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
  .loading {
    z-index: 2;
    position: fixed;
    top: 50%;
    left: 62.6%;
    transform: translate(-50%, -50%);
  }
  .loading-text {
    text-align: center;
    position:relative;
    top: 70%;
  }
  .loading-container {
    width: 100%;
    height: 230px;
  }
</style>
