<template>
  <body id="page-m">
    <div style="margin: 20px 0px;">
      <span style="font-size:2.5em; font-weight:500; line-height:70px;">
        DIET ANALYSIS
      </span>
      <p style="font-size:1.2em; font-weight:400;">
        {{username}}님의 식단 계획 데이터를 기반으로<br>영양 섭취를 분석합니다.
      </p>
    </div>
    <div class="content-box">
      <div style="width:100%; padding: 20px 0px 10px;">
        <div style="text-align: center;">
          <h2 v-if="this.date === ''" >기간을 선택해주세요</h2>
          <h2 v-else>{{new Date(Date.parse(date)).toLocaleDateString()}} - {{new Date(Date.parse(date)+518400000).toLocaleDateString()}}</h2>
        </div>
      </div>
      <div>
        <div style="width:80%; margin: 1% 10%;">
          <select name="date" v-model="month" class="selectbox-m w-30" @change="getSundayDate()">
            <option value="" disabled>Month</option>
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
          <select name="date" v-model="date" class="selectbox-m w-60" @change="getUserSurveyData()">
            <option value="" disabled>Meal Plan</option>
            <option :value="sundayDate1">{{new Date(Date.parse(sundayDate1)).toLocaleDateString()}} - {{new Date(Date.parse(sundayDate1)+518400000).toLocaleDateString()}}</option>
            <option :value="sundayDate2">{{new Date(Date.parse(sundayDate2)).toLocaleDateString()}} - {{new Date(Date.parse(sundayDate2)+518400000).toLocaleDateString()}}</option>
            <option :value="sundayDate3">{{new Date(Date.parse(sundayDate3)).toLocaleDateString()}} - {{new Date(Date.parse(sundayDate3)+518400000).toLocaleDateString()}}</option>
            <option :value="sundayDate4">{{new Date(Date.parse(sundayDate4)).toLocaleDateString()}} - {{new Date(Date.parse(sundayDate4)+518400000).toLocaleDateString()}}</option>
            <option v-if="new Date(Date.parse(sundayDate5)).getMonth()+1 == this.month"
             :value="sundayDate5">{{new Date(Date.parse(sundayDate5)).toLocaleDateString()}} - {{new Date(Date.parse(sundayDate5)+518400000).toLocaleDateString()}}</option>
          </select>
        </div>
      </div>
      <div>
        <div class="half-box">
          <div style="text-align:center; margin-bottom: 10px;">
            <h3>3대 영양소 섭취 비율</h3>
          </div>
          <div class="chart-box">
            <p>권장 섭취 비율</p>
            <PieChart class="piechart-style"/>
          </div>
          <div class="chart-box">
            <p>나의 섭취 비율</p>
            <PieUserChart
              class="piechart-style"
              :percentCarbohydrate="this.nutrientData.percentCarbohydrate"
              :percentFat="this.nutrientData.percentFat"
              :percentProtein="this.nutrientData.percentProtein"/>
          </div>
          <div v-if="this.dateChecked" style="font-size: 1rem; text-align: center;">
            <p>🥄 3대 영양소 권장 섭취 비율
              <br><b>탄수화물 50%, 단백질 30%, 지방 20%</b></p>
            <p>🥄 <b>{{username}}</b>님의 3대 영양소 섭취 비율
              <br><b>탄수화물 {{parseInt(nutrientData.percentCarbohydrate)}}%, 단백질 {{parseInt(nutrientData.percentProtein)}}%, 지방 {{parseInt(nutrientData.percentFat)}}%</b></p>
            <p><b>탄수화물</b> 섭취를
              <b>
                <span v-if="this.nutrientData.percentCarbohydrate > 50" style="color:orangered">줄이고</span>
                <span v-else style="color:dodgerblue">늘리고</span>
              </b>,<br>
              <b> 단백질</b> 섭취를
              <b>
                <span v-if="this.nutrientData.percentProtein > 30" style="color:orangered">줄이고</span>
                <span v-else style="color:dodgerblue">늘리고</span>
              </b>,<br>
              <b> 지방</b> 섭취는
              <b>
                <span v-if="this.nutrientData.percentFat > 20" style="color:orangered">줄이도록</span>
                <span v-else style="color:dodgerblue">늘리도록</span>
              </b><br>
              노력해보세요!
            </p>
          </div>
        </div>
        <div class="half-box"  style="border-left: 1px solid lightgray">
          <div style="text-align:center; ">
            <h3>영양소 섭취 비교 그래프</h3>
            <BarChart
              :BasicMetabolicRate="this.nutrientData.userInfo.basicMetabolicRate"
              :dailyNeedCarbohydrate="this.nutrientData.dailyNeed.carbohydrate"
              :dailyNeedEnergy="this.nutrientData.userInfo.dailyNeedEnergy"
              :dailyNeedFat="this.nutrientData.dailyNeed.fat"
              :dailyNeedNatrium="this.nutrientData.dailyNeed.natrium"
              :dailyNeedProtein="this.nutrientData.dailyNeed.protein"
              :maintain_calorie="this.nutrientData.userInfo.dailyNeedEnergy"
              :sumCarbohydrate="this.nutrientData.averageNutrient.carbohydrate"
              :sumEnergy="this.nutrientData.averageNutrient.energy"
              :sumFat="this.nutrientData.averageNutrient.fat"
              :sumNatrium="this.nutrientData.averageNutrient.natrium"
              :sumProtein="this.nutrientData.averageNutrient.protein"/>
          </div>
          <div v-if="this.dateChecked" style="font-size: 1rem; margin-top: 30px; text-align: center;">
            <p>
              신체 정보로 계산한 <b>기초 대사량</b><br>
              <b>{{this.nutrientData.userInfo.basicMetabolicRate}}kcal</b>
              <br><b>{{purpose}}</b>을(를)위한 <b>기초 대사량</b><br>
              <b>{{parseInt(this.nutrientData.userInfo.basicMetabolicRate)}}kcal</b><br>
              <b>BMI 지수</b>(체질량 지수)<br>
              <b>{{parseInt(this.nutrientData.BMI)}} ({{this.nutrientData.BMIrate}})</b>
            </p>
            <table class="table" style="vertical-align: middle; text-align: center;">
              <thead class="table-bordered">
                <tr>
                  <th scope="col">영양소</th>
                  <th scope="col">권장량</th>
                  <th scope="col">섭취량</th>
                  <th scope="col">비교</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>열량</td>
                  <td>{{parseInt(this.nutrientData.userInfo.dailyNeedEnergy)}}kcal</td>
                  <td>{{parseInt(this.nutrientData.averageNutrient.energy)}}kcal</td>
                  <td v-if="this.nutrientData.userInfo.dailyNeedEnergy > this.nutrientData.averageNutrient.energy">
                    {{100 - parseInt((this.nutrientData.averageNutrient.energy / this.nutrientData.userInfo.dailyNeedEnergy) * 100)}}% ↓</td>
                  <td v-else>{{parseInt((this.nutrientData.averageNutrient.energy / this.nutrientData.userInfo.dailyNeedEnergy) * 100) - 100}}% ↑</td>
                </tr>
                <tr>
                  <td>나트륨</td>
                  <td>{{parseInt(this.nutrientData.dailyNeed.natrium)}}mg</td>
                  <td>{{parseInt(this.nutrientData.averageNutrient.natrium)}}mg</td>
                  <td v-if="(this.nutrientData.dailyNeed.natrium) > this.nutrientData.averageNutrient.natrium">
                    {{100 - parseInt((this.nutrientData.averageNutrient.natrium / this.nutrientData.dailyNeed.natrium) * 100)}}% ↓</td>
                  <td v-else>{{parseInt((this.nutrientData.sumENatrium / this.nutrientData.dailyNeed.natrium ) * 100) - 100}}% ↑</td>
                </tr>
                <tr>
                  <td>탄수화물</td>
                  <td>{{parseInt(this.nutrientData.dailyNeed.carbohydrate)}}g</td>
                  <td>{{parseInt(this.nutrientData.averageNutrient.carbohydrate)}}g</td>
                  <td v-if="this.nutrientData.dailyNeed.carbohydrate > this.nutrientData.averageNutrient.carbohydrate">
                    {{100 - parseInt((this.nutrientData.averageNutrient.carbohydrate / this.nutrientData.dailyNeed.carbohydrate) * 100)}}% ↓</td>
                  <td v-else>{{parseInt((this.nutrientData.averageNutrient.carbohydrate / this.nutrientData.dailyNeed.carbohydrate ) * 100) - 100}}% ↑</td>
                </tr>
                <tr>
                  <td>단백질</td>
                  <td>{{parseInt(this.nutrientData.dailyNeed.protein)}}g</td>
                  <td>{{parseInt(this.nutrientData.averageNutrient.protein)}}g</td>
                  <td v-if="this.nutrientData.dailyNeed.protein > this.nutrientData.averageNutrient.protein">
                    {{100 - parseInt((this.nutrientData.averageNutrient.protein / this.nutrientData.dailyNeed.protein) * 100)}}% ↓</td>
                  <td v-else>{{parseInt((this.nutrientData.averageNutrient.protein / this.nutrientData.dailyNeed.protein ) * 100) - 100}}% ↑</td>
                </tr>
                <tr>
                  <td>지방</td>
                  <td>{{parseInt(this.nutrientData.dailyNeed.fat)}}g</td>
                  <td>{{parseInt(this.nutrientData.averageNutrient.fat)}}g</td>
                  <td v-if="this.nutrientData.dailyNeed.fat > this.nutrientData.averageNutrient.fat">
                    {{100 - parseInt((this.nutrientData.averageNutrient.fat / this.nutrientData.dailyNeed.fat) * 100)}}% ↓</td>
                  <td v-else>{{parseInt((this.nutrientData.averageNutrient.fat / this.nutrientData.dailyNeed.fat) * 100) - 100}}% ↑</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="this.dateChecked" class="recommand-box">
          <h3 style="line-height: 2rem">부족한 영양소를 기준으로<br>다음 레시피를 추천합니다.</h3>
          <p>클릭하면 상세 레시피로 이동합니다.</p>
          <div v-for="(data, index) in this.nutrientData.recommandList" :key = index>
            <a :href="`/recipe/foodcode/${data.foodCode}/m`" target="_blank">
              <div class="recommand-card">
                <h4 style="margin-top: 3%">{{data.foodName}}</h4>
                <div class="full-card">
                  <div style="font-size: 1.15rem; margin-bottom: 0.5rem; margin: 0% 30% 0.5rem; padding: 1%; border-radius: 50px; border: 2px solid lightgray;">
                    <span>영양 정보</span>
                  </div>
                  <div class="half-card">
                    <span>열량<br>
                      탄수화물<br>
                      단백질<br>
                      지방
                    </span>
                  </div>
                  <div class="half-card">
                    <span>{{data.foodEnergy}} kcal<br>
                      {{data.foodCarbohydrate}} g<br>
                      {{data.foodProtein}} g<br>
                      {{data.foodFat}} g</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="btn-up" @click="upClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130906.png" width="20px"></button>
      <button class="btn-down" @click="downClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130907.png" width="20px"></button>
    </div>
  </body>
