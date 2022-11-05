/* eslint-disable */
<template>
  <body id="page">
    <div style=" margin-bottom: 30px;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        REGISTER FOOD
      </p>
      <p style="font-size:1.5em; font-weight:400;">
        식단 분석을 위해 식단 계획 이외에 섭취한 음식을 등록합니다.
        {{finalData}}
      </p>
    </div>
    <div class="content-box">
      <div style="width:80%; margin: 0% 10% 3%;" >
        <vue-horizontal-calendar
        lang="en"
        choosedItemColor="#48a238"
        todayItemColor="#48a23830"
        choosedDatePos="center"
        v-on:change="dateChange"></vue-horizontal-calendar>
      </div>
      <div v-if="weekRecipeList != ''" class="w-80 m-10">
        <div class="foodname-box">
          <p style="font-size: 1.2rem">🥄 이 주에는 이런 음식을 선택하셨네요!</p>
          <div v-for="(data, index) in weekRecipeList" :key="index" class="foodname-card">
             <span>{{data}}</span>
          </div>
        </div>
      </div>
      <div class="w-100 text-center mt-3">
        <div class="half-box w-30 text-center mt-4">
          <div class="date-box">
            <span class="font-gg">
              {{choosedDay.year}}년
              <br>{{choosedDay.month}}월 {{choosedDay.date}}일
              <br>{{day_kor}}요일
            </span>
          </div>
          <div v-if="mealTime == '아침'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-clicked" value="아침" @click="selectTime('아침')">
          </div>
          <div v-if="mealTime != '아침'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-meal" value="아침" @click="selectTime('아침')">
          </div>

          <div v-if="mealTime == '점심'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-clicked" value="점심" @click="selectTime('점심')">
          </div>
          <div v-if="mealTime != '점심'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-meal" value="점심" @click="selectTime('점심')">
          </div>

          <div v-if="mealTime == '저녁'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-clicked" value="저녁" @click="selectTime('저녁')">
          </div>
          <div v-if="mealTime != '저녁'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-meal" value="저녁" @click="selectTime('저녁')">
          </div>

          <div v-if="mealTime == '간식'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-clicked" value="간식" @click="selectTime('간식')">
          </div>
          <div v-if="mealTime != '간식'" class="mb-3">
            <input type="button" class="btn btn-primary btn-lg btn-meal" value="간식" @click="selectTime('간식')">
          </div>

        </div>
        <div class="half-box w-70 text-center mt-4">
          <div v-if="mealTime != ''">
            <!-- 검색창 -->
            <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4 search-box w-70 m-15 mt-1">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button id="button-addon2" class="btn btn-link text-warning" @click="searchRecipe(keyword, 1)" disabled><img src="https://cdn-icons-png.flaticon.com/512/151/151773.png" width="25px"></button>
                </div>
                <input type="search" placeholder="검색어를 입력해주세요" aria-describedby="button-addon2" class="form-control border-0 bg-light" v-model="foodname" style="box-shadow: none;">
                <button id="button-addon2" class="search-btn" @click="searchFood()">검색</button>
              </div>
            </div>
            <!-- 검색 음식 리스트 -->
            <div class="table-div">
              <div v-if="isEmpty" style="padding: 5%; font-size: 80%; color: darkgray;">
                <p style="color: black; font-size: 100%;">{{emptyMsg}}</p>
                <p>음식명을 기준으로 검색해주세요.</p>
                <p>일반식품, 가공식품, 레시피 식품 검색이 가능합니다.</p>
                <p>예) 불고기, 초코파이, 빅맥 등</p>
              </div>
              <div v-else>
                <table class="table" style="vertical-align: middle;">
                  <thead style="position: sticky; top: 0px;background-color: #f0f0f0 !important;">
                    <tr>
                      <th scope="col" style="width: 15%">품목명</th>
                      <th scope="col" style="width: 15%">제조사</th>
                      <th scope="col" style="width: 10%">1회 제공량</th>
                      <th scope="col" style="width: 10%">칼로리</th>
                      <th scope="col" style="width: 10%">탄수화물</th>
                      <th scope="col" style="width: 10%">단백질</th>
                      <th scope="col" style="width: 10%">지방</th>
                      <th scope="col" style="width: 10%">나트륨</th>
                      <th scope="col" style="width: 10%">선택</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(data, i) in foodList" :key="i">
                      <td>{{data.foodName}}</td>
                      <td>{{data.manufacturer}}</td>
                      <td>1회제공량</td>
                      <td>{{data.foodEnergy}}</td>
                      <td>{{data.foodCarbohydrate}}</td>
                      <td>{{data.foodProtein}}</td>
                      <td>{{data.foodFat}}</td>
                      <td>{{data.foodNatrium}}</td>
                      <td>
                        <label>
                          <input type="checkbox" class="form-check-input" :value="data.foodCode" v-model="selectedFoodCode" @click="selectFood(i)"/>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p v-if="isEnd" class="mb-3" style="color: darkgray; font-size: 80%;">{{endMsg}}</p>
                <input v-else type="button" class="btn btn-primary btn-sm mb-3 btn-more" value="more" @click="searchMoreFood()">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="bindedCodeList != ''">
        <div class="foodname-box mt-5 w-80 m-10">
          <p style="font-size: 1.2rem">🥄 {{choosedDay.year}}년 {{choosedDay.month}}월 {{choosedDay.date}}일 섭취한 음식</p>
          <div v-for="(data, index) in bindedCodeList" :key="index" class="foodname-card">
             <span>{{data}}</span>
          </div>
        </div>
      </div>
      <div class="w-100 mt-3 text-center">
        <button class="btn btn-primary btn-lg next-button" @click="submitForm()">REGISTER</button>
      </div>
    </div>
  </body>
