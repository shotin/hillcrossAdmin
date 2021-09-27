<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">New Student List</h3>
        </div>
        <div class="card-body" v-if="students">
          <div class="table-responsive">
            <table class="table table-striped mb-0 text-nowrap">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Qualification</th>
                  <th>Date Created</th>
                  <th>Fee Status</th>
                  <th>Admission Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student.id">
                  <td>{{ student.student_id }}</td>
                  <td>{{ student.name }}</td>
                  <td>{{ student.profile.qualification.name }}</td>
                  <td>{{ student.date_created }}</td>
                  <td>
                    <span>{{ student.financial_status }}</span>
                  </td>
                  <td>{{ student.admission_status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <loader v-else />
      </div>
    </div>
  </div>
</template>
<script>
import Loader from "../Loader.vue";
export default {
  data() {
    return {
      students: null,
    };
  },
  component: {
    Loader,
  },
  mounted() {
    this.getLatestStudents();
  },
  methods: {
    getLatestStudents() {
      this.$axios
        .get("/admin/dashboard/latest-students")
        .then((res) => {
          this.students = res.data.data;
        })
        .catch((err) => {});
    },
  },
};
</script>