</template>

<script>
/* eslint-disable */
import PieChart from '@/components/chart/Pie_recommended.vue'
import PieUserChart from '@/components/chart/Pie_user.vue'
import BarChart from '@/components/chart/Bar.vue'

export default {
  components: { PieChart, PieUserChart, BarChart },
  data () {
    return {
      username: '',
      userRecipeList: [],
      month: new Date().getMonth() + 1,
      date: '',
      sundayDate1: '',
      sundayDate2: '',
      sundayDate3: '',
      sundayDate4: '',
      sundayDate5: '',
      startDate: '',
      endDate: '',
      dateChecked: false,
      nutrientData: [],
      gender: '',
      purpose: ''
    }
  },
  watch: {
    // 분석 결과 가져오기
    async date () {
      const s_date = new Date(this.date)
      const e_date = new Date(Date.parse(this.date) + 518400000)
      this.startDate = s_date.getFullYear() + '-' + ( (s_date.getMonth()+1) < 9 ? "0" + (s_date.getMonth()+1) : (s_date.getMonth()+1) )+ '-' + ( (s_date.getDate()) < 9 ? "0" + (s_date.getDate()) : (s_date.getDate()) )
      this.endDate = e_date.getFullYear() + '-' + ( (e_date.getMonth()+1) < 9 ? "0" + (e_date.getMonth()+1) : (e_date.getMonth()+1) )+ '-' + ( (e_date.getDate()) < 9 ? "0" + (e_date.getDate()) : (e_date.getDate()) )
      this.getNutrientData()
    }
  },
  setup () {},
  created () {
    this.getSundayDate()
    this.getUserInfo()
    this.getUserSurveyData()
    this.nutrientData = {
      "userInfo": {
          "maintainCalorie": 0,
          "basicMetabolicRate": 0,
          "dailyNeedEnergy": 0
      },
      "dailyNeed": {
          "carbohydrate": 0,
          "protein": 0,
          "fat": 0,
          "natrium": 0
      },
      "averageNutrient": {
          "protein": 0,
          "carbohydrate": 0,
          "fat": 0,
          "natrium": 0,
          "energy": 0
      },
      "percentCarbohydrate": 0,
      "percentProtein": 0,
      "percentFat": 0,
      "BMI": 0,
      "BMIrate": "",
      "recommandList": []
    }
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 월별로 식단 계획 불러오기
    async getUserRecipe (index) {
      this.month = index
      try {
        const response = await this.$axios.get(`http://localhost:3000/user/recipelist?month=${this.month}`, { withCredentials: true })
        this.userRecipeList = response.data
      } catch (err) {
        alert('다시 시도해주세요.')
      }
    },
    // 사용자 정보 가져오기
    async getUserInfo () {
      try {
        const url = 'http://localhost:3000/user/info'
        const res = await this.$axios.get(url, { withCredentials: true })
        if (res.data) {
          this.username = res.data.name
        } else if (res.data.message) {
          alert(res.data.message)
        }
      } catch (err) {
        alert("로그인이 필요한 기능입니다.")
        location.href('/user/login')
      }
    },
    async getUserSurveyData () {
      try {
        const url = 'http://localhost:3000/dietanalysis/analysis'
        const response = await this.$axios.get(url, { withCredentials: true })
        this.gender = response.data.gender
        if (response.data.purpose === 0) {
          this.purpose = '벌크업'
        } else if (response.data.purpose === 1) {
          this.purpose = '체중 유지'
        } else {
          this.purpose = '다이어트'
        }
      } catch (err) {
        location.reload()
      }
    },
    // 매주 일요일 날짜 구하기
    getSundayDate () {
      for (let i = 1; i <= 7; i++) {
        const date = '2022-' + this.month + '-' + i
        const date2 = new Date(date)
        const day = date2.getDay()
        if (day === 1) {
          break
        }
        this.sundayDate1 = new Date(Date.parse(date)).toLocaleDateString()
        this.sundayDate2 = new Date(Date.parse(date) + 604800000).toLocaleDateString()
        this.sundayDate3 = new Date(Date.parse(date) + 1209600000).toLocaleDateString()
        this.sundayDate4 = new Date(Date.parse(date) + 1814400000).toLocaleDateString()
        this.sundayDate5 = new Date(Date.parse(date) + 2419200000).toLocaleDateString()
      }
    },
    // 결과 가져오기
    async getNutrientData () {
      this.dateChecked = true
      try {
        const response = await this.$axios.get(`http://localhost:3000/dietanalysis/analysis/result?startDate=${this.startDate}&endDate=${this.endDate}`, { withCredentials: true })
        this.nutrientData = response.data
        console.log(response.data)
      } catch (err) {
        console.log(err)
      }
      
      // 하드코딩...
      // this.nutrientData = {
      //   "userInfo": {
      //       "maintainCalorie": 2320,
      //       "basicMetabolicRate": 2201,
      //       "dailyNeedEnergy": 2320
      //   },
      //   "dailyNeed": {
      //       "carbohydrate": 523,
      //       "protein": 243,
      //       "fat": 523,
      //       "natrium": 463
      //   },
      //   "averageNutrient": {
      //       "protein": 465,
      //       "carbohydrate": 253,
      //       "fat": 675,
      //       "natrium": 245,
      //       "energy": 1940
      //   },
      //   "percentCarbohydrate": 60,
      //   "percentProtein": 25,
      //   "percentFat": 15,
      //   "BMI": 2342,
      //   "BMIrate": "정상",
      //   "recommandList": 
      //     [ { "foodName": "둥지튀김", "foodCode": 44, "foodEnergy": 1028, "foodCarbohydrate": 149, "foodFat": 37, "foodProtein": 242 }, { "foodName": "수박즙돼지목심구이", "foodCode": 393, "foodEnergy": 229, "foodCarbohydrate": 7, "foodFat": 16, "foodProtein": 198 }, { "foodName": "돼지머리수육맑은전골", "foodCode": 84, "foodEnergy": 233, "foodCarbohydrate": 21, "foodFat": 11, "foodProtein": 104 } ]
      // }
    },
    AddDays (date, days) {
      // date는 문자열로 받는다 ex, '2020-10-15'
      var result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    },
    upClick () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    downClick () {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
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
  padding: 10px 0px;
  width:100%;
  height:auto;
  background-color:white;
  margin-top: 30px;
  margin-bottom: 110px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: auto;
}
.btn-custom {
  margin-bottom: 30px;
}
.half-box {
  width: 100%;
  height: auto;
  padding: 10px;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 500;
  vertical-align: middle;
}
.piechart-style {
  width: 100%;
  height: 300px;
  padding: 20px;
  float:left
}
.chart-box {
  width: 50%;
  display: inline-block;
  text-align: center;
}
.selectbox-m{
  height: 40px;
  margin: 2%;
  border-radius: 10px;
  background-color: #f3f3f3;
  border-color: #f3f3f3;
  padding-left:10px;
}
.recommand-card {
  width: 80%;
  margin: 5% 10%;
}
.w-30 {
  width: 30%
}
.w-60 {
  width: 62%
}
a {
  color: #212121;
  text-decoration: none
}
a:hover {
  color: #1a8051;
}
</style>
