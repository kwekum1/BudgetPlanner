<template>
  <div class="HealthcareInsuranceExpenses">
    <h3>Healthcare/Insurance Expenses</h3>
    <table class="table">
      <tr>
        <td>
          <label>Health Insurance</label>
        </td>
        <td>
          <input class="form-control" v-model="HealthInsurance" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Life Insurance</label>
        </td>
        <td>
          <input class="form-control" v-model="LifeInsurance" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Disability Income Insurance</label>
        </td>
        <td>
          <input class="form-control" v-model="DisabilityIncomeInsurance" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Long-term Care Insurance</label>
        </td>
        <td>
          <input class="form-control" v-model="LongtermCareLicense" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Medical/Dental/Drugs</label>
        </td>
        <td>
          <input class="form-control" v-model="MedicalDentalDrugs" />
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

    <span>
      <b style="padding-right:2em; font-size: 2em">{{
        HealthcareExpenseTotal | toCurrency
      }}</b>
      <button
        class="btn btn-light btn-sm"
        v-on:click="ResetHealthcareExpenses()"
      >
        Reset Healthcare Expenses
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HealthcareInsuranceExpenses extends Vue {
  HealthInsurance: string = "";
  LifeInsurance: string = "";
  DisabilityIncomeInsurance: string = "";
  LongtermCareLicense: string = "";
  MedicalDentalDrugs: string = "";
  Other: string = "";

  get HealthcareExpenseTotal(): number {
    var total: number =
      +this.VerifyFloat(this.HealthInsurance) +
      +this.VerifyFloat(this.LifeInsurance) +
      +this.VerifyFloat(this.DisabilityIncomeInsurance) +
      +this.VerifyFloat(this.LongtermCareLicense) +
      +this.VerifyFloat(this.MedicalDentalDrugs) +
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

  ResetHealthcareExpenses() {
    this.HealthInsurance = "";
    this.LifeInsurance = "";
    this.DisabilityIncomeInsurance = "";
    this.LongtermCareLicense = "";
    this.MedicalDentalDrugs = "";
    this.Other = "";
  }
}
</script>
