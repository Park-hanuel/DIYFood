<template>
  <body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <span style="font-size:4em; font-weight:500; line-height:70px;">
        DIET ANALYSIS
      </span>
      <span style="font-size:1.5em; font-weight:400;">
        {{username}}님의 식단 계획 데이터를 기반으로 영양 섭취를 분석합니다.
      </span>
    </div>
    <div class="content-box">
      <div style="width:100%; height:100px; padding: 30px; padding-right: 50px; padding-left: 50px; vertical-align: middle; display: inline-block;">
        <div style="text-align: center; width: 83%; float: left; padding-left: 18%;">
          <h2 v-if="this.date === ''" >기간을 선택해주세요 → </h2>
          <h1 v-else>{{new Date(Date.parse(date)).toLocaleDateString()}} - {{new Date(Date.parse(date)+518400000).toLocaleDateString()}}</h1>
        </div>
        <div style="position: relative; width: 17%; float: left;">
          <select name="date" v-model="date">
            <option value="">기간을 선택해주세요.</option>
            <option v-for="item in Object.keys(this.groupBy(this.userRecipeList, 'date'))" :key="item" :value='item'>{{new Date(Date.parse(item)).toLocaleDateString()}} - {{new Date(Date.parse(item)+518400000).toLocaleDateString()}}</option>
          </select>
        </div>
      </div>
      <div class="half-box">
        <div style="text-align:center; margin-bottom: 10px;">
          <h3>3대 영양소 섭취 비율</h3>
        </div>
        <div class="chart-box">
          <p>권장 섭취 비율</p>
          <PieChart class="piechart-style"/>
        </div>
        <div class="chart-box">
          <p>{{username}}님의 섭취 비율</p>
          <PieUserChart
            class="piechart-style"
            :percentCarbohydrate="this.nutrientData.percentCarbohydrate"
            :percentFat="this.nutrientData.percentFat"
            :percentProtein="this.nutrientData.percentProtein"/>
        </div>
        <div v-if="this.dateChecked" style="font-size: 1rem; text-align: center;">
          <p>🥄 3대 영양소 권장 섭취 비율
            <br><b>탄수화물 50%, 단백질 30%, 지방 20%</b></p>
          <p>🥄 선택하신 기간 동안 <b>{{username}}</b>님의 3대 영양소 섭취 비율
            <br><b>탄수화물 {{parseInt(nutrientData.percentCarbohydrate)}}%, 단백질 {{parseInt(nutrientData.percentProtein)}}%, 지방 {{parseInt(nutrientData.percentFat)}}%</b></p>
          <p><b>탄수화물</b> 섭취를
            <b>
              <span v-if="this.nutrientData.percentCarbohydrate > 50" style="color:orangered">줄이고</span>
              <span v-else style="color:dodgerblue">늘리고</span>
            </b>,
            <b> 단백질</b> 섭취를
            <b>
              <span v-if="this.nutrientData.percentProtein > 30" style="color:orangered">줄이고</span>
              <span v-else style="color:dodgerblue">늘리고</span>
            </b>,
            <b> 지방</b> 섭취는
            <b>
              <span v-if="this.nutrientData.percentFat > 20" style="color:orangered">줄이도록</span>
              <span v-else style="color:dodgerblue">늘리도록</span>
            </b>
            노력해보세요!
          </p>
        </div>
      </div>
      <div class="half-box"  style="border-left: 1px solid lightgray">
        <div style="text-align:center; ">
          <h3>영양소 섭취 비교 그래프</h3>
          <BarChart
            :BasicMetabolicRate="this.nutrientData.BasicMetabolicRate"
            :dailyNeedCarbohydrate="this.nutrientData.dailyNeedCarbohydrate"
            :dailyNeedEnergy="this.nutrientData.dailyNeedEnergy"
            :dailyNeedFat="this.nutrientData.dailyNeedFat"
            :dailyNeedNatrium="this.nutrientData.dailyNeedNatrium"
            :dailyNeedProtein="this.nutrientData.dailyNeedProtein"
            :maintain_calorie="this.nutrientData.maintain_calorie"
            :sumCarbohydrate="this.nutrientData.sumCarbohydrate"
            :sumEnergy="this.nutrientData.sumEnergy"
            :sumFat="this.nutrientData.sumFat"
            :sumNatrium="this.nutrientData.sumNatrium"
            :sumProtein="this.nutrientData.sumProtein"/>
        </div>
        <div v-if="this.dateChecked" style="font-size: 1rem; margin-top: 30px;">
          <p>
            <b>{{username}}</b>님의 신체 정보로 계산한 <b>기초 대사량</b>은
            <b>{{this.nutrientData.BasicMetabolicRate}}kcal</b>이고
            <br><b>{{username}}</b>님의 목표인 <b>{{purpose}}</b>을(를) 이루기 위한 <b>기초 대사량</b>은 <b>{{parseInt(this.nutrientData.maintain_calorie)}}kcal</b>입니다.
          </p>
          <p><b>{{username}}</b>님의 <b>BMI 지수</b>(체질량 지수)는 <b>{{parseInt(this.nutrientData.BMI)}}</b>이고 <b>{{this.nutrientData.BMIrate}}</b>입니다.</p>
          <table class="table" style="vertical-align: middle; text-align: center;">
            <thead class="table-bordered">
              <tr>
                <th scope="col">영양소</th>
                <th scope="col">권장 섭취량</th>
                <th scope="col">나의 섭취량</th>
                <th scope="col">비교</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>열량</td>
                <td>{{parseInt(this.nutrientData.dailyNeedEnergy)}}kcal</td>
                <td>{{parseInt(this.nutrientData.sumEnergy)}}kcal</td>
                <td v-if="this.nutrientData.dailyNeedEnergy > this.nutrientData.sumEnergy">
                  {{100 - parseInt((this.nutrientData.sumEnergy / this.nutrientData.dailyNeedEnergy) * 100)}}% ↓</td>
                <td v-else>{{parseInt((this.nutrientData.sumEnergy / this.nutrientData.dailyNeedEnergy) * 100) - 100}}% ↑</td>
              </tr>
              <tr>
                <td>나트륨</td>
                <td>{{this.nutrientData.dailyNeedNatrium}}mg</td>
                <td>{{this.nutrientData.sumNatrium}}mg</td>
                <td v-if="this.nutrientData.dailyNeedNatrium > this.nutrientData.sumNatrium">
                  {{100 - parseInt((this.nutrientData.sumNatrium / this.nutrientData.dailyNeedNatrium) * 100)}}% ↓</td>
                <td v-else>{{parseInt((this.nutrientData.sumENatrium / this.nutrientData.dailyNeedNatrium ) * 100) - 100}}% ↑</td>
              </tr>
              <tr>
                <td>탄수화물</td>
                <td>{{this.nutrientData.dailyNeedCarbohydrate}}g</td>
                <td>{{this.nutrientData.sumCarbohydrate}}g</td>
                <td v-if="this.nutrientData.dailyNeedCarbohydrate > this.nutrientData.sumCarbohydrate">
                  {{100 - parseInt((this.nutrientData.sumCarbohydrate / this.nutrientData.dailyNeedCarbohydrate) * 100)}}% ↓</td>
                <td v-else>{{parseInt((this.nutrientData.sumCarbohydrate / this.nutrientData.dailyNeedCarbohydrate ) * 100) - 100}}% ↑</td>
              </tr>
              <tr>
                <td>단백질</td>
                <td>{{this.nutrientData.dailyNeedProtein}}g</td>
                <td>{{this.nutrientData.sumProtein}}g</td>
                <td v-if="this.nutrientData.dailyNeedProtein > this.nutrientData.sumProtein">
                  {{100 - parseInt((this.nutrientData.sumProtein / this.nutrientData.dailyNeedProtein) * 100)}}% ↓</td>
                <td v-else>{{parseInt((this.nutrientData.sumProtein / this.nutrientData.dailyNeedProtein ) * 100) - 100}}% ↑</td>
              </tr>
              <tr>
                <td>지방</td>
                <td>{{this.nutrientData.dailyNeedFat}}g</td>
                <td>{{this.nutrientData.sumFat}}g</td>
                <td v-if="this.nutrientData.dailyNeedFat > this.nutrientData.sumFat">
                  {{100 - parseInt((this.nutrientData.sumFat / this.nutrientData.dailyNeedFat) * 100)}}% ↓</td>
                <td v-else>{{parseInt((this.nutrientData.sumFat / this.nutrientData.dailyNeedFat) * 100) - 100}}% ↑</td>
              </tr>
            </tbody>
          </table>
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
import PieChart from '@/components/chart/Pie_recommended.vue'
import PieUserChart from '@/components/chart/Pie_user.vue'
import BarChart from '@/components/chart/Bar.vue'

