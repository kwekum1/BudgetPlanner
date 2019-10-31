<template>
  <div class="home container-fluid">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Total: {{ totalBudgetCost | toCurrency }}</h1>
    <button v-on:click="chartViewOnly = !chartViewOnly">Toggle Chart View</button>
    <!--<HelloWorld msg="Welcome to Your Vue.js Application" />-->
    <div class="row">
      <div v-bind:class="{'col-lg-4' : !chartViewOnly, 'col-lg-6' : chartViewOnly}">
        <chart-display
          :charttype="pieChartType"
          :displayType="moneyDisplayType"
          :chartlabels="RetrieveStandardLabels()"
          :chartdata="computedChartData"
        />
      </div>
      <div v-bind:class="{'col-lg-4' : !chartViewOnly, 'col-lg-6' : chartViewOnly}">
        <chart-display
          :charttype="barChartType"
          :displayType="moneyDisplayType"
          :chartlabels="RetrieveStandardLabels()"
          :chartdata="computedChartData"
        />
      </div>
      <div v-bind:class="{'col-lg-4' : !chartViewOnly, 'col-lg-6' : chartViewOnly}">
        <chart-display
          :charttype="polarAreaChartType"
          :displayType="percentDisplayType"
          :chartlabels="chartLabelsToDisplay"
          :chartdata="generateIncomeComparsions"
        />
      </div>
    </div>
    <div class="row" v-show="!chartViewOnly">
      <div class="col-lg-1" />
      <div class="col-lg-7">
        <div class="alert alert-primary text-left">Essential Expenses (60%)</div>
      </div>
      <div class="col-lg-3">
        <div class="alert alert-info text-left">Discretionary Expenses (20%)</div>
      </div>
      <div class="col-lg-1" />
    </div>

    <div class="row" v-show="!chartViewOnly">
      <div class="col-lg-1"></div>
      <div class="col-lg-4">
        <housing-expenses @inputData="updateHousing" />
        <transportation-expenses @inputData="updateTransportation" />
        <br />
        <br />
        <hr />
        <p>Total Monthly Expenses: {{ totalBudgetCost | toCurrency }}</p>
        <hr />
        <p>
          Net Monthly Income:
          <input
            class="text-line"
            placeholder="(Insert Here)"
            v-model="incomeInput"
          />
        </p>
        <hr />
        <div
          class="alert alert-success"
          v-bind:class="{
            'alert-success': totalSurplusDeficit > 0,
            'alert-danger': totalSurplusDeficit < 0,
            'alert-warning': totalSurplusDeficit == 0
          }"
        >
          <p>TOTAL SURPLUS/DEFICIT: {{ totalSurplusDeficit | toCurrency }}</p>
        </div>
      </div>
      <div class="col-lg-3">
        <healthcare-insurance-expenses @inputData="updateHealth" />
        <household-personal-expenses @inputData="updateHousehold" />
      </div>
      <div class="col-lg-3">
        <discretionary-expenses @inputData="updateDiscretionary" />
        <br />
        <saving-and-investing-expenses @inputData="updateSavings" />
      </div>
      <div class="col-lg-1"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import HousingExpenses from "@/components/HousingExpenses.vue";
import TransportationExpenses from "@/components/TransportationExpenses.vue";
import HealthcareInsuranceExpenses from "@/components/HealthcareInsuranceExpenses.vue";
import HouseholdPersonalExpenses from "@/components/HouseholdPersonalExpenses.vue";
import DiscretionaryExpenses from "@/components/DiscretionaryExpenses.vue";
import SavingAndInvestingExpenses from "@/components/SavingAndInvesting.vue";
import chart from "@/components/chart.vue";
import ChartDisplay from "@/components/ChartDisplay.vue";
//import store from "@/store/index.ts";

