<template>
<body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px; text-align: center;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        MY MEAL PLAN
      </p>
    </div>
    <section class="content-box">
      <p></p>
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="display: flex;justify-content: center; margin-top: 20px; width: 100%;">
        <div class="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(1)">1월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(2)">2월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(3)">3월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(4)">4월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(5)">5월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(6)">6월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(7)">7월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(8)">8월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(9)">9월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(10)">10월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(11)">11월</button>
          <button type="button" class="btn btn-success btn-custom" @click="getUserRecipe(12)">12월</button>
        </div>
        <p style="margin:20px; text-align: center; margin-left: 30%; margin-right: 30%;">조회할 기간(월)을 선택해주세요.
          <br>항목을 클릭하면 해당 레시피 페이지로 이동합니다.</p>
      </div>
      <!-- <div v-for="(data, id) in userRecipeList" :key="id"> -->
        <!-- <div style="margin-top:30px;">
          <h3>{{data.date.replace('-','.').replace('-','.')}} 부터 {{new Date(Date.parse(data.date)+518400000).toLocaleDateString()}} 까지</h3>
        </div> -->
        <div style="display: flex;">
          <h3 style="margin: 20px;">2022년 9월 2일 - 2022년 9월 8일</h3>
          <button class="btn" style="float:left" value="식단 지우기" @click="deletePlan('2022-9-14')"><img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" width="30px"></button>
        </div>
        <div v-for="(data, i) in userRecipeList" :key="i">
          <div class="recipe-box" >
            <div class="recipe-card" style="display: flex;">
              <div style="width:85%; height:100%;">
                <a href="/recipe">
                  <img :src=data.RecipeNutrient.foodImage class="food-img" onerror="this.src='https://ifh.cc/g/RXYY1z.png'">
                  <div class="word" style="vertical-align: middle; margin-left: 110px; margin-right:15px; margin-top: 8px;">
                    <p style="font-weight: 400; font-size:1.2rem">{{data.RecipeNutrient.foodName}}</p>
                  </div>
                </a>
              </div>
              <div style="float:right; width:15%; height: 100px; text-align: center; vertical-align: middle;">
                <button style="border: 1px solid transparent; background-color: transparent; height: 30px; margin-top: 35px;" @click="deleteRecipe(data.date, data.foodCode)"><img src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png" height="20px"></button>
              </div>
            </div>
          </div>
        </div>
      <!-- </div> -->
    </section>
  </body>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      month: '',
      userRecipeList: [],
      deletedRecipe: {}
    }
  },
  setup () {},
  created () {
    this.getUserRecipe(9)
  },
  mounted () {},
  unmounted () {},
  methods: {
    getUserRecipe (index) {
      this.month = index
      this.$axios.get(`http://localhost:3000/user/recipelist?month=${this.month}`).then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.userRecipeList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    deleteRecipe (date, foodCode) {
      if (confirm('선택하신 레시피를 삭제하시겠습니까?')) {
        const url = 'http://localhost:3000/user/recipe'
        const data = { date: date, foodCode: foodCode }
        this.$axios.delete(url, { data }, { withCredentials: true })
        alert('레시피가 삭제되었습니다.')
        location.reload()
      } else {
        console.log('다행 휴..')
      }
    },
    deletePlan (date) {
      if (confirm('선택하신 기간의 식단 계획을 모두 삭제하시겠습니까?')) {
        const url = 'http://localhost:3000/user/recipelist'
        const data = { date: date }
        this.$axios.delete(url, { data }, { withCredentials: true })
        alert('식단 계획이 삭제되었습니다.')
        // location.reload()
      } else {
        console.log('다행 휴..')
      }
    }
  }
}
</script>
<style>
@import "@/css/styles.css";
body{
  background: #f3f3f3;
  padding-left: 3%;
  padding-right: 3%;}
.content-box{
  float: left;
  width: 80%;
  height: auto;
  background-color:white;
  margin-bottom: 20px;
  margin-right:10%;
  margin-left: 10%;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px lightgray;
  padding: 3%;
  padding-top: 1%;
}
.btn-custom {
  width: 70px;
  border-radius: 10px;
  border-color: white;
  border-radius: 10px;
}
.recipe-box {
  display:flex;
  justify-content: center;
  width: 50%;
  display: inline-block;
  float: left;
}
.recipe-card {
  width: 95%;
  height: 100px;
  background-color: #f3f3f3;
  margin: 2.5%;
  border-radius: 50px;
  text-align: left;
  padding: none;
  display: inline-block;
  float: left;
}
.food-img {
  margin: -18%;
  height: 90px;
  width: 90px;
  border-radius: 50%;
  position:relative;
  top: 36%;
  left: 19%;
}
a {
  color: #212121;
  text-decoration: none
}
a:hover {
  color: #1a8051;
}
.word {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap : break-word;
  text-align : left;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