</template>
<script>
/* eslint-disable */
import VueHorizontalCalendar from 'vue-horizontal-calendar';

export default {
  components: {
      VueHorizontalCalendar
  },
  data () {
    return {
      mealTime: "",
      servingSize: "",
      choosedDay: {
        dateFormat: "",
        year: "",
        month: "",
        date: "",
        day: "",
        timestamp: ""
      },
      day_kor: "",
      monthRecipeList: [],
      weekRecipeList: [],
      selectedFoodCode: [],
      sundayDate: "",
      foodname: "",
      foodData: [],
      foodList: [],
      isEmpty: true,
      emptyMsg: "",
      isEnd: true,
      endMsg: "",
      pageNum: null,
      bindedCode: "",
      bindedCodeList: [],
      finalData: [],
    }
  },
  watch: {
    choosedDay () {
      this.choosedDay.dateFormat.replaceAll('/','-')
      if (this.choosedDay.day == "Mo") {
        this.day_kor = "월"
        this.getSundayDate(this.choosedDay.dateFormat)
      } else if (this.choosedDay.day == "Tu") {
        this.day_kor = "화"
        this.getSundayDate(this.choosedDay.dateFormat)
      } else if (this.choosedDay.day == "We") {
        this.day_kor = "수"
        this.getSundayDate(this.choosedDay.dateFormat)
      } else if (this.choosedDay.day == "Th") {
        this.day_kor = "목"
        this.getSundayDate(this.choosedDay.dateFormat)
      } else if (this.choosedDay.day == "Fr") {
        this.day_kor = "금"
        this.getSundayDate(this.choosedDay.dateFormat)
      } else if (this.choosedDay.day == "Sa") {
        this.day_kor = "토"
        this.getSundayDate(this.choosedDay.dateFormat)
      } else if (this.choosedDay.day == "Su") {
        this.day_kor = "일"
        this.sundayDate = this.choosedDay.year + "-" + this.choosedDay.month + "-" + this.choosedDay.date
      }
      var datedata = new Date(this.sundayDate)
      this.getUserRecipe(datedata.getMonth() + 1)
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    // 끼니 선택
    selectTime (index) {
      this.mealTime = index
      this.isEmpty = true
    },
    // 날짜 선택
    dateChange(day) {
      this.choosedDay = day;
    },
    // 음식 검색하기
    async searchFood () {
      this.foodList = []
      this.pageNum = 1
      try{
        const response = await this.$axios.get(`http://localhost:3000/food/list?pageNum=${this.pageNum}&foodname=${this.foodname}`, { withCredentials: true })
        this.foodData = response.data
        this.pageNum++
        for (var i=0; i<this.foodData['contents'].length; i++) {
          this.foodList.push(this.foodData['contents'][i])
        }
      } catch (err) {
        console.log(err)
      }

      if (this.foodData['contents'].length === 0) {
        this.isEmpty = true
        this.emptyMsg = "검색 결과가 없습니다."
      } else {
        this.isEmpty = false
      }

      if (this.foodData['contents'].length < 19) {
        this.isEnd = true
        this.endMsg = "더 이상 검색 결과가 없습니다."
      } else {
        this.isEnd = false
      }
    },
    async searchMoreFood () {
      try{
        const response = await this.$axios.get(`http://localhost:3000/food/list?pageNum=${this.pageNum}&foodname=${this.foodname}`, { withCredentials: true })
        this.foodData = response.data
        this.pageNum++
        for (var i=0; i<this.foodData['contents'].length; i++) {
          this.foodList.push(this.foodData['contents'][i])
        }
      } catch (err) {
        // location.reload()
      }

      if (this.foodData['contents'].length < 19) {
        this.isEnd = true
        this.endMsg = "더 이상 검색 결과가 없습니다."
      } else {
        this.isEnd = false
      }
    },
    // 월별로 식단 계획 불러오기
    async getUserRecipe (index) {
      this.month = index
      try{
        const response = await this.$axios.get(`http://localhost:3000/user/recipelist?month=${this.month}`, { withCredentials: true })
        this.monthRecipeList = response.data
        this.weekRecipeList=[]
        for(var i=0; i<=this.monthRecipeList.length; i++) {
          if (this.monthRecipeList[i].date == this.sundayDate) {
            this.weekRecipeList.push(this.monthRecipeList[i].RecipeNutrient.foodName)
          }
        }
      }catch(err){
        // location.reload()
      }
    },
    selectWeek () {
      this.weekRecipeList=[]
      this.getUserRecipe()
      for(var i=0; i<=this.monthRecipeList.length; i++) {
        if (this.monthRecipeList[i].date == this.sundayDate) {
          this.weekRecipeList.push(this.monthRecipeList[i].RecipeNutrient.foodName)
        }
      }
    },
    //일요일 구하기
    getSundayDate(d) {
      var paramDate = new Date(d); // new Date('2021-06-08'): 화요일
      var day = paramDate.getDay();
      var diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
      this.sundayDate = new Date(paramDate.setDate(diff)).toISOString().substring(0, 10);
    },
    // 음식 선택 -> 푸드네임리스트에 추가
    selectFood (i) {
      if (this.foodList[i].manufacturer == null) {
        this.bindedCode = this.mealTime + " | " + this.foodList[i].foodName
        if (this.bindedCodeList.includes(this.bindedCode)) {
          for (var i=0; i<=this.bindedCodeList.length; i++) {
            if (this.bindedCodeList[i] == this.bindedCode) {
              this.bindedCodeList.splice(i,1)
            }
          }
        } else {
          this.bindedCodeList.push(this.bindedCode)
        }
      } else {
        this.bindedCode = this.mealTime + " | " + this.foodList[i].foodName + " | " + this.foodList[i].manufacturer
        if (this.bindedCodeList.includes(this.bindedCode)) {
          for (var i=0; i<=this.bindedCodeList.length; i++) {
            if (this.bindedCodeList[i] == this.bindedCode) {
              this.bindedCodeList.splice(i,1)
            }
          }
        } else {
          this.bindedCodeList.push(this.bindedCode)
        }
      }
    },
    async submitForm () {
      var mealTime = ''
      for (var i=0; i < this.selectedFoodCode.length; i++) {
        if (this.bindedCodeList[i].slice(0, 2) == '아침') {
          mealTime = '아침'
        } else if (this.bindedCodeList[i].slice(0, 2) == '점심') {
          mealTime = '점심'
        } else if (this.bindedCodeList[i].slice(0, 2) == '저녁') {
          mealTime = '저녁'
        } else if (this.bindedCodeList[i].slice(0, 2) == '간식') {
          mealTime = '간식'
        } else {
          mealTime = ''
        }
        
        const userMeal = { 
          date : this.choosedDay.dateFormat.replaceAll('/','-') ,
          mealTime : mealTime,
          food : {
            foodCode : this.selectedFoodCode[i],
            servingSize : 1
          }
        }
        this.finalData.push(userMeal)

        try {
          await this.$axios.put('http://localhost:3000//food/userlist', this.finalData, { withCredentials: true })
          
        } catch (err) {
          // alert('다시 시도해주세요.')
        }
      }
    }
  }
}
</script>
<style>
body{
  background: #f3f3f3;
  padding-left: 3%;
  padding-right: 3%;}
.content-box{
  display: inline-block;
  width:100%;
  padding: 50px;
  height:fit-content;
  background-color:white;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: auto;
}
.half-box {
  display: inline-block;
  height: 500px;
  padding: 0px 30px;
  font-size: 1.3rem;
  font-weight: 500;
}
.w-30 {
  width: 25%;
  border-right: 1px solid lightgray;
  float: left;
}
.w-70 {
  width: 75%;
  float: left;
}
.w-80 {
  width: 80%;
}
.m-15 {
  margin: 0% 15%
}
.m-10 {
  margin: 0% 10%
}
.btn-meal {
  width: 70%;
  height: 60px;
  background: #f0f0f0;
  border: none;
  color: rgb(61, 61, 61);
  font-size: 90%;
  padding: auto;
  margin: 3px;
}
.btn-more {
  background: #f0f0f0;
  border: none;
  color: rgb(61, 61, 61);
  font-size: 80%;
}
.btn-clicked {
  width: 70%;
  height: 60px;
  font-size: 90%;
  padding: auto;
  margin: 3px;
}
.search-btn {
  border-radius: 10px;
  margin-right: 10px;
  border:none;
  font-size: 1rem;
  color:#1a8051;
  background-color: transparent;
}
.table {
  font-size: 0.9rem;
}
.table-div {
  width: 100%;
  height:420px;
  overflow:auto;
  border-radius: 10px;
  border: 3px solid #f0f0f0;
}
.foodname-card {
  margin: 3px 3px; 
}
.font-gg {
  font-size: 1.2rem
}
.date-box {
  border: 3px solid #f0f0f0;
  width: 70%;
  margin: 3% 15% 7%;
  padding: 30px 0px;
  border-radius: 100px;
}
</style>
