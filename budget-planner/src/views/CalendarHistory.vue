<template>
  <div>
    <div class="row">
      <div class="col-lg-3">
        <h2>Your current spending status as of today</h2>
        <hr />
        <div v-bind:key="option.Id" v-for="option in dataForBudgetTypes">
          <h4 v-bind:style="{ 'background-color': option.HexColor, color: 'white'}">{{option.Type}}</h4>
          <hr />Total Spent: $56
          <br />Remaining Budget for Month: $34
          <br />Status: Good
          <br />
          <br />
        </div>
      </div>

      <div class="col-lg-8">
        <p>Welcome</p>
        <full-calendar
          @dateClick="handleDateClick"
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
                    v-model="NewTitle"
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
                    v-model="NewCost"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Select Spending Category</label>
                </td>
                <td>
                  <select class="form-control" required v-model="selectedBudgetType">
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
var $;
$ = require("jquery");

export default {
  name: "calendarHistory",
  methods: {
    handleDateClick(arg) {
      this.dateForAddingEvent = arg.dateStr;
      $("#myModal").modal();
    },
    AddNewEvent() {
      this.validateNewEntry();

      if (this.errors.length > 0) {
        var errorcode = "red";
      } else {
        var newItemExpense = {
          title: `${this.NewCost} - ${this.NewTitle}`,
          color: `${this.selectedBudgetType.HexColor}`,
          date: this.dateForAddingEvent,
          textColor: "white"
        };

        this.CalendarExpenseEvents.push(newItemExpense);

        //use to save info
        //this.$auth.user.email;
        //this.$auth.user.sub;
        this.ResetForm();
        this.errors = [];
        $("#myModal").modal("hide");
      }
    },
    ResetForm() {
      this.NewTitle = "";
      this.NewCost = "";
    },
    validateNewEntry() {
      this.errors = [];
      if (!this.NewTitle) {
        this.errors.push("You must add a title or description");
      }
      if (!this.NewCost) {
        this.errors.push("You must add a cost for this expense");
      }
      if (
        this.NewCost.charAt(0) !== "$" &&
        (isNaN(this.NewCost) || this.NewCost === "true")
      ) {
        this.errors.push("Cost Must be a number");
      }
      if (
        this.NewCost.charAt(0) === "$" &&
        (isNaN(this.NewCost.substr(1)) || this.NewCost === "true")
      ) {
        this.errors.push("Cost Must be a number");
      }
      if(!this.selectedBudgetType)
      {
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
      calendarPlugins: [dayGridPlugin, interactionPlugin],
      dateForAddingEvent: "",
      dataForBudgetTypes: this.$store.getters.GetBudgetTypes,
      selectedBudgetType: "",
      CalendarExpenseEvents: [],
      errors: []
    };
  }
};
</script>