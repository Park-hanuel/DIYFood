<template>
<body id="page-m">
    <div style="margin-top: 10px; margin-bottom: 10px; text-align: center;">
      <p style="font-size:2.5em; font-weight:500; line-height:70px;">
        MY MEAL PLAN
      </p>
    </div>
    <section class="content-box">
      <p></p>
      <div style="margin-bottom: 10px">
        <select name="month" v-model="selectedMonth" class="selectbox-m">
          <option value="" disabled selected>Month</option>
          <option value="1">1월</option>
          <option value="2">2월</option>
          <option value="3">3월</option>
          <option value="4">4월</option>
          <option value="5">5월</option>
          <option value="6">6월</option>
          <option value="7">7월</option>
          <option value="8">8월</option>
          <option value="9">9월</option>
          <option value="10">10월</option>
          <option value="11">11월</option>
          <option value="12">12월</option>
        </select>
        <input type="button" class="btn btn-primary btn-custom" value="조회" @click="getUserRecipe(selectedMonth)">
      </div>
      <p v-if="selectedMonth === ''" style="margin:10px; text-align: center;">조회할 기간(월)을 선택해주세요.</p>
      <div>
        <div v-for="item in Object.keys(this.groupBy(this.userRecipeList, 'date'))" :key="item">
          <div style="width: 100%; height: 50px; margin-left: 10px; overflow: auto;">
            <h4 style="float:left; margin-top: 7px;">{{new Date(Date.parse(item)).toLocaleDateString()}} - {{new Date(Date.parse(item)+518400000).toLocaleDateString()}}</h4>
            <button class="btn" style="float:left;" value="식단 지우기" @click="deletePlan(item)"><img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" width="25px"></button>
          </div>
          <div v-for="(data, i) in userRecipeList" :key="i">
            <div v-if="data.date === item">
              <div class="recipe-box" >
                <div class="recipe-card" style="display: flex;">
                  <div style="width:85%; height:100%;">
                    <a :href="`/recipe/foodcode/${data.foodCode}`">
                      <img :src=data.RecipeNutrient.foodImage class="food-img" onerror="this.src='https://ifh.cc/g/RXYY1z.png'">
                      <div class="word" style="margin-left: 80px; margin-right:15px;">
                        <span style="font-weight: 400;">{{data.RecipeNutrient.foodName}}</span>
                      </div>
                    </a>
                  </div>
                  <div style="float:right; width:20%; height: 60px; text-align: center; vertical-align: middle;">
                    <button style="border: 1px solid transparent; background-color: transparent; height: 30px; margin-top: 18px;" @click="deleteRecipe(data.date, data.foodCode)"><img src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png" height="15px"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <!-- <div style="display: flex;">
          <h3 style="margin: 20px;">2022년 9월 2일 - 2022년 9월 8일</h3>
          <button class="btn" style="float:left" value="식단 지우기" @click="deletePlan('2022-9-14')"><img src="https://cdn-icons-png.flaticon.com/512/6460/6460112.png" width="30px"></button>
        </div> -->
    </section>
  </body>
</template>
<script>
/* eslint-disable */
export default {
  components: {},
  data () {
    return {
      month: '',
      selectedMonth: '',
      userRecipeList: [],
      deletedRecipe: {}
    }
  },
  setup () {},
  created () {
    this.getUserRecipe((new Date()).getMonth()+1)
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 월별로 식단 계획 불러오기
    async getUserRecipe (index) {
      this.month = index
      try{
        const response = await this.$axios.get(`http://localhost:3000/user/recipelist?month=${this.month}`, { withCredentials: true })
        this.userRecipeList = response.data
        console.log('ㅗ도도')
      }catch(err){
        Location.reload()
      }
    },
    // 단일 레시피 삭제
    async deleteRecipe (date, foodCode) {
      try{
        if (confirm('선택하신 레시피를 삭제하시겠습니까?')) {
        const url = `http://localhost:3000/user/recipe?date=${date}&foodCode=${foodCode}`
        await this.$axios.delete(url, { withCredentials: true })
        alert('레시피가 삭제되었습니다.')
        location.reload()
      }
      }catch(err){
        alert('다시 시도해주세요!')
      }
    },
    // 기간별 식단 계획 삭제
    async deletePlan (date) {
      try{
        if (confirm('선택하신 기간의 식단 계획을 모두 삭제하시겠습니까?')) {
        const url = `http://localhost:3000/user/recipelist?date=${date}`
        await this.$axios.delete(url,{ withCredentials: true })
        alert('식단 계획이 삭제되었습니다.')
        location.reload()
      } 
      }catch(err){
        alert('다시 시도해주세요!')
      }
    },
    // 오브젝트 groupBy
    groupBy (objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        const key = obj[property]
        if (!acc[key]) {
          acc[key] = []
        }
        // Add object to list for given key's value
        acc[key].push(obj)
        return acc
      }, {})
    }
  }
}
</script>
<style>
@import "@/css/styles.css";
body{
  background: #f9f9f9;
}
.content-box{
  float: left;
  width: 90%;
  height: auto;
  background-color:white;
  margin-bottom: 100px;
  margin-right:5%;
  margin-left: 5%;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding: 3%;
  padding-top: 1%;
}
.selectbox-m{
  width: 72%;
  margin-left: 3%;
  height: 40px;
  border-radius: 10px;
  background-color: #f3f3f3;
  border-color: #f3f3f3;
  padding-left:10px;
}
.btn-custom {
  width: 20%;
  height: 40px;
  font-size: 1rem;
  border-radius: 10px;
  border-color: white(142, 142, 142);
  margin-left: 2%;
  margin-right: 3%;
  margin-bottom: 2px;
}
.recipe-box {
  display:flex;
  justify-content: center;
  width: 100%;
  display: inline-block;
}
.recipe-card {
  width: 98%;
  height: 70px;
  background-color: #f3f3f3;
  margin: 1%;
  border-radius: 50px;
  text-align: left;
  padding: none;
  display: inline-block;
  float: left;
}
.food-img {
  margin: -18%;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  position:relative;
  top: 31.5%;
  left: 20%;
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
