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
              <h5>선택하신 재료를 기준으로 레시피를 조회하는 중입니다.</h5>
              <h5>약 30초의 시간이 소요됩니다.</h5>
            </div>
          </div>
          <!-- Recipe Card -->
          <div v-for="(data, index) in recipeList" :key="index">
            <div name="card" class="card-custom">
              <div class="cropped" style="text-align:center; width: 100%; height: 50%; overflow: hidden; border-radius: 5%;">
                <img :src=data.foodImage width="100%" style="margin: -25%;" onerror="this.src='https://ifh.cc/g/RXYY1z.png'">
              </div>
              <div style="height: 10%;"><h6 style="text-align:center; margin-top: 10px;">{{data.foodName}}</h6></div>
              <div class="word" style="height: 30%;"><span>재료 : {{data.foodIngredient}}</span></div>
              <div style="height: 10%; width: 100%; text-align:center;">
                <span style="float:left;">재료 매칭률 : {{parseInt(data.percent)}}%</span>
                <span style="float:right;"><b style="margin-right:5px">선택</b>
                  <label>
                    <input type="checkbox" class="form-check-input" :value="data.foodCode" v-model="checkedList" @click="selectItem(index)">
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style="text-align:center; width:100%" >
          <input type="button" class="btn btn-primary btn-lg next-button text-uppercase" value="NEXT" style="width: 10%; position: fixed; left: 58%; bottom:5%; margin:0; box-shadow: 3px 3px 3px 3px white;" @click="submitRecipeList()">
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
      checkedItemName: [],
      // date_start: localStorage.getItem('date_start')
      date_start: '2022-9-14'
    }
  },
  setup () {},
  created () {
    this.getRecipeData()
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 아이템 추가/삭제
    selectItem (n) {
      if (this.checkedItemName.includes(this.recipeList[n].foodName) === false) {
        this.checkedItemName.push(this.recipeList[n].foodName)
      } else {
        this.checkedItemName.splice(this.checkedItemName.indexOf(this.recipeList[n].foodName), 1)
      }
    },
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
      const url = 'http://localhost:3000/recipe/userlist'
      const data = { recipeList: this.checkedList, date: this.date_start }
      this.$axios.post(url, data, { withCredentials: true })
      console.log(data)
      localStorage.setItem('recipe', this.checkedItemName)
      location.href = '/mealplan/step5'
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
    position: relative;
    top: 25%;
    left: 100%;
    transform: translate(-50%, -50%);
  }
  .loading-text {
    text-align: center;
    position:relative;
    top: 65%;
    margin-bottom: 50px;
  }
  .loading-container {
    width: 100%;
    height: 230px;
  }
</style>
