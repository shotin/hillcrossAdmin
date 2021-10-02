<template>
  <span v-if="type === 'assessments'">
    <table
      class="table responsive table-hover table-vcenter table-striped mb-0"
    >
      <thead>
        <tr>
          <th>Teacher</th>
          <th>Module</th>
          <th>File Type</th>
          <th>Submission Date</th>
          <th>Score</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="assessment in assessments" :key="assessment.id">
          <td>
            <div class="font-15">{{ assessment.teacher }}</div>
          </td>
          <td>
            <strong>{{ assessment.module }}</strong>
          </td>
          <td>
            <strong>{{ assessment.file_type }}</strong>
          </td>
          <td>
            <strong>{{ assessment.submitted_on }}</strong>
          </td>
          <td>
            <strong>{{ assessment.score }}</strong>
          </td>
          <td>
            <strong>{{ assessment.status }}</strong>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-icon btn-sm"
              @click="openFile(assessment)"
              title="Open File"
            >
              <i class="fa fa-play text-success"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <paginate
      :pagination="records"
      @paginate="assessments"
      :offset="4"
      :emitTo="`assessnment_record_paginate`"
      class="mb-1 ml-2"
      v-if="assessments.length"
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
      assessments: "records/pageData",
      type: "records/pageType",
    }),
  },
  mounted() {
    let self = this;
    this.$root.$on("assessnment_record_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getAssessments();
      }
    });
    this.getAssessments();
  },
  methods: {
    getAssessments() {
      this.$axios
        .get(
          `/records/students/${this.student.id}/assessments?page=${this.records.current_page}`
        )
        .then((res) => {
          this.$store.commit("records/SET_DATA", res.data.data);
          this.$store.commit("records/SET_TYPE", "assessments");
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
