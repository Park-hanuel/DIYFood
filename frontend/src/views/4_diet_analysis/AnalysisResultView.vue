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
          <h2 v-else>{{new Date(Date.parse(date)).toLocaleDateString()}} - {{new Date(Date.parse(date)+518400000).toLocaleDateString()}}</h2>
        </div>
        <div style="position: relative; width: 17%; float: left;">
          <select name="date" v-model="date">
            <option value="">기간을 선택해주세요.</option>
            <option v-for="item in Object.keys(this.groupBy(this.userRecipeList, 'date'))" :key="item" :value='item'>{{new Date(Date.parse(item)).toLocaleDateString()}} - {{new Date(Date.parse(item)+518400000).toLocaleDateString()}}</option>
          </select>
        </div>
      </div>
      <div class="half-box" style="border-right: 1px solid lightgray">
        <div style="text-align:center; margin-bottom: 10px;">
          <h3>3대 영양소 섭취 비율</h3>
        </div>
        <div class="chart-box">
          <p>권장 섭취량</p>
          <PieChart class="piechart-style"/>
        </div>
        <div class="chart-box">
          <p>{{username}}님의 섭취량</p>
          <PieUserChart class="piechart-style"/>
        </div>
      </div>
      <div class="half-box">
        <div style="text-align:center;">
          <h3>영양소 섭취 비교 그래프</h3>
          <BarChart />
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
      date: ''
    }
  },
  setup () {},
  created () {
    this.getUserRecipe((new Date()).getMonth() + 1)
    this.getUserInfo()
  },
  mounted () {},
  unmounted () {},
  methods: {
    // 월별로 식단 계획 불러오기
    getUserRecipe (index) {
      this.month = index
      this.$axios.get(`http://localhost:3000/user/recipelist?month=${this.month}`, { withCredentials: true }).then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.userRecipeList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 사용자 정보 가져오기
    getUserInfo () {
      const url = 'http://localhost:3000/user/info'
      this.$axios.get(url, { withCredentials: true })
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            this.username = res.data.name
          } else if (res.data.message) {
            alert(res.data.message)
          }
        })
    },
    selectDate (item) {
      this.date = item
      console.log(this.date)
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
