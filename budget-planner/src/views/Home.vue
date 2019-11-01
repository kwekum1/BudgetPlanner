<template>
  <div class="home container-fluid">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <h1>Welcome to the Budget Planner</h1>
    <h2>"If you fail to plan, you plan to fail"</h2>
    <h2>Use this tool to help you plan out a working monthly budget</h2>
    <br />
    <h3>Total Budget Spending: {{ totalBudgetCost | toCurrency }}</h3>
    <h3>Total Spending After Income: {{ totalSurplusDeficit | toCurrency }}</h3>
    <hr />
    <br />
    <button v-on:click="chartViewOnly = !chartViewOnly">Toggle Chart View</button>
    <br />
    <br />
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
        <br />
      </div>
    </div>
    <div class="row" v-show="!chartViewOnly">
      <div class="col-lg-1" />
      <div class="col-lg-7">
        <div class="alert alert-primary text-left">
          Recommended Max Essential Expenses (60%)
          <span
            v-if="$store.state.incomeInput && totalBudgetCost"
          >| Actual Percentage {{getEssentialExpensesSpendingPercentage}}%</span>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="alert alert-info text-left">
          Max Discretionary Expenses (20%)
          <span
            v-if="$store.state.incomeInput && totalBudgetCost"
          >| Actual Percentage {{getDiscretionarySpendingPercentage}}%</span>
        </div>
      </div>
      <div class="col-lg-1" />
    </div>

    <div class="row" v-show="!chartViewOnly">
      <div class="col-lg-1"></div>
      <div class="col-lg-4">
        <budget-category-expense
          @inputData="updateHousing"
          :BudgetCategoryTitle="'Housing Expenses'"
          :IdentifiedBudgetCategoryId="1"
        />
        <budget-category-expense
          @inputData="updateTransportation"
          :BudgetCategoryTitle="'Transportation Expenses'"
          :IdentifiedBudgetCategoryId="2"
        />
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
            v-model="$store.state.incomeInput"
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
        <budget-category-expense
          @inputData="updateHealth"
          :BudgetCategoryTitle="'Healthcare/Insurance Expenses'"
          :IdentifiedBudgetCategoryId="3"
        />
        <budget-category-expense
          @inputData="updateHousehold"
          :BudgetCategoryTitle="'Household and Personal Expenses'"
          :IdentifiedBudgetCategoryId="4"
        />
      </div>
      <div class="col-lg-3">
        <budget-category-expense
          @inputData="updateDiscretionary"
          :BudgetCategoryTitle="'Discretionary Expenses'"
          :IdentifiedBudgetCategoryId="5"
        />
        <br />
        <div class="card">
          <div class="card-header bg-warning">
            <h3>Saving And Investing</h3>
            <h6>
              (Min 20%)
              <span
                v-if="$store.state.incomeInput && totalBudgetCost"
              >| Actual Percentage {{getSavingsPercentage}}%</span>
            </h6>
          </div>
          <div class="card-body">
            <budget-category-expense
              @inputData="updateSavings"
              :BudgetCategoryTitle="''"
              :IdentifiedBudgetCategoryId="6"
            />
          </div>
        </div>
        <br />
        <br />
      </div>
      <div class="col-lg-1"></div>
    </div>
    <footer>
      <p>
        <i>Version {{message}}</i>
      </p>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import chart from "@/components/chart.vue";
import ChartDisplay from "@/components/ChartDisplay.vue";
import BudgetCategoryExpense from "@/components/BudgetCategoryExpense.vue";

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
      return this.$store.getters.getVersion;
    },
    getEssentialExpensesSpendingPercentage() {
      return (
        ((+this.HousingExpensesAmount +
          +this.TransportationExpensesAmount +
          +this.HealthcareInsuranceExpensesAmount +
          +this.HouseholdPersonalExpensesAmount) /
          +this.totalBudgetCost) *
        100
      ).toFixed(2);
    },
    getDiscretionarySpendingPercentage() {
      return (
        (+this.DiscretionaryExpensesAmount / +this.totalBudgetCost) *
        100
      ).toFixed(2);
    },
    getSavingsPercentage() {
      return (
        (+this.SavingAndInvestingAmount / +this.totalBudgetCost) *
        100
      ).toFixed(2);
    },
    generateIncomeComparsions: function() {
      var ArrayOfPercentages = [0, 0, 0, 0, 0, 0];
      if (
        this.$store.state.incomeInput &&
        this.$store.state.incomeInput > 0 &&
        !isNaN(this.$store.state.incomeInput)
      ) {
        ArrayOfPercentages = [];

        var housingPct = (
          (+this.HousingExpensesAmount / +this.$store.state.incomeInput) *
          100
        ).toFixed(2);

        var healthcarePct = (
          (+this.HealthcareInsuranceExpensesAmount /
            +this.$store.state.incomeInput) *
          100
        ).toFixed(2);
        var transportationPct = (
          (+this.TransportationExpensesAmount /
            +this.$store.state.incomeInput) *
          100
        ).toFixed(2);
        var householdPct = (
          (+this.HouseholdPersonalExpensesAmount /
            +this.$store.state.incomeInput) *
          100
        ).toFixed(2);
        var discretionaryPct = (
          (+this.DiscretionaryExpensesAmount / +this.$store.state.incomeInput) *
          100
        ).toFixed(2);
        var SavingAndInvestingPct = (
          (+this.SavingAndInvestingAmount / +this.$store.state.incomeInput) *
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
      return +this.$store.state.incomeInput - +this.totalBudgetCost;
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
    ChartDisplay,
    BudgetCategoryExpense
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
