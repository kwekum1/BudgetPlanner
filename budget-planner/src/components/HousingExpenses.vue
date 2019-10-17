<template>
  <div class="HousingExpensesDiv form-group">
    <h3>Housing Expenses</h3>
    <table class="table">
      <tr>
        <td>
          <label>Mortgage/Rent</label>
        </td>
        <td>
          <input class="form-control" v-model="MortgageRent" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Property Taxes</label>
        </td>
        <td>
          <input class="form-control" v-model="PropertyTaxes" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Home Maintence</label>
        </td>
        <td>
          <input class="form-control" v-model="HomeMaintence" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Home Owners Insurance</label>
        </td>
        <td>
          <input class="form-control" v-model="HomeOwnersInsurance" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Home Utilities</label>
        </td>
        <td>
          <input class="form-control" v-model="HomeUtilities" />
        </td>
      </tr>
    </table>
    <button class="btn btn-primary" v-on:click="ResetHousingExpenses()">Reset Housing Expenses</button>

    <!--  <div class="alert alert-success alert-dismissible fade show" role="alert">
      With Bootstrap!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>-->

    <h2>{{HousingExpenseTotal | toCurrency}}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HousingExpenses extends Vue {
  MortgageRent: string = "";
  PropertyTaxes: string = "";
  HomeMaintence: string = "";
  HomeOwnersInsurance: string = "";
  HomeUtilities: string = "";

  get HousingExpenseTotal(): number {
    var total: number =
      +this.VerifyFloat(this.MortgageRent) +
      +this.VerifyFloat(this.PropertyTaxes) +
      +this.VerifyFloat(this.HomeMaintence) +
      +this.VerifyFloat(this.HomeOwnersInsurance) +
      +this.VerifyFloat(this.HomeUtilities);
    this.Submit(total);
    return total;
  }

  VerifyFloat(CaptureNumber: string) {
    var amount;
    if (Number.isNaN(Number.parseFloat(CaptureNumber))) amount = 0;
    else amount = Number.parseFloat(CaptureNumber);
    return amount;
  }

  Submit(totalSum: number) {
    this.$emit("inputData", totalSum);
  }

  ResetHousingExpenses() {
    this.MortgageRent = "";
    this.PropertyTaxes = "";
    this.HomeMaintence = "";
    this.HomeOwnersInsurance = "";
    this.HomeUtilities = "";
  }
}
</script>