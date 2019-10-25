<template>
  <div id="app">
    <canvas id="planet-chart" width="200" height="200"></canvas>
  </div>
</template>

<script type="text/javascript">
import Chart from "chart.js";
import planetChartData from "./chart-data.js";

export default {
  name: "chart",
  props: [],
  data() {
    return {
      planetChartData: planetChartData
    };
  },
  mounted() {
    this.createChart("planet-chart", this.planetChartData);
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  }
};
</script>
