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
  </div>
</template>

<script>
import LineChart from "./ChartTypes/LineChart.js";
import DoughnutChart from "./ChartTypes/DoughnutChart.js";

export default {
  name: "ChartDisplay",
  components: {
    LineChart,
    DoughnutChart
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
              var label = data.labels[tooltipItem.index];
              var value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return label + ": $" + value;
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