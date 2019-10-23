<template>
  <div class="home container-fluid">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Total: {{totalBudgetCost | toCurrency}}</h1>
    <!--<HelloWorld msg="Welcome to Your Vue.js Application" />-->
    <div class="row">
      <div class="col-lg-4">
        <chart-display :charttype="chartType" :chartdata="computedChartData" />
      </div>
      <div class="col-lg-4"></div>
    </div>
    <div class="row">
      <div class="col-lg-1" />
      <div class="col-lg-7">
        <div class="alert alert-primary text-left">Essential Expenses (60%)</div>
      </div>
      <div class="col-lg-3">
        <div class="alert alert-info text-left">Discretionary Expenses (20%)</div>
      </div>
      <div class="col-lg-1" />
    </div>

    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-4">
        <housing-expenses @inputData="updateHousing" />
        <transportation-expenses @inputData="updateTransportation" />
        <br />
        <br />
        <hr />
        <p>Total Monthly Expenses: {{totalBudgetCost | toCurrency}}</p>
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
          v-bind:class="{ 'alert-success': totalSurplusDeficit > 0, 'alert-danger': totalSurplusDeficit < 0, 'alert-warning': totalSurplusDeficit == 0  }"
        >
          <p>TOTAL SURPLUS/DEFICIT: {{totalSurplusDeficit | toCurrency}}</p>
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

export default {
  name: "home",
  data() {
    return {
      chartType: "Pie",
      incomeInput: "",
      HousingExpensesAmount: 0,
      TransportationExpensesAmount: 0,
      HealthcareInsuranceExpensesAmount: 0,
      HouseholdPersonalExpensesAmount: 0,
      DiscretionaryExpensesAmount: 0,
      SavingAndInvestingAmount: 0
    };
  },
  computed: {
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
      return [this.HousingExpensesAmount,this.TransportationExpensesAmount,this.HealthcareInsuranceExpensesAmount,this.HouseholdPersonalExpensesAmount,this.DiscretionaryExpensesAmount,
      this.SavingAndInvestingAmount];
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
    }
  }
};
</script>
