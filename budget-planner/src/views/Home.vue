<template>
  <div class="home container-fluid">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Total: {{totalBudgetCost | toCurrency}}</h1>
    <!--<HelloWorld msg="Welcome to Your Vue.js Application" />-->

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
      </div>
      <div class="col-lg-3">
        <healthcare-insurance-expenses @inputData="updateHealth" />
        <household-personal-expenses @inputData="updateHousehold" />
      </div>
      <div class="col-lg-3">
        <discretionary-expenses @inputData="updateDiscretionary" />
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

export default {
  name: "home",
  data() {
    return {
      HousingExpensesAmount: 0,
      TransportationExpensesAmount: 0,
      HealthcareInsuranceExpensesAmount: 0,
      HouseholdPersonalExpensesAmount: 0,
      DiscretionaryExpensesAmount: 0
    };
  },
  computed: {
    totalBudgetCost: function() {
      return (
        +this.HousingExpensesAmount +
        +this.TransportationExpensesAmount +
        +this.HealthcareInsuranceExpensesAmount +
        +this.HouseholdPersonalExpensesAmount +
        +this.DiscretionaryExpensesAmount
      );
    }
  },
  components: {
    TransportationExpenses,
    HousingExpenses,
    HealthcareInsuranceExpenses,
    HouseholdPersonalExpenses,
    DiscretionaryExpenses
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
    }
  }
};
</script>
