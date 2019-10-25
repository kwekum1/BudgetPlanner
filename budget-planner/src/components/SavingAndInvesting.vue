<template>
  <div class="card">
    <div class="card-header bg-warning">
      <h3>Saving And Investing</h3>
      <h6>(20%)</h6>
    </div>
    <div class="card-body">
      <div class="SavingAndInvesting">
        <table class="table">
          <tr>
            <td>
              <label>Emergency Fund</label>
            </td>
            <td>
              <input class="form-control" v-model="EmergencyFund" />
            </td>
          </tr>
          <tr>
            <td>
              <label>College Savings</label>
            </td>
            <td>
              <input class="form-control" v-model="CollegeSavings" />
            </td>
          </tr>
          <tr>
            <td>
              <label>Short/Mid-Term Needs</label>
            </td>
            <td>
              <input class="form-control" v-model="ShortMidNeeds" />
            </td>
          </tr>
          <tr>
            <td>
              <label>Retirement Savings</label>
            </td>
            <td>
              <input class="form-control" v-model="Retirement" />
            </td>
          </tr>
          <tr>
            <td>
              <label>Misc.</label>
            </td>
            <td>
              <input class="form-control" v-model="Misc" />
            </td>
          </tr>
          <tr>
            <td>
              <input placeholder="Other (Text In Value)" />
            </td>
            <td>
              <input class="form-control" v-model="Other1" />
            </td>
          </tr>
        </table>

        <span>
          <b style="padding-right:2em; font-size: 2em">{{
            SavingAndInvestingTotal | toCurrency
          }}</b>
          <button
            class="btn btn-light btn-sm"
            v-on:click="ResetSavingAndInvesting()"
          >
            Reset Saving And Investing
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SavingAndInvesting extends Vue {
  EmergencyFund: string = "";
  CollegeSavings: string = "";
  ShortMidNeeds: string = "";
  Retirement: string = "";
  Misc: string = "";
  Other1: string = "";

  get SavingAndInvestingTotal(): number {
    var total: number =
      +this.VerifyFloat(this.EmergencyFund) +
      +this.VerifyFloat(this.CollegeSavings) +
      +this.VerifyFloat(this.ShortMidNeeds) +
      +this.VerifyFloat(this.Retirement) +
      +this.VerifyFloat(this.Misc) +
      +this.VerifyFloat(this.Other1);
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

  ResetSavingAndInvesting() {
    this.EmergencyFund = "";
    this.CollegeSavings = "";
    this.ShortMidNeeds = "";
    this.Retirement = "";
    this.Misc = "";
    this.Other1 = "";
  }
}
</script>
