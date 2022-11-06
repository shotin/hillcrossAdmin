<template>
  <span>
    <p class="ml-4 mt-2">
      <b>{{ student_data.student_id }}</b> {{ student_data.name }} <br />
      {{ student_data.profile.address }} <br />
    </p>
    <p class="mt-2 ml-1">
      Academic result for student number {{ student_data.student_id }},
      {{ student_data.name }} as on {{ current_date }} <br />
      Qualification {{ student_data.profile.qualification ? tudent_data.profile.qualification.name : '' }}
    </p>
    <table
      class="table table-hover table-vcenter text-nowrap table-striped mb-0"
      v-if="type === 'results'"
    >
      <span
        v-for="(result, index) in results"
        :key="result.academic_calendar_id"
      >
        <thead v-if="index === 0">
          <tr>
            <th>Module</th>
            <th>Assignment</th>
            <th>Assessment</th>
            <th>Examination</th>
            <th>Total</th>
            <th>Remark</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="8">
              {{ result.academic_calendar }} {{ result.academic_semester }} ({{
                result.year
              }}):
            </td>
          </tr>
          <tr v-for="detail in result.results" :key="detail.id">
            <td>
              {{ detail.module.name }}
            </td>
            <td>
              {{ detail.assignment }}
            </td>
            <td>
              {{ detail.assessment }}
            </td>
            <td>
              {{ detail.examination }}
            </td>
            <td>
              {{ detail.total }}
            </td>
            <td>
              {{ getRemark(detail.total) }}
            </td>
            <td>
              {{ detail.status }}
            </td>
            <td>
              <approve-result
                v-if="detail.status !== 'Approved'"
                :want_block="false"
                :data="detail"
                :url="
                  `/academic-results/students/${student_data.id}/results/${detail.id}/approve`
                "
                :storeItem="`result_paginate`"
              />
            </td>
          </tr>
        </tbody>
      </span>
    </table>
    <loader v-else />
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import ApproveResult from "@/components/ApproveResult.vue";
export default {
  data() {
    return {
      current_date: moment().format("YYYY-MM-DD"),
    };
  },
  components: {
    Loader,
    ApproveResult,
  },
  computed: {
    ...mapGetters({
      results: "app/pageData",
      type: "app/pageType",
      student_data: "app/pageViewData",
    }),
  },
  mounted() {
    let self = this;
    this.$root.$on("result_paginate", function(filter) {
      if (filter) {
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getStudentResult();
      }
    });
    this.getStudentResult();
  },
  methods: {
    getStudentResult() {
      this.$axios
        .get(`/academic-results/students/${this.student_data.id}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "results");
        })
        .catch((err) => {});
    },
    getRemark(total) {
      let remark = "";
      total = parseInt(total);
      if (total > 70) {
        remark = "A";
      } else if (total >= 60 && total <= 69) {
        remark = "B";
      } else if (total >= 50 && total <= 59) {
        remark = "C";
      } else if (total >= 45 && total <= 49) {
        remark = "D";
      } else if (otal >= 40 && total <= 44) {
        remark = "E";
      } else {
        remark = "F";
      }
      return remark;
    },
  },
};
</script>
