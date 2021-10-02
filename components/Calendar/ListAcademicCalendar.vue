<template>
  <span>
    <button
      class="btn btn-success mt-2 mr-2 mb-3 float-right"
      @click="openAddModal()"
      type="button"
    >
      Add New Calendar
    </button>
    <span v-if="type === 'academic_calendars'">
      <table
        class="table table-hover table-responsive table-vcenter text-nowrap table-striped mb-0"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Academic Session</th>
            <th>Academic Semester</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Course Reg Start Date</th>
            <th>Course Reg End Date</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="calendar in academic_calendars" :key="calendar.id">
            <td>
              <div class="font-15">{{ calendar.name }}</div>
            </td>
            <td>
              <span>{{ calendar.session.name }}</span>
            </td>
            <td>
              <span>{{ calendar.semester.name }}</span>
            </td>
            <td>
              <span>{{ calendar.start_date }}</span>
            </td>
            <td>
              <span>{{ calendar.end_date }}</span>
            </td>
            <td>
              <span>{{ calendar.course_registration_start_date }}</span>
            </td>
            <td>
              <span>{{ calendar.course_registration_end_date }}</span>
            </td>
            <td>
              {{ calendar.status }}
            </td>
            <td>
              <strong>{{ calendar.date_created }}</strong>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                @click="showCalendar(calendar)"
                title="Details"
              >
                <i class="fa fa-eye text-success"></i>
              </button>
              <activate-item
                v-if="calendar.status !== 'Active'"
                :want_block="false"
                :data="calendar"
                :url="
                  `/academic-sessions/${calendar.session.id}/academic-calendar/${calendar.id}/activate`
                "
                :storeItem="`app/UPDATE_DATA`"
              />
              <end-item
                v-if="calendar.status === 'Active'"
                :want_block="false"
                :data="calendar"
                :url="
                  `/academic-sessions/${calendar.session.id}/academic-calendar/${calendar.id}/end`
                "
                :storeItem="`app/UPDATE_DATA`"
              />
              <button
                type="button"
                class="btn btn-icon btn-sm"
                @click="openEdit(calendar)"
                title="Edit"
              >
                <i class="fa fa-edit"></i>
              </button>
              <delete-item
                :want_block="true"
                :data="calendar"
                :url="`/academic-calendar/${calendar.id}`"
                :storeItem="`app/REMOVE_DATA`"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <paginate
        :pagination="records"
        @paginate="academic_calendars"
        :offset="4"
        :emitTo="`academic_calendar_paginate`"
        class="mb-1 ml-2"
        v-if="academic_calendars.length"
      />
    </span>

    <loader v-else />
    <add-academic-calendar
      :academic_semesters="select.semesters"
      :academic_sessions="select.sessions"
      style="display: none;"
    />
    <edit-academic-calendar
      :academic_semesters="select.semesters"
      :academic_sessions="select.sessions"
      :academic_calendar="academic_calendar_data"
      style="display: none;"
    />
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
import AddAcademicCalendar from "../Modals/AddAcademicCalendar.vue";
import EditAcademicCalendar from "../Modals/EditAcademicCalendar.vue";
import ActivateItem from "../ActivateItem.vue";
import EndItem from "../EndItem.vue";
export default {
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
    AddAcademicCalendar,
    EditAcademicCalendar,
    ActivateItem,
    EndItem,
  },
  computed: {
    ...mapGetters({
      academic_calendars: "app/pageData",
      type: "app/pageType",
      academic_calendar_data: "app/pageViewData",
      select: "select/select",
      academic_calendar_show_data: "app/pageShowData",
    }),
  },
  watch: {
    academic_calendar_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$bvModal.show("edit-academic-calendar");
        }
      },
      immediate: true,
      deep: true,
    },
    academic_calendar_show_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("calendar-details");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("academic_calendar_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getAcademicCalendar();
      }
    });
    this.getAcademicCalendar();
  },
  methods: {
    getAcademicCalendar() {
      this.$axios
        .get(`/academic-calenders/auth?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "academic_calendars");
          this.records = res.data.meta;
        })
        .catch((err) => {});
    },
    getRecords() {
      return {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
      };
    },
    openEdit(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_VIEW_DATA", update);
    },
    showCalendar(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_SHOW_DATA", update);
    },
    openAddModal() {
      this.$bvModal.show("add-academic-calendar");
    },
  },
};
</script>
