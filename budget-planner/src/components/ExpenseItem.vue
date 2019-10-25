<script lang="ts">
//import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import Component from "vue-class-component";

export default class ExpenseItem {
  constructor(
    id: number,
    expenseTitle: string,
    budgetPrice: string,
    template: boolean
  ) {
    // super();
    this.Id = id;
    this.ExpenseTitle = expenseTitle;
    this.BudgetPrice = budgetPrice;
    this.Template = template;
  }

  Id: number = 0;
  ExpenseTitle: string = "";
  BudgetPrice: string = "";
  Template: boolean = false;
}
</script>
