<template>
  <div>
    <div class="row">
      <div class="col-lg-1"></div>

      <div class="col-lg-10">
        <p>Welcome</p>
        <full-calendar
          @dateClick="handleDateClick"
          default-view="dayGridMonth"
          :plugins="calendarPlugins"
          :events="[
    { title: 'event 1', color: '#CC3312', date: '2019-11-01' },
    { title: '$1250 - Rent', color: '#B4F1A9', date: '2019-11-02' }
  ]"
        />
      </div>

      <div class="col-lg-1"></div>
    </div>
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

export default {
  name: "calendarHistory",
  methods: {
    handleDateClick(arg) {
      alert(arg.date);
    }
  },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin]
    };
  }
};
</script>