<template>
  <Bar
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
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    BasicMetabolicRate: {
      type: Number
    },
    dailyNeedCarbohydrate: {
      type: Number
    },
    dailyNeedEnergy: {
      type: Number
    },
    dailyNeedFat: {
      type: Number
    },
    dailyNeedNatrium: {
      type: Number
    },
    dailyNeedProtein: {
      type: Number
    },
    maintain_calorie: {
      type: Number
    },
    sumCarbohydrate: {
      type: Number
    },
    sumEnergy: {
      type: Number
    },
    sumFat: {
      type: Number
    },
    sumNatrium: {
      type: Number
    },
    sumProtein: {
      type: Number
    },
    chartId: {
      type: String,
      default: 'bar-chart'
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
  created () {
  },
  watch: {
    sumEnergy () {
      this.chartData.datasets[0].data = [this.dailyNeedEnergy / 10, this.dailyNeedNatrium / 10, this.dailyNeedCarbohydrate, this.dailyNeedProtein, this.dailyNeedFat]
      this.chartData.datasets[1].data = [this.sumEnergy / 10, this.sumNatrium / 10, this.sumCarbohydrate, this.sumProtein, this.sumFat]
    }
  },
  data () {
    return {
      chartData: {
        labels: [
          '열량',
          '나트륨',
          '탄수화물',
          '단백질',
          '지방'
        ],
        datasets: [
          {
            label: '권장 섭취량',
            backgroundColor: '#4ac1c0',
            data: [],
            borderRadius: 5
          },
          {
            label: '나의 섭취량',
            backgroundColor: '#9565f9',
            data: [],
            borderRadius: 5
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>
