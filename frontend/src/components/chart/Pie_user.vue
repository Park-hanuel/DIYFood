<template>
  <Pie
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
import { Pie } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'PieUserChart',
  components: {
    Pie
  },
  props: {
    percentCarbohydrate: {
      type: Number
    },
    percentFat: {
      type: Number
    },
    percentProtein: {
      type: Number
    },
    chartId: {
      type: String,
      default: 'pie-chart'
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
  watch: {
    percentCarbohydrate () {
      this.chartData.datasets[0].data = [parseInt(this.percentCarbohydrate), parseInt(this.percentProtein), parseInt(this.percentFat)]
    }
  },
  data () {
    return {
      chartData: {
        labels: ['탄수화물', '단백질', '지방'],
        datasets: [
          {
            label: '나의 섭취량',
            backgroundColor: ['#ffce56', '#37a2eb', '#fe6484'],
            data: []
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
<style>
</style>
