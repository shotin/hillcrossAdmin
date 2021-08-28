<template>
  <table
    class="table table-hover table-vcenter text-nowrap table-striped mb-0"
    v-if="type === 'submissions'"
  >
    <thead>
      <tr>
        <th>Student</th>
        <th>Start Date</th>
        <th>Exam Start Time</th>
        <th>Exam Submission Date</th>
        <th>Exam End Time</th>
        <th>Question Answered</th>
        <th>Mark Obtained</th>
        <th>Approval Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="submission in submissions" :key="submission.id">
        <td>
          <div class="font-15">{{ submission.student.name }}</div>
        </td>
        <td>
          <strong>{{ submission.start_date }}</strong>
        </td>
        <td>
          <strong>{{ submission.start_time }}</strong>
        </td>
        <td>
          <strong>{{ submission.submission_date }}</strong>
        </td>
        <td>
          <strong>{{ submission.end_time }}</strong>
        </td>
        <td>
          <strong>{{ submission.total_answered }}</strong>
        </td>
        <td>
          <strong>{{ submission.score_obtained }}</strong>
        </td>
        <td>
          <strong>{{ submission.status }}</strong>
        </td>
        <td>
          <activate-item
            v-if="submission.status !== 'Approved'"
            :want_block="false"
            :data="submission"
            :url="
              `/administrators/examination-trackers/${submission.id}/approve`
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
import EndItem from "@/components/EndItem.vue";
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
    EndItem,
  },
  computed: {
    ...mapGetters({
      submissions: "app/pageData",
      type: "app/pageType",
      examination_data: "app/pageViewData",
    }),
  },
  mounted() {
    let self = this;
    this.$root.$on("submission_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getExamSubmissions();
      }
    });
    this.getExamSubmissions();
  },
  methods: {
    getExamSubmissions() {
      this.$axios
        .get(`/teachers/examinations/${this.examination_data.id}/students`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "submissions");
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
  },
};
</script>
