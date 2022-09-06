<template>
  <body id="page">
    <div style="margin-top: 40px; margin-bottom: 30px;">
      <span style="font-size:4em; font-weight:500; line-height:70px;">
        INGREDIENT PRICE
      </span>
      <span style="font-size:1.5em; font-weight:400;">
        식재료 시세를 안내합니다.
      </span>
    </div>
    <!-- 그래프, 시세표 영역 -->
    <div style="width:100%">
      <div class="graph-ingredient">
        <div style="height:40px">
          <h2>{{selectedItem}}</h2>
        </div>
        <LineChartGenerator
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        />
        <div style="margin-top:20px">
          <p>- 주말 및 공휴일에는 직전 평일 데이터로 조회됩니다.
          <br>- 당일 시세는 평일 오후에 업데이트됩니다.</p>
        </div>
      </div>
      <div style="width: 60%; float: right; text-align: center;">
        <div>
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="곡류" @click="getPriceData(100)">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="견과·버섯" @click="getPriceData(300)">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="채소류" @click="getPriceData(200)">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="과일류" @click="getPriceData(400)">
          <input type="button" class="btn btn-primary btn-lg btn-custom" value="수산물" @click="getPriceData(600)">
        </div>
        <div style="padding: 1%">
          <table class="table table-light table-custom">
            <thead class="table-bordered">
              <tr>
                <th scope="col" style="width:10%;">품목</th>
                <th scope="col" style="width:15%;">품종</th>
                <th scope="col" style="width:10%;">당일</th>
                <th scope="col" style="width:10%;">1일 전</th>
                <th scope="col" style="width:10%;">1주일 전</th>
                <th scope="col" style="width:10%;">2주일 전</th>
                <th scope="col" style="width:10%;">1개월 전</th>
                <th scope="col" style="width:10%;">1년 전</th>
                <th scope="col" style="width:10%;">그래프</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in itemList" :key="index">
                <td>{{data.item_name}}</td>
                <td>{{data.kind_name}}</td>
                <td>{{data.dpr1}}</td>
                <td>{{data.dpr2}}</td>
                <td>{{data.dpr3}}</td>
                <td>{{data.dpr4}}</td>
                <td>{{data.dpr5}}</td>
                <td>{{data.dpr6}}</td>
                <td><button class="btn" @click="selectGraph(index)"><img src="https://cdn-icons-png.flaticon.com/512/2652/2652234.png" style="width:30px"></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement)

export default {
  name: 'IngredientPage',
  components: { LineChartGenerator },
  created () {
    this.getPriceData(100)
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      chartData: {
        labels: ['1년 전', '1개월 전', '2주일 전', '1주일 전', '1일 전', '당일'],
        datasets: [
          {
            label: '최근 1년 동안의 시세 그래프',
            backgroundColor: '#ffc803',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      itemList: [],
      selectedItem: '품목을 선택해주세요'
    }
  },
  methods: {
    // 식재료 시세 불러오기
    getPriceData (code) {
      this.$axios.get('http://localhost:3000/ingredient/list?category_code=' + code).then(response => {
        console.log('### response: ' + JSON.stringify(response))
        this.itemList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 그래프 조회
    selectGraph (i) {
      this.selectedItem = this.itemList[i].item_name
      this.chartData.datasets[0].data = [Number(this.itemList[i].dpr6.replace(',', '')), Number(this.itemList[i].dpr5.replace(',', '')), Number(this.itemList[i].dpr4.replace(',', '')), Number(this.itemList[i].dpr3.replace(',', '')), Number(this.itemList[i].dpr2.replace(',', '')), Number(this.itemList[i].dpr1.replace(',', ''))]
      console.log(this.selectedItem)
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
    width: 40%;
    padding:4px;
    padding-right: 10px;
    float: left;
  }
  .btn-custom {
    width: 18%;
    font-size: 100%;
    padding: auto;
    margin: 1%;
  }
  .table-custom {
    vertical-align: middle;
    text-align: center;
    margin-top: 10px;
  }
</style>
