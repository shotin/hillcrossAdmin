<template>
  <div class="section-body mt-4">
    <div class="container-fluid">
      <div class="row clearfix row-deck">
        <div class="col-lg-4 col-md-12">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Events List</h3>
              <div id="event-list" class="fc event_list">
                <div
                  class="fc-event bg-success"
                  data-class="bg-primary"
                  v-for="event in events"
                  :key="event.eventId"
                >
                  {{ event.title }} ({{ event.date }})
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8 col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="row mb-3">
                <button
                  type="button"
                  @click="openAddModal()"
                  class="btn btn-success float-right"
                >
                  Add Event
                </button>
              </div>
              <custom-calendar
                :academic_calendar="academic_calendar"
                
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <add-calendar-event
      :academic_calendar="academic_calendar"
      style="display: none;"
    />
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import AddCalendarEvent from "@/components/Modals/AddCalendarEvent.vue";
import CustomCalendar from "../CustomCalendar.vue";
export default {
  components: {
    CustomCalendar,
    AddCalendarEvent,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      academic_calendar: "app/pageShowData",
      events: "event/pageData",
    }),
  },
  methods: {
    openAddModal() {
      this.$bvModal.show("add-event");
    }
  },
};
</script>
