import Vue from "vue";
import Vuex, { Store } from "vuex";
import { version } from "../../package.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: "",
    incomeInput: "",
    message: "Budget Implementation System",
    Expenses: [
      {
        Id: 1,
        ExpenseTitle: "Mortgage/Rent",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 1,
        BudgetType: { Id: 1, Type: "Housing" }
      },
      {
        Id: 2,
        ExpenseTitle: "Property Taxes",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 1,
        BudgetType: { Id: 1, Type: "Housing" }
      },
      {
        Id: 3,
        ExpenseTitle: "Home Maintence",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 1,
        BudgetType: { Id: 1, Type: "Housing" }
      },
      {
        Id: 4,
        ExpenseTitle: "Home Owners Insurance",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 1,
        BudgetType: { Id: 1, Type: "Housing" }
      },
      {
        Id: 5,
        ExpenseTitle: "Home Utilities",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 1,
        BudgetType: { Id: 1, Type: "Housing" }
      },
      {
        Id: 1,
        ExpenseTitle: "Auto Payments",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 2,
        BudgetType: { Id: 2, Type: "Transportation" }
      },    
      {
        Id: 2,
        ExpenseTitle: "Auto Insurance",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 2,
        BudgetType: { Id: 2, Type: "Transportation" }
      },    
      {
        Id: 3,
        ExpenseTitle: "Gas",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 2,
        BudgetType: { Id: 2, Type: "Transportation" }
      },    
      {
        Id: 4,
        ExpenseTitle: "Maintenance/License",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 2,
        BudgetType: { Id: 2, Type: "Transportation" }
      },    
      {
        Id: 5,
        ExpenseTitle: "Parking/Tolls/Bus/Train",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 2,
        BudgetType: { Id: 2, Type: "Transportation" }
      }, 
      {
        Id: 1,
        ExpenseTitle: "Health Insurance",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 3,
        BudgetType: { Id: 3, Type: "Healthcare" }
      },  
      {
        Id: 2,
        ExpenseTitle: "Life Insurance",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 3,
        BudgetType: { Id: 3, Type: "Healthcare" }
      },  
      {
        Id: 3,
        ExpenseTitle: "Disability Income Insurance",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 3,
        BudgetType: { Id: 3, Type: "Healthcare" }
      },
      {
        Id: 4,
        ExpenseTitle: "Long-term Care Insurance",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 3,
        BudgetType: { Id: 3, Type: "Healthcare" }
      },      
      {
        Id: 5,
        ExpenseTitle: "Medical/Dental/Drugs",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 3,
        BudgetType: { Id: 3, Type: "Healthcare" }
      },            
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
        ExpenseTitle: "Personal Care",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      },
      {
        Id: 3,
        ExpenseTitle: "Clothing And Dry Cleaning",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      },
      {
        Id: 4,
        ExpenseTitle: "Professional Dues",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      },
      {
        Id: 5,
        ExpenseTitle: "Cell Phone",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 4,
        BudgetType: { Id: 4, Type: "Household" }
      },
      {
        Id: 1,
        ExpenseTitle: "Cable/Phone/Internet",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 5,
        BudgetType: { Id: 5, Type: "Discretionary" }
      },
      {
        Id: 2,
        ExpenseTitle: "Dining Out",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 5,
        BudgetType: { Id: 5, Type: "Discretionary" }
      },
      {
        Id: 3,
        ExpenseTitle: "Recreation Club Dues",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 5,
        BudgetType: { Id: 5, Type: "Discretionary" }
      },
      {
        Id: 4,
        ExpenseTitle: "Movies/Sporting Events",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 5,
        BudgetType: { Id: 5, Type: "Discretionary" }
      },
      {
        Id: 5,
        ExpenseTitle: "Hobbies",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 5,
        BudgetType: { Id: 5, Type: "Discretionary" }
      },
      {
        Id: 6,
        ExpenseTitle: "Vacation/Travel",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 5,
        BudgetType: { Id: 5, Type: "Discretionary" }
      },
      {
        Id: 7,
        ExpenseTitle: "Gifts/Contributions",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 5,
        BudgetType: { Id: 5, Type: "Discretionary" }
      },
      {
        Id: 8,
        ExpenseTitle: "Misc.",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 5,
        BudgetType: { Id: 5, Type: "Discretionary" }
      }
    ]
  },
  mutations: {
    AddNewCustomExpense(state, newItem) {
      state.Expenses.push(newItem);
    },
    initialiseStore(state) {
      //alert('Initializing Local Storage')
      // Check if the ID exists
      if (localStorage.getItem("BudgetStoreStateInformation")) {
        let store = JSON.parse(
          localStorage.getItem("BudgetStoreStateInformation") || "{}"
        );

        if (store.version == version) {
          this.replaceState(Object.assign(state, store));
        } else {
          state.version = version;
        }
      }
    },
    ResetSelectedExpenses(state, categoryTypeId) {
      var resetItems = state.Expenses.filter(function(u) {
        return u.BudgetTypeId === categoryTypeId;
      });

      for (var index = 0; index < resetItems.length; ++index) {
        resetItems[index].BudgetPrice = "";
      }
    },
    RemoveCustomExpenseItem(state, removedItem) {
      for (var i = 0; i < state.Expenses.length; i++) {
        if (state.Expenses[i] === removedItem) {
          state.Expenses.splice(i, 1);
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
    getVersion(state) {
      return state.version;
    },
    AllExpenses(state) {
      return state.Expenses.reduce((total, n) => total + +n.BudgetPrice, 0);
    },
    TemplateBudgetExpenses: state => (categoryTypeId: number) => {
      return state.Expenses.filter(function(u) {
        return u.Template && u.BudgetTypeId === categoryTypeId;
      });
    },
    UserBudgetExpenses: state => (categoryTypeId: number) => {
      return state.Expenses.filter(function(u) {
        return !u.Template && u.BudgetTypeId === categoryTypeId;
      });
    },
    CalculateSelectedExpensesTotal: state => (categoryTypeId: number) => {
      var selectedCategorySpending = state.Expenses.filter(function(u) {
        return u.BudgetTypeId === categoryTypeId;
      });

      var objectArrayTotal = selectedCategorySpending.reduce(function(a, b) {
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
