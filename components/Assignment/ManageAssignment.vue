<template>
  <span v-if="assignment_details">
    <div class="row">
      <div class="col-xl-4 col-md-12">
        <div class="card">
          <div class="card-body w_user">
            <div>
              <h5>Total Student Enroled</h5>
              <p class="text-muted m-b-0">
                {{submittedStudents.length + notSubmittedStudents.length}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-12">
        <div class="card">
          <div class="card-body w_user">
            <div>
              <h5>Total Student Submitted</h5>
              <p class="text-muted m-b-0">
                {{submittedStudents.length}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-12">
        <div class="card">
          <div class="card-body w_user">
            <div>
              <h5>Total Student Not Submitted</h5>
              <p class="text-muted m-b-0">
                {{notSubmittedStudents.length}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <submission :submittedAssignments="submittedStudents" :notSubmittedAssignments="notSubmittedStudents" />
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { notify, handleError } from "@/assets/js/utility";
import Submission from "./Submission.vue";
export default {
  components: { Submission },
  computed: {
    ...mapGetters({
      assignment_data: "app/pageViewData",
    }),
  },
  data() {
    return {
      assignment_details: null,
      submittedStudents: [],
      notSubmittedStudents: [],
    };
  },
  mounted() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      this.$axios
        .get(`/administrators/assignments/${this.assignment_data.id}`)
        .then((res) => {
          this.assignment_details = res.data.data;
          this.submittedStudents = res.data.submitted_assignments;
          this.notSubmittedStudents = res.data.not_submitted;
        })
        .catch((err) => {});
    },
  },
};
</script>
