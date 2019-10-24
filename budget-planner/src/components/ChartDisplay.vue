<template>
  <div>
    <line-chart
      v-if="charttype === 'Line'"
      :height="200"
      :chart-data="datacollection"
      :options="options"
    ></line-chart>
    <doughnut-chart
      v-if="charttype === 'Pie'"
      :height="200"
      :chart-data="datacollection"
      :options="options"
    ></doughnut-chart>
    <bar-chart
      v-if="charttype === 'Bar'"
      :height="200"
      :chart-data="datacollection"
      :options="options"
    ></bar-chart>
    <polar-area
      v-if="charttype === 'PolarArea'"
      :height="200"
      :chart-data="datacollection"
      :options="options"
    ></polar-area>
  </div>
</template>

<script>
import LineChart from "./ChartTypes/LineChart.js";
import DoughnutChart from "./ChartTypes/DoughnutChart.js";
import BarChart from "./ChartTypes/BarChart.js";
import PolarArea from "./ChartTypes/PolarArea";

export default {
  name: "ChartDisplay",
  components: {
    LineChart,
    DoughnutChart,
    BarChart,
    PolarArea
  },
  props: ["charttype", "chartdata"],
  data() {
    return {
      datacollection: {},
      options: null
    };
  },
  mounted() {
    this.fillData();
    this.fillOptions();
  },
  watch: {
    chartdata: function(info) {
      this.fillData();
    }
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          "Housing",
          "Healthcare Expenses",
          "Transportation",
          "Household/Personal Expenses",
          "Discretionary",
          "Savings & Investing"
        ],
        datasets: [
          {
            label: "Spending Chart",
            backgroundColor: [
              "#f87979",
              "#29b527",
              "#8987b9",
              "#45729e",
              "#d6ad24",
              "#73d3e4"
            ],
            data: this.chartdata
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    fillOptions() {
      this.options = {
        title: {
          display: true,
          text: "Budgeting Chart Information"
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {

              const sum = data.datasets[tooltipItem.datasetIndex].data.reduce((total, n) => total + n, 0);


              var label = data.labels[tooltipItem.index];
              var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              var percentage = ((value /  sum)* 100).toFixed(2);
              return label + ": $" + value + " | " + percentage + "% of budget";
            }
          }
        }
      };
    }
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>