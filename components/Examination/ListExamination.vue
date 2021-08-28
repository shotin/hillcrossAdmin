<template>
  <table
    class="table table-hover table-vcenter text-nowrap table-striped mb-0"
    v-if="type === 'examinations'"
  >
    <thead>
      <tr>
        <th>Teacher</th>
        <th>Module</th>
        <th>Academic Calendar</th>
        <th>Exam Date</th>
        <th>Exam Start Time</th>
        <th>Exam Duration</th>
        <th>Total Questions</th>
        <th>Answerable Questions</th>
        <th>Total Score</th>
        <th>Approval Status</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="examination in examinations" :key="examination.id">
        <td>
          <div class="font-15">{{ examination.teacher }}</div>
        </td>
        <td>
          <strong>{{ examination.module.name }}</strong>
        </td>
        <td>
          <strong>{{ examination.academic_calender.name }}</strong>
        </td>
        <td>
          <strong>{{ examination.exam_date }}</strong>
        </td>
        <td>
          <strong>{{ examination.exam_start_time }}</strong>
        </td>
        <td>
          <strong>{{ examination.exam_duration }}</strong>
        </td>
        <td>
          <strong>{{ examination.total_questions }}</strong>
        </td>
        <td>
          <strong>{{ examination.answerable_questions }}</strong>
        </td>
        <td>
          <strong>{{ examination.total_score }}</strong>
        </td>
        <td>
          <strong>{{ examination.date_created }}</strong>
        </td>
        <td>
          <strong>{{ examination.admin_approval }}</strong>
        </td>
        <td>
          <strong>{{ examination.status }}</strong>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-icon btn-sm"
            @click="openDetails(examination)"
            title="Details"
          >
            <i class="fa fa-eye"></i>
          </button>
          <activate-item
            v-if="examination.admin_approval !== 'Approved'"
            :want_block="false"
            :data="examination"
            :url="
              `/administrators/examinations/${examination.id}/approval`
            "
            :storeItem="`app/UPDATE_DATA`"
          />
          <end-item
            v-if="examination.admin_approval === 'Approved'"
            :want_block="false"
            :data="examination"
            :url="
              `/administrators/examinations/${examination.id}/end`
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
      examinations: "app/pageData",
      type: "app/pageType",
      examination_data: "app/pageViewData",
    }),
  },
  watch: {
    examination_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("examination-details");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("examination_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getExamination();
      }
    });
    this.getExamination();
  },
  methods: {
    getExamination() {
      this.$axios
        .get(`/administrators/examinations?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "examinations");
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
