<template>
  <span>
    <full-calendar :options="calendarOptions" />
    <edit-calendar-event
      :academic_calendar="academic_calendar"
      :calendar_event_data="calendar_event_data"
    />
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import EditCalendarEvent from "./Modals/EditCalendarEvent.vue";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
export default {
  components: { EditCalendarEvent, FullCalendar },
  props: {
    academic_calendar: {
      require: true,
      type: Object,
    },
  },
  mounted() {
    let self = this
    self.getEvents()
    self.$root.$on("event_lists", function(val) {
      self.getEvents()
    });
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        },
        initialView: "dayGridMonth",
        events: this.events, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: false,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
      currentEvents: this.events,
    };
  },
  computed: {
    ...mapGetters({
      calendar_event_data: "event/pageViewData",
    }),
  },
  watch: {
    calendar_event_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$bvModal.show("edit-event");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleDateClick: function(arg) {
      console.log(arg);
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events) {
      this.currentEvents = events
    },
    getEvents() {
      this.$axios
        .get(`/academic-calendars/${this.academic_calendar.id}/events`)
        .then((res) => {
          this.calendarOptions.events = res.data.data;
          this.$store.commit("event/SET_DATA", res.data.data);
        })
        .catch((err) => {
          handleError(err);
        });
    },
  },
};
</script>
