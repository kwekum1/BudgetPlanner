<template>
  <div class="HouseholdandPersonalExpenses">
    <h3>Household and Personal Expenses</h3>
    <table class="table">
      <tr>
        <td>
          <label>Groceries</label>
        </td>
        <td>
          <input class="form-control" v-model="Groceries" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Personal Care</label>
        </td>
        <td>
          <input class="form-control" v-model="PersonalCare" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Clothing/Dry Cleaning</label>
        </td>
        <td>
          <input class="form-control" v-model="ClothingAndDryCleaning" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Professional Dues</label>
        </td>
        <td>
          <input class="form-control" v-model="ProfessionalDues" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Cell Phone</label>
        </td>
        <td>
          <input class="form-control" v-model="CellPhone" />
        </td>
      </tr>
      <tr>
        <td>
          <input placeholder="Other (Text In Value)" />
        </td>
        <td>
          <input class="form-control" v-model="Other" />
        </td>
      </tr>
    </table>
    <button
      class="btn btn-warning"
      v-on:click="ResetHouseholdandPersonalExpenses()"
    >Reset Household Expenses</button>

    <h2>{{HouseholdandPersonalExpenseTotal | toCurrency}}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HouseholdandPersonalExpenses extends Vue {
  Groceries: string = "";
  PersonalCare: string = "";
  ClothingAndDryCleaning: string = "";
  ProfessionalDues: string = "";
  CellPhone: string = "";
  Other: string = "";

  get HouseholdandPersonalExpenseTotal(): number {
    var total: number =
      +this.VerifyFloat(this.Groceries) +
      +this.VerifyFloat(this.PersonalCare) +
      +this.VerifyFloat(this.ClothingAndDryCleaning) +
      +this.VerifyFloat(this.ProfessionalDues) +
      +this.VerifyFloat(this.CellPhone) +
      +this.VerifyFloat(this.Other);
    this.Submit(total);
    return total;
  }
  count = 0;
  increment() {
    this.count++;
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

  ResetHouseholdandPersonalExpenses() {
    this.Groceries = "";
    this.PersonalCare = "";
    this.ClothingAndDryCleaning = "";
    this.ProfessionalDues = "";
    this.CellPhone = "";
    this.Other = "";
  }
}
</script>