export default {
  name: "home",
  data() {
    return {
      chartViewOnly: false,
      pieChartType: "Pie",
      barChartType: "Bar",
      polarAreaChartType: "PolarArea",
      incomeInput: "",
      chartLabelsToDisplay: [],
      moneyDisplayType: "money",
      percentDisplayType: "percent",
      HousingExpensesAmount: 0,
      TransportationExpensesAmount: 0,
      HealthcareInsuranceExpensesAmount: 0,
      HouseholdPersonalExpensesAmount: 0,
      DiscretionaryExpensesAmount: 0,
      SavingAndInvestingAmount: 0
    };
  },
  computed: {
    message() {
      return this.$store.getters.count;
    },
    generateIncomeComparsions: function() {
      var ArrayOfPercentages = [0, 0, 0, 0, 0, 0];
      if (
        this.incomeInput &&
        this.incomeInput > 0 &&
        !isNaN(this.incomeInput)
      ) {
        ArrayOfPercentages = [];

        var housingPct = (
          (+this.HousingExpensesAmount / +this.incomeInput) *
          100
        ).toFixed(2);

        var healthcarePct = (
          (+this.HealthcareInsuranceExpensesAmount / +this.incomeInput) *
          100
        ).toFixed(2);
        var transportationPct = (
          (+this.TransportationExpensesAmount / +this.incomeInput) *
          100
        ).toFixed(2);
        var householdPct = (
          (+this.HouseholdPersonalExpensesAmount / +this.incomeInput) *
          100
        ).toFixed(2);
        var discretionaryPct = (
          (+this.DiscretionaryExpensesAmount / +this.incomeInput) *
          100
        ).toFixed(2);
        var SavingAndInvestingPct = (
          (+this.SavingAndInvestingAmount / +this.incomeInput) *
          100
        ).toFixed(2);
        ArrayOfPercentages.push(housingPct);
        ArrayOfPercentages.push(healthcarePct);
        ArrayOfPercentages.push(transportationPct);
        ArrayOfPercentages.push(householdPct);
        ArrayOfPercentages.push(discretionaryPct);
        ArrayOfPercentages.push(SavingAndInvestingPct);

        var ArrayLabels = this.RetrieveStandardLabels();

        const sum = ArrayOfPercentages.reduce((total, n) => total + +n, 0);

        if (sum && sum < 100) {
          var remainingPercentageOfBudgetFreeMoney = (100 - +sum).toFixed(2);
          ArrayOfPercentages.push(remainingPercentageOfBudgetFreeMoney);
          ArrayLabels.push("Remaining Cash");
        }

        this.updateLabels(ArrayLabels);
      }

      return ArrayOfPercentages;
    },
    totalBudgetCost: function() {
      return (
        +this.HousingExpensesAmount +
        +this.TransportationExpensesAmount +
        +this.HealthcareInsuranceExpensesAmount +
        +this.HouseholdPersonalExpensesAmount +
        +this.DiscretionaryExpensesAmount +
        +this.SavingAndInvestingAmount
      );
    },
    totalSurplusDeficit: function() {
      return +this.incomeInput - +this.totalBudgetCost;
    },
    computedChartData: function() {
      return [
        this.HousingExpensesAmount,
        this.HealthcareInsuranceExpensesAmount,
        this.TransportationExpensesAmount,
        this.HouseholdPersonalExpensesAmount,
        this.DiscretionaryExpensesAmount,
        this.SavingAndInvestingAmount
      ];
    }
  },
  components: {
    TransportationExpenses,
    HousingExpenses,
    HealthcareInsuranceExpenses,
    HouseholdPersonalExpenses,
    DiscretionaryExpenses,
    SavingAndInvestingExpenses,
    ChartDisplay
  },
  methods: {
    updateLabels(labels) {
      this.chartLabelsToDisplay = labels;
    },
    updateHousing(variable) {
      this.HousingExpensesAmount = variable;
    },
    updateTransportation(variable) {
      this.TransportationExpensesAmount = variable;
    },
    updateHealth(variable) {
      this.HealthcareInsuranceExpensesAmount = variable;
    },
    updateHousehold(variable) {
      this.HouseholdPersonalExpensesAmount = variable;
    },
    updateDiscretionary(variable) {
      this.DiscretionaryExpensesAmount = variable;
    },
    updateSavings(variable) {
      this.SavingAndInvestingAmount = variable;
    },
    VerifyFloat(CaptureNumber) {
      var amount;
      if (Number.isNaN(Number.parseFloat(CaptureNumber))) amount = 0;
      else amount = Number.parseFloat(CaptureNumber);
      return amount;
    },
    RetrieveStandardLabels() {
      return [
        "Housing",
        "Healthcare Expenses",
        "Transportation",
        "Household/Personal Expenses",
        "Discretionary",
        "Savings & Investing"
      ];
    }
  }
};
</script>
