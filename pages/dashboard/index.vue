<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center">
          <div class="header-action">
            <h1 class="page-title">Dashboard</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </div>
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a
                class="nav-link active"
                data-toggle="tab"
                href="#admin-Dashboard"
                >Dashboard</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section-body mt-4">
      <div class="container-fluid">
        <aggregation-count />
        <div class="tab-content">
          <div
            class="tab-pane fade show active"
            id="admin-Dashboard"
            role="tabpanel"
          >
            <student-inflow-report />
            <exam-toppers />
            <new-student-list />
          </div>
          
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import AggregationCount from "../../components/Dashboard/AggregationCount.vue";
import ExamToppers from '../../components/Dashboard/ExamToppers.vue';
import NewStudentList from '../../components/Dashboard/NewStudentList.vue';
import StudentInflowReport from '../../components/Dashboard/StudentInflowReport.vue';
export default {
  components: { AggregationCount, StudentInflowReport, ExamToppers, NewStudentList }
}
</script>
