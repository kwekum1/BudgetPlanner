<template>
  <div class="home container-fluid">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Total: {{totalBudgetCost | toCurrency}}</h1>
    <!--<HelloWorld msg="Welcome to Your Vue.js Application" />-->
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-4">
        <housing-expenses @inputData="updateMessage" />
      </div>
      <div class="col-lg-3">
        <housing-expenses />
      </div>
      <div class="col-lg-3">
        <housing-expenses />
      </div>
      <div class="col-lg-1"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import HousingExpenses from "@/components/HousingExpenses.vue";

export default {
  name: "home",
  data() {
    return {
      HousingExpensesAmount: 0
    };
  },
  computed: {
    totalBudgetCost: function() {
      return this.HousingExpensesAmount;
    }
  },
  components: {
    //HelloWorld,
    HousingExpenses
  },
  methods: {
    updateMessage(variable) {
      this.HousingExpensesAmount = variable;
    }
  }
};
</script>
