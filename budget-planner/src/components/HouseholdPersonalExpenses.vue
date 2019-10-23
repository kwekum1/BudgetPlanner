<template>
  <div class="HouseholdandPersonalExpenses">
    <h3>Household and Personal Expenses</h3>
    <table class="table table-striped">
      <tr v-for="item in TemplateBudgetExpenses" v-bind:key="item.Id">
        <td>{{item.ExpenseTitle}}</td>
        <td>
          <input class="form-control" v-model="item.BudgetPrice" />
        </td>
      </tr>
      <tr v-for="item in UserBudgetExpenses" v-bind:key="item.Id">
        <td>
          <input placeholder="(Name of Expense)" v-model="item.ExpenseTitle" />
        </td>
        <td>
          <input class="form-control" v-model="item.BudgetPrice" />
        </td>
        <td>
          <font-awesome-icon v-on:click="RemoveItem(item)" style="cursor: pointer" icon="trash" />
        </td>
      </tr>
      <tr v-if="UserBudgetExpenses.length < 3">
        <td>
          <button v-on:click="AddNewCustomExpense()">Add additional expense</button>
        </td>
      </tr>
    </table>
    <span>
      <b style="padding-right:2em; font-size: 2em">{{CalculateTotal | toCurrency}}</b>
      <button
        class="btn btn-light btn-sm"
        v-on:click="ResetHouseholdandPersonalExpenses()"
      >Reset Household Expenses</button>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
//import ExpenseItem from "./ExpenseItem.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faTrash,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import Chart from "chart.js";
//import planetChartData from './chart-data.js';

Vue.component("font-awesome-icon", FontAwesomeIcon);

library.add(faUserSecret, faTrash);

@Mixins
class MyMixin extends Vue {
  public VerifyFloat(CaptureNumber: string) {
    var amount;
    if (Number.isNaN(Number.parseFloat(CaptureNumber))) amount = 0;
    else amount = Number.parseFloat(CaptureNumber);
    return amount;
  }
}


 class ExpenseItem {
  constructor(
    id: number,
    expenseTitle: string,
    budgetPrice: string,
    template: boolean
  ) {
    this.Id = id;
    this.ExpenseTitle = expenseTitle;
    this.BudgetPrice = budgetPrice;
    this.Template = template;
  }

  Id: number = 0;
  ExpenseTitle: string = "";
  BudgetPrice: string = "";
  Template: boolean = false;
//  ourChartData = planetChartData;
}

@Component
export default class HouseholdandPersonalExpenses extends MyMixin {
  constructor() {
    super();
    this.HouseholdExpenses.push(new ExpenseItem(1, "Groceries", "", true));
    this.HouseholdExpenses.push(new ExpenseItem(2, "PersonalCare", "", true));
    this.HouseholdExpenses.push(
      new ExpenseItem(3, "ClothingAndDryCleaning", "", true)
    );
    this.HouseholdExpenses.push(
      new ExpenseItem(4, "ProfessionalDues", "", true)
    );
    this.HouseholdExpenses.push(new ExpenseItem(5, "CellPhone", "", true));
    this.HouseholdExpenses.push(new ExpenseItem(6, "Other", "", true));  
  }


  public HouseholdExpenses: ExpenseItem[] = [];
  NewCount: number = 30;

  get TemplateBudgetExpenses(): ExpenseItem[] {
    return this.HouseholdExpenses.filter(function(u) {
      return u.Template;
    });
  }

  get UserBudgetExpenses(): ExpenseItem[] {
    return this.HouseholdExpenses.filter(function(u) {
      return !u.Template;
    });
  }

  AddNewCustomExpense() {
    //  this.createChart('planet-chart', planetChartData);
    this.HouseholdExpenses.push(
      new ExpenseItem(Math.round(Math.random() * 1000), "", "", false)
    );
  }


 // @Watch("HouseholdExpenses")
 // onPropertyChanged(value: string, oldValue: string) {
    // Do stuff with the watcher here.r
  //}

  get CalculateTotal(): number {
    var objectArrayTotal = this.HouseholdExpenses.reduce(function(a, b) {
      var budgetNumber = b.BudgetPrice;
      var amount;
      if (Number.isNaN(Number.parseFloat(budgetNumber))) amount = 0;
      else amount = Number.parseFloat(budgetNumber);
      return a + +amount;
    }, 0);

    this.$emit("inputData", objectArrayTotal);
    return objectArrayTotal;
  }

  RemoveItem(item: ExpenseItem) {
    for (var i = 0; i < this.HouseholdExpenses.length; i++) {
      if (this.HouseholdExpenses[i] === item) {
        this.HouseholdExpenses.splice(i, 1);
        i--;
      }
    }
  }

  ResetHouseholdandPersonalExpenses() {
    for (var index = 0; index < this.HouseholdExpenses.length; ++index) {
      this.HouseholdExpenses[index].BudgetPrice = "";
    }
  }
}
</script>