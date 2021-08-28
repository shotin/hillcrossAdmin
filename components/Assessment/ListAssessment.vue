<template>
  <table
    class="table table-hover table-vcenter text-nowrap table-striped mb-0"
    v-if="type === 'assessments'"
  >
    <thead>
      <tr>
        <th>Teacher</th>
        <th>Module</th>
        <th>Assessment Type</th>
        <th>File Type</th>
        <th>Submission Date</th>
        <th>Additional Info</th>
        <th>Status</th>
        <th>Date Created</th>
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
          <strong>{{ assessment.assessment_type }}</strong>
        </td>
        <td>
          <strong>{{ assessment.file_type }}</strong>
        </td>
        <td>
          <strong>{{ assessment.submission_date }}</strong>
        </td>
        <td>
          <small class="text-muted" v-if="assessment.assessment_type === 'cbt'">
            Start Date : {{ assessment.assessment_details.start_date }}<br />
            End Date : {{ assessment.assessment_details.end_date }}<br />
            Start Time : {{ assessment.assessment_details.start_time }}<br />
            End Time : {{ assessment.assessment_details.end_time }}<br />
            Duration : {{ assessment.assessment_details.duration }}<br />
            Total Questions Expected :
            {{ assessment.assessment_details.total_questions }}<br />
            Total Questions Answerable :
            {{ assessment.assessment_details.total_questions_answerable }}<br />
            Total Score Obtainable :
            {{ assessment.assessment_details.total_score }}<br />
          </small>
          <small v-else></small>
        </td>
        <td>
          <strong>{{ assessment.status }}</strong>
        </td>
        <td>
          <strong>{{ assessment.creation_date }}</strong>
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
          <button
            type="button"
            class="btn btn-icon btn-sm"
            @click="openDetails(assessment)"
            title="Details"
          >
            <i class="fa fa-eye"></i>
          </button>
          <activate-item
            v-if="assessment.status !== 'Approved'"
            :want_block="false"
            :data="assessment"
            :url="
              `/administrators/assessments/${assessment.id}/approval`
            "
            :storeItem="`app/UPDATE_DATA`"
          />
          <end-item
            v-if="assessment.status === 'Approved'"
            :want_block="false"
            :data="assessment"
            :url="
              `/administrators/assessments/${assessment.id}/end`
            "
            :storeItem="`app/UPDATE_DATA`"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <loader v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
import ActivateItem from "@/components/ActivateItem.vue";
import EndItem from '@/components/EndItem.vue'
export default {
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
    ActivateItem,
    EndItem
  },
  computed: {
    ...mapGetters({
      assessments: "app/pageData",
      type: "app/pageType",
      assessment_data: "app/pageViewData",
    }),
  },
  watch: {
    assessment_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("assessment-details");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("assessment_paginate", function(filter) {
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
        .get(`/administrators/assessments?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "assessments");
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
    openDetails(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_VIEW_DATA", update);
    },
    openFile(details) {
      window.open(details.file_url, '_blank')
    }
  },
};
</script>
