<template>
  <div v-bind:id="IdTitle" class="ExpensesCharter">
    <h3>{{BudgetCategoryTitle}}</h3>
    <table class="table table-striped">
      <tr
        v-for="item in $store.getters.TemplateBudgetExpenses(IdentifiedBudgetCategoryId)"
        v-bind:key="item.Id"
      >
        <td>{{ item.ExpenseTitle }}</td>
        <td>
          <input class="form-control" type="number" v-model="item.BudgetPrice" />
        </td>
      </tr>
      <tr
        v-for="item in $store.getters.UserBudgetExpenses(IdentifiedBudgetCategoryId)"
        v-bind:key="item.Id"
      >
        <td>
          <input placeholder="(Name of Expense)" v-model="item.ExpenseTitle" />
        </td>
        <td>
          <input class="form-control" type="number" v-model="item.BudgetPrice" />
        </td>
        <td>
          <font-awesome-icon v-on:click="RemoveItem(item)" style="cursor: pointer" icon="trash" />
        </td>
      </tr>
      <tr v-if="$store.getters.UserBudgetExpenses(IdentifiedBudgetCategoryId).length < 3">
        <td>
          <button v-on:click="AddNewCustomExpense()">Add additional expense</button>
        </td>
      </tr>
    </table>

    <span>
      <b style="padding-right:2em; font-size: 2em">
        {{
        CalculateTotal | toCurrency
        }}
      </b>
      <button
        class="btn btn-light btn-sm"
        v-on:click="ResetExpenses()"
      >Reset {{BudgetCategoryTitle}}</button>
    </span>
    <br/>
    <br/>
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
    template: boolean,
    budgetTypeId: number,
    budgetType: Object
  ) {
    this.Id = id;
    this.ExpenseTitle = expenseTitle;
    this.BudgetPrice = budgetPrice;
    this.Template = template;
    this.BudgetType = budgetType;
    this.BudgetTypeId = budgetTypeId;
  }

  Id: number = 0;
  ExpenseTitle: string = "";
  BudgetPrice: string = "";
  Template: boolean = false;
  BudgetTypeId: number = 0;
  BudgetType: Object = { };
  //  ourChartData = planetChartData;
}

@Component
export default class BudgetCategoryExpense extends MyMixin {
  constructor() {
    super();
  }

  @Prop()
  BudgetCategoryTitle!: string;

  @Prop()
  IdentifiedBudgetCategoryId!: number;

  AddNewCustomExpense() {
    this.$store.commit(
      "AddNewCustomExpense",
      new ExpenseItem(
        Math.round(Math.random() * 1000),
        "",
        "",
        false,
        this.IdentifiedBudgetCategoryId,
        {}
      )
    );
  }

  get IdTitle(): string {
    return this.BudgetCategoryTitle.trim().replace(/\s/g,'') + Math.round(Math.random() * 1000);
  }

  get CalculateTotal(): number {
    var objectArrayTotal = this.$store.getters.CalculateSelectedExpensesTotal(
      this.IdentifiedBudgetCategoryId
    );
    this.$emit("inputData", objectArrayTotal);
    return objectArrayTotal;
  }

  RemoveItem(item: ExpenseItem) {
    this.$store.commit("RemoveCustomExpenseItem", item);
  }

  ResetExpenses() {
    this.$store.commit(
      "ResetSelectedExpenses",
      this.IdentifiedBudgetCategoryId
    );
  }
}
</script>
