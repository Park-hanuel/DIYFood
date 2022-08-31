<template>
  <body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px; text-align: center;">
      <p style="font-size:4em; font-weight:500; line-height:70px;">
        INGREDIENT PRICE
      </p>
      <p style="font-size:1.5em; font-weight:400;">
        식재료 시세를 안내합니다.
      </p>
    </div>
    <!-- 그래프, 시세표 영역 -->
    <div style="width:100%">
      <div class="graph-ingredient">
        <LineChart
        ref="LineChart"/>
      </div>
      <div style="width: 50%; float: right;">
        <div>
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="곡류" @click="searchItem('1')">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="견과·버섯" @click="searchItem('3')">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="채소류" @click="searchItem('2')">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="과일류" @click="searchItem('4')">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="축산물" @click="searchItem('5')">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="수산물" @click="searchItem('6')">
        </div>
        <table class="table table-light table-custom">
          <thead class="table-bordered">
            <tr>
              <th scope="col" style="width:14%;">품목</th>
              <th scope="col" style="width:14%;">1일 전</th>
              <th scope="col" style="width:14%;">1주일 전</th>
              <th scope="col" style="width:14%;">2주일 전</th>
              <th scope="col" style="width:14%;">1개월 전</th>
              <th scope="col" style="width:14%;">1년 전</th>
              <th scope="col" style="width:14%;">그래프</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">쌀</td>
              <td>47784</td>
              <td>48882</td>
              <td>48322</td>
              <td>50534</td>
              <td>61637</td>
              <td><button class="btn" @click="selectGraph()"><img src="https://cdn-icons-png.flaticon.com/512/2652/2652234.png" style="width:30px"></button></td>
            </tr>
            <tr>
              <td scope="row">찹쌀</td>
              <td>3770</td>
              <td>3850</td>
              <td>3885</td>
              <td>3836</td>
              <td>5000</td>
              <td><button class="btn"><img src="https://cdn-icons-png.flaticon.com/512/2652/2652234.png" style="width:30px"></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</template>

<script>
import LineChart from '@/components/LineChart'

export default {
  name: 'App',
  components: { LineChart },
  methods: {
    // 종류 버튼 아이템 필터링 이벤트
    searchItem (code) {
      // eslint-disable-next-line
      this.itemList = this.metaItemList.filter(item => parseInt(item.itemCode / 100) == code)
    },
    // 그래프 조회
    selectGraph () {
      this.$refs.LineChart.changeData()
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
  .chart-style {
    width: 50%;
    padding: 50px;
  }
  .graph-ingredient {
    width: 50%;
    float: left;
  }
  .btn-custom {
    width: 15%;
    font-size: 100%;
    padding: auto;
    margin: 0.8%;
  }
  .table-custom {
    vertical-align: middle;
    text-align: center;
    margin-top: 10px;
  }
</style>
