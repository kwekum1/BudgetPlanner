<template>
  <div class="TransportationExpenses">
    <h3>Transportation Expenses</h3>
    <table class="table">
      <tr>
        <td>
          <label>Auto Payments</label>
        </td>
        <td>
          <input class="form-control" v-model="AutoPayments" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Auto Insurance</label>
        </td>
        <td>
          <input class="form-control" v-model="AutoInsurance" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Gas</label>
        </td>
        <td>
          <input class="form-control" v-model="Gas" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Maintenance/License</label>
        </td>
        <td>
          <input class="form-control" v-model="MaintenanceLicense" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Parking/Tolls/Bus/Train</label>
        </td>
        <td>
          <input class="form-control" v-model="ParkingTollsBusTrain" />
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
        TransportationExpenseTotal | toCurrency
      }}</b>
      <button
        class="btn btn-light btn-sm"
        v-on:click="ResetTransportationExpenses()"
      >
        Reset Transportation Expenses
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TransportationExpenses extends Vue {
  AutoPayments: string = "";
  AutoInsurance: string = "";
  Gas: string = "";
  MaintenanceLicense: string = "";
  ParkingTollsBusTrain: string = "";
  Other: string = "";

  get TransportationExpenseTotal(): number {
    var total: number =
      +this.VerifyFloat(this.AutoPayments) +
      +this.VerifyFloat(this.AutoInsurance) +
      +this.VerifyFloat(this.Gas) +
      +this.VerifyFloat(this.MaintenanceLicense) +
      +this.VerifyFloat(this.ParkingTollsBusTrain) +
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

  ResetTransportationExpenses() {
    this.AutoPayments = "";
    this.AutoInsurance = "";
    this.Gas = "";
    this.MaintenanceLicense = "";
    this.ParkingTollsBusTrain = "";
    this.Other = "";
  }
}
</script>
