<template>
  <div>
    <div class="row">
      <div class="col-lg-3">
        <h2>Your current spending status as of today</h2>
        <hr />
        <div v-bind:key="option.Id" v-for="option in dataForBudgetTypes">
          <h4 v-bind:style="{ 'background-color': option.HexColor, color: 'white'}">{{option.Type}}</h4>
          <hr />
          Total Spent: {{GetBudgetStatByCategory(option.Id) | toCurrency}}
          <br />
          Remaining Budget for Month: {{GetRemainingBudgetStatByCategory(option.Id) | toCurrency}}
          <br />Status:
          <b v-if="GetRemainingBudgetStatByCategory(option.Id) > -1">Good Budgeting</b>
          <b
            style="color: red"
            v-if="GetRemainingBudgetStatByCategory(option.Id) < 0"
          >You are over budget!</b>
          <br />
          <br />
        </div>
      </div>

      <div class="col-lg-8">
        <p>Welcome</p>
        <full-calendar
          ref="fullCalendar"
          @dateClick="handleDateClick"
          @eventClick="handleDateClick"
          :datesRender="handleMonthChange"
          default-view="dayGridMonth"
          :plugins="calendarPlugins"
          :events="CalendarExpenseEvents"
        />
      </div>

      <div class="col-lg-1"></div>
    </div>

    <!-- The Modal -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Add event for {{dateForAddingEvent}}</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <span v-if="errors.length" style="color: red">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </span>
            <br />
            <table class="table">
              <tr>
                <td>
                  <label>Store/Venue/Expense Description</label>
                </td>
                <td>
                  <input
                    required
                    type="text"
                    class="form-control"
                    placeholder="(ex: Costco)"
                    v-model="NewAppEvent.propTitle"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Cost</label>
                </td>
                <td>
                  <input
                    type="text"
                    required
                    class="form-control"
                    placeholder="(ex: $75.66)"
                    v-model="NewAppEvent.propCost"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Select Spending Category</label>
                </td>
                <td>
                  <select class="form-control" required v-model="NewAppEvent.propExpenseType">
                    <option
                      v-for="option in dataForBudgetTypes"
                      v-bind:key="option.Id"
                      v-bind:value="option"
                    >{{ option.Type }}</option>
                  </select>
                </td>
              </tr>
            </table>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="AddNewEvent">Save</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              v-if="NewAppEvent.propTitle"
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >Delete this Event</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<style lang='scss'>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
</style>


<script>
// @ is an alias to /src
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
var $;
$ = require("jquery");

export default {
  name: "calendarHistory",
  methods: {
    handleDateClick(arg) {
      if (
        arg.event &&
        arg.event.extendedProps &&
        arg.event.extendedProps.propAppExpense
      ) {
        this.NewAppEvent = arg.event.extendedProps.propAppExpense;
        $("#myModal").modal();
      } else {
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.gotoDate(arg.dateStr);
        this.dateForAddingEvent = arg.dateStr;
        $("#myModal").modal();
      }
    },
    handleMonthChange: function(arg) {
      var CalendarStart = arg.view.currentStart;
      var check = moment(CalendarStart, "YYYY/MM/DD");
      var selectedMonthOnCalendarYear = check.format("YYYY");
      var selectedMonthOnCalendarFirstDate = check.format("YYYY-MM-DD"); //first of the month date 2019-11-01
      var currentDate = moment().format("YYYY-MM-DD"); // current date
      var selectedMonthOnCalendarAsNumber = check.format("M"); // 11
      var TodayMonthAsNumber = moment().format("M");
      var TodayMonthsFirstDate = moment(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      ).format("YYYY-MM-DD");

      //   if (selectedMonthOnCalendarFirstDate < TodayMonthsFirstDate) {
      var lastDayOfMonthOnCalendar = moment(
        new Date(
          selectedMonthOnCalendarYear,
          selectedMonthOnCalendarAsNumber - 1 + 1,
          0
        )
      ).format("YYYY-MM-DD");

      var gettersForStoreUse = this.$store.getters;
      this.BudgetCompareData = this.$store.getters.CalculateAllCalendarExpenseTotals(
        gettersForStoreUse,
        new Date(
          selectedMonthOnCalendarYear,
          selectedMonthOnCalendarAsNumber - 1,
          1
        ),
        new Date(
          selectedMonthOnCalendarYear,
          selectedMonthOnCalendarAsNumber,
          0
        )
      );
      //     }

      //working on here
      //this.$store.commit("UpdateAsOfDateBudgetDifference", {currentMonth, gettersForStoreUse});
    },
    AddNewEvent() {
      this.validateNewEntry();

      if (this.errors.length > 0) {
        var errorcode = "red";
      } else {
        var newItemExpense = {
          title: `${this.NewAppEvent.propCost} - ${this.NewAppEvent.propTitle}`,
          color: `${this.NewAppEvent.propExpenseType.HexColor}`,
          date: this.dateForAddingEvent,
          textColor: "white",
          propAppExpense: this.NewAppEvent
        };

        this.$store.commit("AddNewCalendarExpense", newItemExpense);
        var t = this.$store.getters.CalculateCalendarExpenseTotals(1);
        // window.console.log(FullCalendar.props.now);

        //use to save info
        //this.$auth.user.email;
        //this.$auth.user.sub;
        this.ResetForm();
        this.errors = [];
        $("#myModal").modal("hide");
      }
    },
    GetBudgetStatByCategory(Id) {
      
      let obj = this.BudgetCompareData.find(o => o.Id === Id);

      if (obj) {
        return obj.CurrentTotal;
      } else return 0;
    },
    GetRemainingBudgetStatByCategory(Id) {
      let obj = this.BudgetCompareData.find(o => o.Id === Id);

      if (obj) {
        return +obj.AllocatedProjectedBudget - +obj.CurrentTotal;
      } else return 0;
    },
    ResetForm() {
      this.NewAppEvent = { Id: "", propCost: "", propTitle: "", propExpenseType: "" };      
    },
    validateNewEntry() {
      this.errors = [];
      if (!this.NewAppEvent.propTitle) {
        this.errors.push("You must add a title or description");
      }
      if (!this.NewAppEvent.propCost) {
        this.errors.push("You must add a cost for this expense");
      }
      if (
        this.NewAppEvent.propCost.charAt(0) !== "$" &&
        (isNaN(this.NewAppEvent.propCost) || this.NewAppEvent.propCost === "true")
      ) {
        this.errors.push("Cost Must be a number");
      }
      if (
        this.NewAppEvent.propCost.charAt(0) === "$" &&
        (isNaN(this.NewAppEvent.propCost.substr(1)) || this.NewAppEvent.propCost === "true")
      ) {
        this.errors.push("Cost Must be a number");
      }
      if (!this.NewAppEvent.propExpenseType) {
        this.errors.push("You must select a budget type");
      }
    }
  },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      NewTitle: "",
      NewCost: "",
      NewAppEvent: { Id: "", propCost: "", propTitle: "", propExpenseType: "" },
      BudgetCompareData: [],
      calendarPlugins: [dayGridPlugin, interactionPlugin],
      dateForAddingEvent: "",
      dataForBudgetTypes: this.$store.getters.GetBudgetTypes,
      selectedBudgetType: "",
      CalendarExpenseEvents: this.$store.getters.GetAllCalendarEvents,
      errors: []
    };
  }
};
</script>