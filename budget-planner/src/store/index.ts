import Vue from "vue";
import Vuex, { Store } from "vuex";
import {version} from "../../package.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: "",
    message: "Kweku Daddy",
    HouseholdExpenses: [
      {
        Id: 1,
        ExpenseTitle: "Groceries",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      },
      {
        Id: 2,
        ExpenseTitle: "PersonalCare",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      },
      {
        Id: 3,
        ExpenseTitle: "ClothingAndDryCleaning",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      },
      {
        Id: 4,
        ExpenseTitle: "ProfessionalDues",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      },
      {
        Id: 5,
        ExpenseTitle: "CellPhone",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      },
      {
        Id: 6,
        ExpenseTitle: "Other",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      }
    ]
  },
  mutations: {
    AddNewCustomExpense(state) {
      state.HouseholdExpenses.push({
        Id: Math.round(Math.random() * 1000),
        ExpenseTitle: "",
        BudgetPrice: "",
        Template: false,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      });
    },

    AddNewCustomExpenseItem(state, newItem) {
      state.HouseholdExpenses.push(newItem);
    },
    initialiseStore(state) {
      //alert('Initializing Local Storage')
      // Check if the ID exists
      if (localStorage.getItem("BudgetStoreStateInformation")) {
        let store =
        JSON.parse(localStorage.getItem("BudgetStoreStateInformation") || "{}");

        if (store.version == version) {
          this.replaceState(Object.assign(state, store));
        } else {
          state.version = version;
        }
      }
    },
    ResetHouseholdandPersonalExpenses(state) {
      for (var index = 0; index < state.HouseholdExpenses.length; ++index) {
        state.HouseholdExpenses[index].BudgetPrice = "";
      }
    },
    RemoveCustomExpenseItem(state, removedItem) {
      for (var i = 0; i < state.HouseholdExpenses.length; i++) {
        if (state.HouseholdExpenses[i] === removedItem) {
          state.HouseholdExpenses.splice(i, 1);
          i--;
        }
      }
    }
  },
  actions: {},
  getters: {
    message(state) {
      return state.message.toUpperCase();
    },
    count(state) {
      return state.HouseholdExpenses.length;
    },
    TemplateBudgetExpenses: state => {
      return state.HouseholdExpenses.filter(function(u) {
        return u.Template;
      });
    },
    UserBudgetExpenses: state => {
      return state.HouseholdExpenses.filter(function(u) {
        return !u.Template;
      });
    },
    CalculateHouseholdExpensesTotal(state) {
      var objectArrayTotal = state.HouseholdExpenses.reduce(function(a, b) {
        var budgetNumber = b.BudgetPrice;
        var amount;
        if (Number.isNaN(Number.parseFloat(budgetNumber))) amount = 0;
        else amount = Number.parseFloat(budgetNumber);
        return a + +amount;
      }, 0);

      return objectArrayTotal;
    }
  },
  modules: {}
});
