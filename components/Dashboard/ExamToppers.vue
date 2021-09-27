<template>
  <div class="row clearfix row-deck">
    <div class="col-xl-12 col-lg-12 col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Exam Toppers</h3>
        </div>
        <div class="table-responsive" style="height: 310px;">
          <table
            class="table card-table table-vcenter text-nowrap table-striped mb-0"
          >
            <tbody>
              <tr>
                <th>Student ID.</th>
                <th>Name</th>
                <th></th>
                <th>Marks</th>
                <th>%AGE</th>
              </tr>
              <tr v-for="result in examToppers" :key="result.id">
                <td>{{ result.student.student_id }}</td>
                <td class="w60" v-if="result.student.avatar">
                  <img
                    class="avatar"
                    :src="result.student.avatar"
                    :alt="result.student.name"
                  />
                </td>
                <td class="w60" v-else>
                  <div
                    class="avatar avatar-pink"
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Avatar Name"
                  >
                    <span>{{ result.student.avatar_alternative }}</span>
                  </div>
                </td>
                <td>
                  <div>{{ result.student.name }}</div>
                  <div class="text-muted">{{ result.module.name }}</div>
                </td>
                <td>{{ result.total }}</td>
                <td>{{ result.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from "../Loader.vue";
export default {
  data() {
    return {
      examToppers: [],
    };
  },
  component: {
    Loader,
  },
  mounted() {
    this.getExamToppers();
  },
  methods: {
    getExamToppers() {
      this.$axios
        .get("/admin/dashboard/exam-toppers")
        .then((res) => {
          this.examToppers = res.data.data;
        })
        .catch((err) => {});
    },
  },
};
</script>
