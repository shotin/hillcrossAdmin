<template>
  <span>
    <filter-student class="mt-2 mb-2 ml-2" />
    <span v-if="type === 'students'">
      <table
        class="table table-hover table-vcenter text-nowrap table-striped mb-0"
      >
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Qualification</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td class="w60" v-if="student.profile.avatar">
              <img
                class="avatar"
                :src="student.profile.avatar"
                :alt="student.first_name"
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
                <span>{{ student.avatar_alternative }}</span>
              </div>
            </td>
            <td>
              <div class="font-15">{{ student.name }}</div>
            </td>
            <td>
              <span>{{ student.student_id }}</span>
            </td>
            <td>
              <span>{{ student.profile.qualification ? student.profile.qualification.name : '' }}</span>
            </td>
            <td>
              {{ student.date_created }}
            </td>
            <td>
              <span class="tag tag-success">{{ student.status_word }}</span>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                @click="openShow(student)"
                title="View"
              >
                <i class="fa fa-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <paginate
        :pagination="records"
        @paginate="students"
        :offset="4"
        :emitTo="`students_results`"
        class="mb-1 ml-2"
        v-if="students.length"
      />
    </span>
    <loader v-else />
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import FilterStudent from "../FilterStudent.vue";
import Loader from "../Loader.vue";
export default {
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    FilterStudent,
  },
  computed: {
    ...mapGetters({
      students: "app/pageData",
      type: "app/pageType",
      student_data: "app/pageViewData",
    }),
  },
  watch: {
    student_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("result-details");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("students_results", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getStudents();
      }
    });
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.$axios
        .get(`/students?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "students");
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
    openShow(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_VIEW_DATA", update);
    },
  },
};
</script>
