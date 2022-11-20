<template>
  <body id="page-m">
    <div>
      <span style="font-size:2.1em; font-weight:500; line-height:70px;">
        INGREDIENT PRICE
      </span>
    </div>
    <!-- 그래프, 시세표 영역 -->
    <div style="width:100%;margin-bottom:100px">
      <div>
        <div style="height:40px">
          <span style="font-size: 1.5rem; font-weight:500">{{selectedItem}} </span>
          <span style="font-size: 1rem; font-weight:500"> {{selectedKind}}</span>
        </div>
        <div>
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
        </div>
        <div style="margin-top:20px; font-size: 0.8rem;">
          <p>- 주말 및 공휴일에는 직전 평일 데이터로 조회됩니다.
          <br>- 당일 시세는 평일 오후에 업데이트됩니다.
          <br>- 항목을 클릭하면 시세 그래프를 보실 수 있습니다.</p>
        </div>
      </div>
      <div style="width: 100%; text-align: center;">
        <div>
          <input v-if="this.categoryCode !== 100" type="button" class="btn btn-primary btn-md btn-custom" value="곡류" @click="getPriceData(100)">
          <input v-if="this.categoryCode === 100" type="button" class="btn btn-clicked btn-md btn-custom" value="곡류" @click="getPriceData(100)">

          <input v-if="this.categoryCode !== 300" type="button" class="btn btn-primary btn-md btn-custom" value="견과·버섯" @click="getPriceData(300)">
          <input v-if="this.categoryCode === 300" type="button" class="btn btn-clicked btn-md btn-custom" value="견과·버섯" @click="getPriceData(300)">

          <input v-if="this.categoryCode !== 200" type="button" class="btn btn-primary btn-md btn-custom" value="채소류" @click="getPriceData(200)">
          <input v-if="this.categoryCode === 200" type="button" class="btn btn-clicked btn-md btn-custom" value="채소류" @click="getPriceData(200)">

          <input v-if="this.categoryCode !== 400" type="button" class="btn btn-primary btn-md btn-custom" value="과일류" @click="getPriceData(400)">
          <input v-if="this.categoryCode === 400" type="button" class="btn btn-clicked btn-md btn-custom" value="과일류" @click="getPriceData(400)">

          <input v-if="this.categoryCode !== 500" type="button" class="btn btn-primary btn-md btn-custom" value="축산물" @click="getPriceData(500)">
          <input v-if="this.categoryCode === 500" type="button" class="btn btn-clicked btn-md btn-custom" value="축산물" @click="getPriceData(500)">

          <input v-if="this.categoryCode !== 600" type="button" class="btn btn-primary btn-md btn-custom" value="수산물" @click="getPriceData(600)">
          <input v-if="this.categoryCode === 600" type="button" class="btn btn-clicked btn-md btn-custom" value="수산물" @click="getPriceData(600)">
        </div>
        <div>
          <table class="table table-light table-custom">
            <thead class="table-bordered">
              <tr>
                <th scope="col" style="width:30%;">품목</th>
                <th scope="col" style="width:40%;">품종</th>
                <th scope="col" style="width:15%;">당일</th>
                <th scope="col" style="width:15%;">1일 전</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in itemList" :key="index" @click="selectGraph(index)">
                <td>{{data.item_name}}</td>
                <td>{{data.kind_name}}</td>
                <td>{{data.dpr1}}</td>
                <td>{{data.dpr2}}</td>
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
      default: 300
    },
    height: {
      type: Number,
      default: 300
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
      selectedItem: '품목을 선택해주세요',
      selectedKind: '',
      categoryCode: 100
    }
  },
  methods: {
    // 식재료 시세 불러오기
    async getPriceData (code) {
      try {
        const response = await this.$axios.get('http://localhost:3000/ingredient/list?category_code=' + code)
        this.itemList = response.data
        this.categoryCode = code
        console.log(response.data)
      } catch (err) {
        alert('정보를 불러오지 못했습니다.')
      }
    },
    // 그래프 조회
    selectGraph (i) {
      this.selectedItem = this.itemList[i].item_name
      this.selectedKind = this.itemList[i].kind_name
      this.chartData.datasets[0].data = [Number(this.itemList[i].dpr6.replace(',', '')), Number(this.itemList[i].dpr5.replace(',', '')), Number(this.itemList[i].dpr4.replace(',', '')), Number(this.itemList[i].dpr3.replace(',', '')), Number(this.itemList[i].dpr2.replace(',', '')), Number(this.itemList[i].dpr1.replace(',', ''))]
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style>
  @import "@/css/styles.css";
  body{
    background: white;
    padding-left: 3%;
    padding-right: 3%;}
  .chart-style {
    padding: 50px;
    width: 100%;
  }
  .graph-ingredient {
    padding:4px;
    padding-right: 10px;
    float: left;
  }
  .btn-custom {
    width: 30%;
    font-size: 100%;
    margin: 1%;
    padding-left: 0;
    padding-right:0;
  }
  .table-custom {
    vertical-align: middle;
    text-align: center;
    margin-top: 10px;
  }
</style>
