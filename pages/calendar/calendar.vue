<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Academic Calendar</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Academic Calendar
              </li>
            </ol>
          </div>
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="[listSession ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('listSession')"
                href="#pro-all"
                >Academic Session</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="[listCalendar ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('listCalendar')"
                href="#pro-profile"
                >Academic Calendar</a
              >
            </li>
            <li class="nav-item" v-if="calendarDetails">
              <a
                class="nav-link"
                :class="[calendarDetails ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('calendarDetails')"
                href="#pro-add"
                >Academic Calendar Details</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section-body mt-4">
      <div class="container-fluid">
        <div class="tab-content">
          <div class="tab-pane" :class="[listSession ? 'active' : '']" id="pro-all">
            <div class="table-responsive">
              <list-academic-session v-if="listSession" />
            </div>
          </div>
          <div
            class="tab-pane"
            :class="[listCalendar ? 'active' : '']"
            id="pro-profile"
          >
            <list-academic-calendar v-if="listCalendar"/>
          </div>
          <div class="tab-pane" v-if="calendarDetails" :class="[calendarDetails ? 'active' : '']" id="pro-add">
            <calendar-details v-if="calendarDetails"/>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import CalendarDetails from '../../components/Calendar/CalendarDetails.vue';
import ListAcademicCalendar from '../../components/Calendar/ListAcademicCalendar.vue';
import ListAcademicSession from '../../components/Calendar/ListAcademicSession.vue';
export default {
  components: {ListAcademicSession, ListAcademicCalendar, CalendarDetails},
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
  mounted() {
    let self = this;
    self.$root.$on("calendar-details", function(val) {
      self.switchTab('calendarDetails')
    });
  },
  data() {
    return {
      listSession: true,
      listCalendar: false,
      calendarDetails: false,
    };
  },
  methods: {
    switchTab(key) {
      switch (key) {
        case "listSession":
          this.listSession = true;
          this.listCalendar = false;
          this.calendarDetails = false;
          break;
        case "calendarDetails":
          this.listSession = false;
          this.listCalendar = false;
          this.calendarDetails = true;
          break;
        case "listCalendar":
          this.listCalendar = true;
          this.listSession = false;
          this.calendarDetails = false;
          break;
        default:
          this.listSession = true;
          this.listCalendar = false;
          this.calendarDetails = false;
          break;
      }
    },
  },
};
</script>
