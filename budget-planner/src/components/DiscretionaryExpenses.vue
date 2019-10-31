<template>
  <div class="DiscretionaryExpenses">
    <h3>Discretionary Expenses</h3>
    <table class="table">
      <tr>
        <td>
          <label>Cable/Phone/Internet</label>
        </td>
        <td>
          <input type="number" class="form-control" v-model="CablePhoneInternet" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Dining Out</label>
        </td>
        <td>
          <input type="number" class="form-control" v-model="DiningOut" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Recreation Club Dues</label>
        </td>
        <td>
          <input type="number" class="form-control" v-model="RecClubDues" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Movies/Sporting Events</label>
        </td>
        <td>
          <input type="number" class="form-control" v-model="MoviesAndEvents" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Hobbies</label>
        </td>
        <td>
          <input type="number" class="form-control" v-model="Hobbies" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Vacation/Travel</label>
        </td>
        <td>
          <input type="number" class="form-control" v-model="Vacay" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Gifts/Contributions</label>
        </td>
        <td>
          <input type="number" class="form-control" v-model="Gifts" />
        </td>
      </tr>
      <tr>
        <td>
          <label>Misc.</label>
        </td>
        <td>
          <input type="number" class="form-control" v-model="Misc" />
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
      <tr>
        <td>
          <input placeholder="Other (Text In Value)" />
        </td>
        <td>
          <input class="form-control" v-model="Other2" />
        </td>
      </tr>
      <tr>
        <td>
          <input placeholder="Other (Text In Value)" />
        </td>
        <td>
          <input class="form-control" v-model="Other3" />
        </td>
      </tr>
      <tr>
        <td>
          <input placeholder="Other (Text In Value)" />
        </td>
        <td>
          <input class="form-control" v-model="Other4" />
        </td>
      </tr>
    </table>

    <span>
      <b style="padding-right:2em; font-size: 2em">{{
        DiscretionaryExpenseTotal | toCurrency
      }}</b>
      <button
        class="btn btn-light btn-sm"
        v-on:click="ResetDiscretionaryExpenses()"
      >
        Reset Discretionary Expenses
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DiscretionaryExpenses extends Vue {
  CablePhoneInternet: string = "";
  DiningOut: string = "";
  RecClubDues: string = "";
  MoviesAndEvents: string = "";
  Hobbies: string = "";
  Vacay: string = "";
  Gifts: string = "";
  Misc: string = "";
  Other1: string = "";
  Other2: string = "";
  Other3: string = "";
  Other4: string = "";

  get DiscretionaryExpenseTotal(): number {
    var total: number =
      +this.VerifyFloat(this.CablePhoneInternet) +
      +this.VerifyFloat(this.DiningOut) +
      +this.VerifyFloat(this.RecClubDues) +
      +this.VerifyFloat(this.MoviesAndEvents) +
      +this.VerifyFloat(this.Hobbies) +
      +this.VerifyFloat(this.Vacay) +
      +this.VerifyFloat(this.Gifts) +
      +this.VerifyFloat(this.Misc) +
      +this.VerifyFloat(this.Other1) +
      +this.VerifyFloat(this.Other2) +
      +this.VerifyFloat(this.Other3) +
      +this.VerifyFloat(this.Other4);
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

  ResetDiscretionaryExpenses() {
    this.CablePhoneInternet = "";
    this.DiningOut = "";
    this.RecClubDues = "";
    this.MoviesAndEvents = "";
    this.Hobbies = "";
    this.Vacay = "";
    this.Gifts = "";
    this.Misc = "";
    this.Other1 = "";
    this.Other2 = "";
    this.Other3 = "";
    this.Other4 = "";
  }
}
</script>
