<template>
  <span v-if="type === 'examinations'">
    <table
      class="table responsive table-hover table-vcenter table-striped mb-0"
    >
      <thead>
        <tr>
          <th>Teacher</th>
          <th>Academic Calender</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Total Question Answered</th>
          <th>Score Obtained</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="examination in examinations" :key="examination.id">
          <td>
            <div class="font-15">{{ examination.teacher }}</div>
          </td>
          <td>
            <strong>{{ examination.academic_calender }}</strong>
          </td>
          <td>
            <strong>{{ examination.start_time }}</strong>
          </td>
          <td>
            <strong>{{ examination.end_time }}</strong>
          </td>
          <td>
            <strong>{{ examination.total_answered }}</strong>
          </td>
          <td>
            <strong>{{ examination.score_obtained }}</strong>
          </td>
          <td>
            <strong>{{ examination.status }}</strong>
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <paginate
      :pagination="records"
      @paginate="examinations"
      :offset="4"
      :emitTo="`examination_record_paginate`"
      class="mb-1 ml-2"
      v-if="examinations.length"
    />
  </span>

  <loader v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
export default {
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
  },
  computed: {
    ...mapGetters({
      examinations: "records/pageData",
      type: "records/pageType",
    }),
  },
  mounted() {
    let self = this;
    this.$root.$on("examination_record_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getExaminations();
      }
    });
    this.getExaminations();
  },
  methods: {
    getExaminations() {
      this.$axios
        .get(
          `/records/students/${this.student.id}/examinations?page=${this.records.current_page}`
        )
        .then((res) => {
          this.$store.commit("records/SET_DATA", res.data.data);
          this.$store.commit("records/SET_TYPE", "examinations");
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
    openFile(details) {
      window.open(details.file_url, "_blank");
    },
  },
};
</script>
