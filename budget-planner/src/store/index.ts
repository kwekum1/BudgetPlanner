import Vue from "vue";
import Vuex, { Store } from "vuex";
import { version } from "../../package.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: "",
    incomeInput: "",
    message: "Budget Implementation System",
    CalendarExpenseEvents: [
      {
        Id: 0,
        title: "",
        color: "",
        date: "",
        textColor: "",
        propCost: "",
        propTitle: "",
        propExpenseType: { Id: 0 },
        propAppExpense: { Id: 0, propCost: "", propExpenseType: { Id: 0 } }
      }
    ],
    ExpenseTypes: [
      { Id: 1, Type: "Housing", HexColor: "#f87979" },
      { Id: 2, Type: "Transportation", HexColor: "#8987b9" },
      { Id: 3, Type: "Healthcare", HexColor: "#29b527" },
      { Id: 4, Type: "Household/Personal", HexColor: "#45729e" },
      { Id: 5, Type: "Discretionary", HexColor: "#d6ad24" },
      { Id: 6, Type: "Savings", HexColor: "#73d3e4" }
    ],
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
        ExpenseTitle: "Health Insurance (Co-pays, Co-insurance, etc)",
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
        Id: 1,
        ExpenseTitle: "Emergency Fund",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 6,
        BudgetType: { Id: 6, Type: "Savings" }
      },
      {
        Id: 2,
        ExpenseTitle: "College Savings",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 6,
        BudgetType: { Id: 6, Type: "Savings" }
      },
      {
        Id: 3,
        ExpenseTitle: "Short/Mid-Term Needs",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 6,
        BudgetType: { Id: 6, Type: "Savings" }
      },
      {
        Id: 4,
        ExpenseTitle: "Retirement Savings",
        BudgetPrice: "",
        Template: true,
        BudgetTypeId: 6,
        BudgetType: { Id: 6, Type: "Savings" }
      }
    ]
  },
  mutations: {
    AddNewCustomExpense(state, newItem) {
      state.Expenses.push(newItem);
    },
    AddNewCalendarExpense(state, newItem) {
      state.CalendarExpenseEvents.push(newItem);
    },
    EditCalendarExpense(state, editItem) {
      var ItemToEdit = state.CalendarExpenseEvents.filter(function(u) {
        if (u.Id === editItem.Id)
        {
          u.title = editItem.title;
          u.propCost = editItem.propCost;
          u.propTitle = editItem.propTitle;
          u.color =  editItem.color;
          u.propExpenseType = editItem.propExpenseType;
          u.propAppExpense = editItem.propAppExpense;
        }
      });

      ItemToEdit = editItem;

      window.console.log(ItemToEdit);

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
    },
    UpdateAsOfDateBudgetDifference(state, { data, getters }) {
      let y = this;

      state.ExpenseTypes.forEach(function(element) {
        var filteredBudgetExpensesTotal = getters
          .CalculateCalendarExpenseTotals
          //  element.Iddd
          ();
        alert(filteredBudgetExpensesTotal);
        //I LOVE
        // window.console.log(element);
      });
    },
    SetDefinedBudgetOffOfIncome(state, getters) {
      var currentIncome: any = state.incomeInput;
      var HousingBudgetItems = getters.GetAllExpensesByType(1);
      var TransportationBudgetItems = getters.GetAllExpensesByType(2);
      var HealthcareBudgetItems = getters.GetAllExpensesByType(3);
      var HouseholdBudgetItems = getters.GetAllExpensesByType(4);
      var DiscretionaryBudgetItems = getters.GetAllExpensesByType(5);
      var SavingsBudgetItems = getters.GetAllExpensesByType(6);

      var EssentialExpensesBudget: any = (
        +currentIncome * getters.GetRandomPercentageAsDecimal(51, 60)
      ).toFixed(2);
      var DiscretionaryExpensesBudget: any = (
        (+currentIncome - EssentialExpensesBudget) *
        getters.GetRandomPercentageAsDecimal(45, 55)
      ).toFixed(2);
      var SavingsBudget: any = (
        +currentIncome -
        (+DiscretionaryExpensesBudget + +EssentialExpensesBudget)
      ).toFixed(2);
      window.console.log(
        "***Starting Essential Expenses Budget: " + EssentialExpensesBudget
      );
      window.console.log(
        "Starting Discretionary Expenses Budget: " + DiscretionaryExpensesBudget
      );
      window.console.log("Starting Savings Budget: " + SavingsBudget);
      window.console.log(
        "Total Budget: " +
          (+SavingsBudget +
            +EssentialExpensesBudget +
            +DiscretionaryExpensesBudget)
      );

      var computerGeneratedHousingBudget = (
        +currentIncome * getters.GetRandomPercentageAsDecimal(21, 30)
      ).toFixed(2);
      var computerGeneratedTransportationBudget = (
        +currentIncome * getters.GetRandomPercentageAsDecimal(12, 16)
      ).toFixed(2);
      EssentialExpensesBudget -= +computerGeneratedHousingBudget;

      //set mortgage to 83% and utilities to %17
      var MortgageBudgetPercentage = getters
        .GetRandomPercentageAsDecimal(80, 87)
        .toFixed(2);
      var utilitiesBudgetPercentage = (1 - +MortgageBudgetPercentage).toFixed(
        2
      );

      HousingBudgetItems[0].BudgetPrice = `${(
        +computerGeneratedHousingBudget * +MortgageBudgetPercentage
      ).toFixed(2)}`;
      HousingBudgetItems[4].BudgetPrice = `${(
        +computerGeneratedHousingBudget * +utilitiesBudgetPercentage
      ).toFixed(2)}`;

      //Transportation

      var CarpaymentBudget =
        +computerGeneratedTransportationBudget *
        getters.GetRandomPercentageAsDecimal(50, 55);
      var AutoInsuranceBudget =
        +computerGeneratedTransportationBudget *
        getters.GetRandomPercentageAsDecimal(22, 28);
      var RemainingTransportationExpenses =
        +computerGeneratedTransportationBudget -
        (+CarpaymentBudget + +AutoInsuranceBudget);
      var MaintenanceExpenses =
        RemainingTransportationExpenses *
        getters.GetRandomPercentageAsDecimal(32, 36);
      var GasExpenses = +RemainingTransportationExpenses - +MaintenanceExpenses;

      TransportationBudgetItems[0].BudgetPrice = CarpaymentBudget.toFixed(2);
      TransportationBudgetItems[1].BudgetPrice = AutoInsuranceBudget.toFixed(2);
      TransportationBudgetItems[2].BudgetPrice = GasExpenses.toFixed(2);
      TransportationBudgetItems[3].BudgetPrice = MaintenanceExpenses.toFixed(2);

      EssentialExpensesBudget -= +computerGeneratedTransportationBudget;

      //Household Budget
      var computerGeneratedHouseholdBudget = (
        +EssentialExpensesBudget * getters.GetRandomPercentageAsDecimal(60, 72)
      ).toFixed(2);

      var GroceriesBudget =
        +computerGeneratedHouseholdBudget *
        getters.GetRandomPercentageAsDecimal(75, 79);
      var PersonalCareBudget =
        (+computerGeneratedHouseholdBudget - +GroceriesBudget) * 0.52;
      var CellPhoneBudget =
        (+computerGeneratedHouseholdBudget - +GroceriesBudget) * 0.48;

      HouseholdBudgetItems[0].BudgetPrice = GroceriesBudget.toFixed(2);
      HouseholdBudgetItems[1].BudgetPrice = PersonalCareBudget.toFixed(2);
      HouseholdBudgetItems[4].BudgetPrice = CellPhoneBudget.toFixed(2);

      //Health Care
      var computerGeneratedHealthcareBudget =
        +EssentialExpensesBudget - +computerGeneratedHouseholdBudget;

      var HealthInsuranceBudget =
        +computerGeneratedHealthcareBudget *
        getters.GetRandomPercentageAsDecimal(39, 51);
      var LifeInsuranceBudget =
        +computerGeneratedHealthcareBudget *
        getters.GetRandomPercentageAsDecimal(10, 10);
      var DentalBudget =
        +computerGeneratedHealthcareBudget -
        (+HealthInsuranceBudget + +LifeInsuranceBudget);

      HealthcareBudgetItems[0].BudgetPrice = HealthInsuranceBudget.toFixed(2);
      HealthcareBudgetItems[1].BudgetPrice = LifeInsuranceBudget.toFixed(2);
      HealthcareBudgetItems[4].BudgetPrice = DentalBudget.toFixed(2);

      //Essential Expenses
      var CablePhoneInternetBudget =
        +DiscretionaryExpensesBudget *
        getters.GetRandomPercentageAsDecimal(15, 18);
      var EatingOutBudget =
        +DiscretionaryExpensesBudget *
        getters.GetRandomPercentageAsDecimal(16, 26);
      var RecreationBudget =
        +DiscretionaryExpensesBudget *
        getters.GetRandomPercentageAsDecimal(5, 8);
      var MoviesEventsBudget =
        +DiscretionaryExpensesBudget *
        getters.GetRandomPercentageAsDecimal(10, 13);
      var VacationBudget =
        +DiscretionaryExpensesBudget *
        getters.GetRandomPercentageAsDecimal(10, 11);
      var HobbiesBudget =
        +DiscretionaryExpensesBudget *
        getters.GetRandomPercentageAsDecimal(10, 15);
      var GiftsBudget =
        +DiscretionaryExpensesBudget *
        getters.GetRandomPercentageAsDecimal(7, 9);

      DiscretionaryBudgetItems[0].BudgetPrice = CablePhoneInternetBudget.toFixed(
        2
      );
      DiscretionaryBudgetItems[1].BudgetPrice = EatingOutBudget.toFixed(2);
      DiscretionaryBudgetItems[2].BudgetPrice = RecreationBudget.toFixed(2);
      DiscretionaryBudgetItems[3].BudgetPrice = MoviesEventsBudget.toFixed(2);
      DiscretionaryBudgetItems[4].BudgetPrice = HobbiesBudget.toFixed(2);
      DiscretionaryBudgetItems[5].BudgetPrice = VacationBudget.toFixed(2);
      DiscretionaryBudgetItems[6].BudgetPrice = GiftsBudget.toFixed(2);

      //Remaining Discretionary Budget
      var RemainingDiscretionaryAmount =
        +DiscretionaryExpensesBudget -
        +getters.CalculateSelectedExpensesTotal(5);

      //Savings Amount
      var EmergencyFundBudget = +SavingsBudget * 0.31;
      var CollegeBudget = +SavingsBudget * 0.25;
      var ShortTermBudget = +SavingsBudget * 0.31;
      var RetirementBudget = +SavingsBudget * 0.13;

      SavingsBudgetItems[0].BudgetPrice = EmergencyFundBudget.toFixed(2);
      SavingsBudgetItems[1].BudgetPrice = CollegeBudget.toFixed(2);
      SavingsBudgetItems[2].BudgetPrice = ShortTermBudget.toFixed(2);
      SavingsBudgetItems[3].BudgetPrice = RetirementBudget.toFixed(2);

      window.console.log(
        "Set Household Budget: " + computerGeneratedHouseholdBudget
      );
      window.console.log(
        "Set Healthcare Budget: " + computerGeneratedHealthcareBudget
      );
      EssentialExpensesBudget -= +computerGeneratedHouseholdBudget;
      EssentialExpensesBudget -= +computerGeneratedHealthcareBudget;
      window.console.log(
        "Remaining Essential Expenses Budget: " + EssentialExpensesBudget
      );

      var CostOfEssentialExpenses =
        +computerGeneratedHouseholdBudget +
        +computerGeneratedHousingBudget +
        +computerGeneratedTransportationBudget +
        +computerGeneratedHealthcareBudget;
      window.console.log(
        "Cost of Expenses for Essisentials: " + CostOfEssentialExpenses
      );
    }
  },
  actions: {},
  getters: {
    message(state) {
      return state.message.toUpperCase();
    },
    GetRandomPercentageAsDecimal: state => (
      startingNumber: number,
      endingNumber: number
    ) => {
      return (
        (Math.random() * (endingNumber - startingNumber) + startingNumber) / 100
      );
    },
    GetBudgetTypes(state) {
      return state.ExpenseTypes;
    },
    GetMaxIdOfAllExpenses(state) {
      return Math.max.apply(
        Math,
        state.CalendarExpenseEvents.map(function(o) {
          return o.Id;
        })
      );
    },
    getVersion(state) {
      return state.version;
    },
    GetAllCalendarEvents(state) {
      return state.CalendarExpenseEvents;
    },
    AllExpenses(state) {
      return state.Expenses.reduce((total, n) => total + +n.BudgetPrice, 0);
    },
    GetAllExpensesByType: state => (categoryTypeId: number) => {
      return state.Expenses.filter(function(u) {
        return u.BudgetTypeId === categoryTypeId;
      });
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
    CalculateAllCalendarExpenseTotals: state => (
      getters,
      startDate: Date,
      endDate: Date
    ) => {
      let monthlyBudgetData: any[] = [];
      state.ExpenseTypes.forEach(function(element) {
        // window.console.log(startDate);
        //  window.console.log(endDate);

        var budgetExpenseTotal = getters.CalculateCalendarExpenseTotalsBasedOnDate(
          element.Id,
          startDate,
          endDate
        );
        var budgetTotal = getters.CalculateSelectedExpensesTotal(element.Id);

        //  window.console.log('Budget total for: ' + element.Type + ' ' + budgetExpenseTotal);
        var budgetData = {
          Id: element.Id,
          StartDate: startDate,
          CurrentTotal: budgetExpenseTotal,
          AllocatedProjectedBudget: budgetTotal
        };

        monthlyBudgetData.push(budgetData);
      });
      return monthlyBudgetData;
    },
    CalculateCalendarExpenseTotalsBasedOnDate: state => (
      BudgetTypeId: number,
      startDate: Date,
      endDate: Date
    ) => {
      var selectedCategorySpending = state.CalendarExpenseEvents.filter(
        function(u) {
          return (          

            u.propExpenseType.Id === BudgetTypeId &&
            new Date(u.date) <= endDate &&
            new Date(u.date) >= startDate
          );
        }
      );

      var objectArrayTotal = selectedCategorySpending.reduce(function(a, b) {
        var budgetNumber = b.propCost;

        if (budgetNumber.charAt(0) === "$") {
          budgetNumber = budgetNumber.substr(1);
        }

        var amount;
        if (Number.isNaN(Number.parseFloat(budgetNumber))) amount = 0;
        else amount = Number.parseFloat(budgetNumber);
        return a + +amount;
      }, 0);

      return objectArrayTotal;
    },
    CalculateCalendarExpenseTotals: state => (BudgetTypeId: number) => {
      var selectedCategorySpending = state.CalendarExpenseEvents.filter(
        function(u) {
          return u.propAppExpense.Id === BudgetTypeId;
        }
      );

      var objectArrayTotal = selectedCategorySpending.reduce(function(a, b) {
        var budgetNumber = b.propAppExpense.propCost;

        if (budgetNumber.charAt(0) === "$") {
          budgetNumber = budgetNumber.substr(1);
        }

        var amount;
        if (Number.isNaN(Number.parseFloat(budgetNumber))) amount = 0;
        else amount = Number.parseFloat(budgetNumber);
        return a + +amount;
      }, 0);

      return objectArrayTotal;
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
