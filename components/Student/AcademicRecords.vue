<template>
  <span v-if="student_data">
    <div class="row">
      <div class="col-xl-4 col-md-12">
        <div class="card mt-2 ml-2">
          <div class="card-body w_user">
            <div>
              <h5>Total Submitted Assignments</h5>
              <p class="text-muted m-b-0">
                {{ assignments }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-12">
        <div class="card mt-2">
          <div class="card-body w_user">
            <div>
              <h5>Total Submitted Assessments</h5>
              <p class="text-muted m-b-0">
                {{ assessments }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-md-12">
        <div class="card mt-2 mr-2">
          <div class="card-body w_user">
            <div>
              <h5>Total Submitted Examinations</h5>
              <p class="text-muted m-b-0">
                {{ examinations }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <span>
          <div class="section-body">
            <div class="container-fluid">
              <div class="d-flex justify-content-between align-items-center ">
                <ul class="nav nav-tabs page-header-tab">
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="[assignmentShow ? 'active' : '']"
                      data-toggle="tab"
                      href="#assignment"
                      @click.prevent="switchTab('assignmentShow')"
                      >Assignment</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="[assessmentShow ? 'active' : '']"
                      data-toggle="tab"
                      href="#assessment"
                      @click.prevent="switchTab('assessmentShow')"
                      >Assessment</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="[examinationShow ? 'active' : '']"
                      data-toggle="tab"
                      href="#examination"
                      @click.prevent="switchTab('examinationShow')"
                      >Examination</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="section-body mt-4">
            <div class="container-fluid">
              <div class="tab-content">
                <div
                  class="tab-pane"
                  :class="[assignmentShow ? 'active' : '']"
                  id="assignment"
                >
                  <div class="card">
                    <assignment-record
                      :student="student_data"
                      v-if="assignmentShow"
                    />
                  </div>
                </div>
                <div
                  class="tab-pane"
                  :class="[assessmentShow ? 'active' : '']"
                  id="assessment"
                >
                  <div class="card">
                    <assessment-record
                      :student="student_data"
                      v-if="assessmentShow"
                    />
                  </div>
                </div>
                <div
                  class="tab-pane"
                  :class="[examinationShow ? 'active' : '']"
                  id="examination"
                >
                  <div class="card">
                    <examination-record
                      :student="student_data"
                      v-if="examinationShow"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { notify, handleError } from "@/assets/js/utility";
import AssignmentRecord from "./AssignmentRecord.vue";
import AssessmentRecord from "./AssessmentRecord.vue";
import ExaminationRecord from "./ExaminationRecord.vue";

export default {
  components: { AssignmentRecord, AssessmentRecord, ExaminationRecord },
  computed: {
    ...mapGetters({
      student_data: "app/pageShowData",
    }),
  },
  data() {
    return {
      assessments: 0,
      assignments: 0,
      examinations: 0,
      assignmentShow: true,
      assessmentShow: false,
      examinationShow: false,
    };
  },
  mounted() {
    this.getSummary();
  },
  methods: {
    switchTab(key) {
      switch (key) {
        case "assignmentShow":
          this.assignmentShow = true;
          this.assessmentShow = false;
          this.examinationShow = false;
          break;
        case "assessmentShow":
          this.assignmentShow = false;
          this.assessmentShow = true;
          this.examinationShow = false;
          break;
        case "examinationShow":
          this.assignmentShow = false;
          this.assessmentShow = false;
          this.examinationShow = true;
          break;
        default:
          this.assignmentShow = true;
          this.assessmentShow = false;
          this.examinationShow = false;
          break;
      }
    },
    getSummary() {
      this.$axios
        .get(`/records/students/${this.student_data.id}/summary`)
        .then((res) => {
          this.assignments = res.data.data.assignment_count;
          this.assessments = res.data.data.assessment_count;
          this.examinations = res.data.data.examination_count;
        })
        .catch((err) => {});
    },
  },
};
</script>
