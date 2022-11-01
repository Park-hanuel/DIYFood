/* eslint-disable */
<template>
  <body id="page-m">
    <div style=" margin-bottom: 30px;">
      <p style="font-size:2.5em; font-weight:500; line-height:70px;">
        REGISTER FOOD
      </p>
      <p style="font-size:1.2em; font-weight:400;">
        식단 분석을 위해<br>섭취한 음식을 등록합니다.
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
      <div class="text-center date-box">
        <span class="font-gg">
          {{choosedDay.year}}년 {{choosedDay.month}}월 {{choosedDay.date}}일 {{day_kor}}요일
        </span>
      </div>
      <div v-if="weekRecipeList != ''" class="w-80 m-10">
        <div class="foodname-box">
          <p style="font-size: 1.2rem; ">🥄 선택한 레시피</p>
          <div v-for="(data, index) in weekRecipeList" :key="index" class="foodname-card">
             <span>{{data}}</span>
          </div>
        </div>
      </div>
      <div class="text-center mt-3">
        <div class="text-center mt-4">
            <input v-if="selectedTime == '1'" type="button" class="btn btn-primary btn-lg btn-clicked" value="아침" @click="selectTime(1)">
            <input v-if="selectedTime != '1'" type="button" class="btn btn-primary btn-lg btn-meal" value="아침" @click="selectTime(1)">

            <input v-if="selectedTime == '2'" type="button" class="btn btn-primary btn-lg btn-clicked" value="점심" @click="selectTime(2)">
            <input v-if="selectedTime != '2'" type="button" class="btn btn-primary btn-lg btn-meal" value="점심" @click="selectTime(2)">

            <input v-if="selectedTime == '3'" type="button" class="btn btn-primary btn-lg btn-clicked" value="저녁" @click="selectTime(3)">
            <input v-if="selectedTime != '3'" type="button" class="btn btn-primary btn-lg btn-meal" value="저녁" @click="selectTime(3)">

            <input v-if="selectedTime == '4'" type="button" class="btn btn-primary btn-lg btn-clicked" value="간식" @click="selectTime(4)">
            <input v-if="selectedTime != '4'" type="button" class="btn btn-primary btn-lg btn-meal" value="간식" @click="selectTime(4)">

        </div>
        <div class="text-center mt-4">
          <div v-if="selectedTime != ''">
            <!-- 검색창 -->
            <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4 search-box w-80 m-10-all mt-1">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button id="button-addon2" class="btn btn-link text-warning" @click="searchRecipe(keyword, 1)" disabled><img src="https://cdn-icons-png.flaticon.com/512/151/151773.png" width="25px"></button>
                </div>
                <input type="search" placeholder="검색어를 입력해주세요" aria-describedby="button-addon2" class="form-control border-0 bg-light" v-model="keyword" style="box-shadow: none;">
                <button id="button-addon2" class="search-btn">검색</button>
              </div>
            </div>
            <!-- 검색 음식 리스트 -->
            <div class="table-div">
              <table class="table" style="vertical-align: middle;">
                <thead style="position: sticky; top: 0px; background-color: #f0f0f0 !important;">
                  <tr>
                    <th scope="col" style="width: 20%">품목명</th>
                    <th scope="col" style="width: 20%">제조사</th>
                    <th scope="col" style="width: 10%">선택</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>하하</td>
                    <td>ㅁㄴ이</td>
                    <td>
                      <label>
                        <input type="checkbox" class="form-check-input" :value="foodCode" v-model="selectedFood"/>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedFood != ''">
        <div class="foodname-box mt-5 w-80 m-10">
          <p style="font-size: 1.2rem">🥄 선택한 음식</p>
          <div v-for="(data, index) in selectedFood" :key="index" class="foodname-card">
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
      selectedTime: '',
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
      selectedFood: [],
      sundayDate: ""
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
  created () { },
  mounted () {},
  unmounted () {},
  methods: {
    // 끼니 선택
    selectTime (index) {
      this.selectedTime = index
    },
    // 날짜 선택
    dateChange(day) {
      this.choosedDay = day;
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
    }
  }
}
</script>
<style>
body{
  background: #f3f3f3;
  padding-top:10px;
  padding-left: 3%;
  padding-right: 3%;
}
.content-box{
  display: inline-block;
  width:100%;
  padding: 20px 0px;
  background-color:white;
  margin-bottom: 100px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: auto;
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
.m-10-all {
  margin: 10%
}
.m-10 {
  margin: 0% 10%
}
.btn-meal {
  width: 20%;
  height: 40px;
  background: #f0f0f0;
  border: none;
  color: rgb(61, 61, 61);
  font-size: 1rem;
  margin: 1.25%;
  padding: none;
}
.btn-clicked {
  width: 20%;
  height: 40px;
  font-size: 1rem;
  margin: 1.25%;
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
  width: 90%;
  height:400px;
  margin: 5%;
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
  width: 80%;
  margin: 5% 10% 5%;
  padding: 5px 0px;
  border-radius: 100px;
}
.next-button {
  margin-block: none;
}
p {
  margin-bottom: 0rem;
}
</style>