export default {
  components: { PieChart, PieUserChart, BarChart },
  data () {
    return {
      username: '',
      userRecipeList: [],
      date: '',
      dateChecked: false,
      nutrientData: [],
      gender: '',
      purpose: ''
    }
  },
  watch: {
    async date () {
      try {
        const response = await this.$axios.get(`http://3.39.156.154:3000/dietanalysis/analysis/result?date=${this.date}`, { withCredentials: true })
        this.nutrientData = response.data
        this.dateChecked = true
      } catch (err) {
        alert('다시 시도해주세요.')
      }
    }
  },
  setup () {},
  created () {
    this.getUserRecipe((new Date()).getMonth() + 1)
    this.getUserInfo()
    this.getUserSurveyData()
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 월별로 식단 계획 불러오기
    async getUserRecipe (index) {
      this.month = index
      try {
        const response = await this.$axios.get(`http://3.39.156.154:3000/user/recipelist?month=${this.month}`, { withCredentials: true })
        this.userRecipeList = response.data
      } catch (err) {
        alert('다시 시도해주세요.')
      }
    },
    // 사용자 정보 가져오기
    async getUserInfo () {
      try {
        const url = 'http://3.39.156.154:3000/user/info'
        const res = await this.$axios.get(url, { withCredentials: true })
        if (res.data) {
          this.username = res.data.name
        } else if (res.data.message) {
          alert(res.data.message)
        }
      } catch (err) {
        location.reload()
      }
    },
    async getUserSurveyData () {
      try {
        const url = 'http://3.39.156.154:3000/dietanalysis/analysis'
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
    selectDate (item) {
      this.date = item
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
    },
    // 날짜 더하기
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
  width:100%;
  height:auto;
  background-color:white;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: auto;
}
.btn-custom {
  margin-bottom: 30px;
}
.half-box {
  width: 50%;
  height: auto;
  padding-right: 50px;
  padding-left: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: inline-block;
  float: left;
  font-size: 1.3rem;
  font-weight: 500;
  vertical-align: middle;
}
.piechart-style {
  width: 100%;
  padding: 20px;
  float:left
}
.chart-box {
  width: 50%;
  display: inline-block;
  text-align: center;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
select {
  /* 생략 */
  font-family: "Noto Sansf KR", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;

  color: #444;
  background-color: #ffffff;

  padding: 0.6em 1.4em 0.5em 0.8em;
  margin: 0;

  border: 1px solid #aaa;
  border-radius: 0.5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
}
select:hover {
  border-color: #888;
}
select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
select:disabled {
  opacity: 0.5;
}
</style>
