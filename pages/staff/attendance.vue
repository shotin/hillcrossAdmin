<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Staff Attendance</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Staff Attendance
              </li>
            </ol>
          </div>
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="[list ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('list')"
                href="#pro-all"
                >List View</a
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
            :class="[list ? 'active' : '']"
            id="Student-all"
          >
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Staff Name"
                        v-model="form.name"
                      />
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-4 col-sm-6">
                    <div class="input-group">
                      <select
                        name=""
                        v-model="form.status"
                        class="form-control"
                        id=""
                      >
                        <option value="all">All</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-4 col-sm-6">
                    <div class="input-group">
                      <input
                        type="date"
                        placeholder="Select date"
                        class="form-control"
                        v-model="form.date"
                      />
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-4 col-sm-6">
                    <Button
                      :button_class="'btn btn-sm btn-primary btn-block'"
                      :disabled="disabled"
                      :button_type="'button'"
                      :loading="loading"
                      :value="'Search'"
                      @click.native="runSearch()"
                    />
                  </div>
                  <div
                    class="col-lg-2 col-md-4 col-sm-6"
                    v-if="attendancesId.length > 1"
                  >
                    <submit-attendance
                      :isSingle="false"
                      :attendanceIds="attendancesId"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive card" v-if="type === 'attendances'">
              <table
                class="table table-hover table-vcenter table-striped mb-0 text-nowrap"
              >
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        @click="selectAll"
                        v-model="allSelected"
                      />
                    </th>
                    <th></th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <!-- <th>Action</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="attendance in attendances" :key="attendance.id">
                    <td>
                      <input
                        type="checkbox"
                        v-model="attendancesId"
                        :value="attendance.id"
                        v-if="!attendance.cannot_mark"
                      />
                    </td>
                    <td class="w60" v-if="attendance.user.avatar">
                      <img
                        class="avatar"
                        :src="attendance.user.avatar"
                        :alt="attendance.user.name"
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
                        <span>{{ attendance.user.avatar_alternative }}</span>
                      </div>
                    </td>
                    <td>
                      <span class="font-16">{{ attendance.user.name }}</span>
                    </td>
                    <td>{{ attendance.date }}</td>
                    <td>
                      {{ attendance.time }}
                    </td>
                    <td>{{ attendance.status }}</td>
                    <td>
                      <submit-attendance
                        :isSingle="true"
                        :attendanceIds="attendancesId"
                        :attendance="attendance"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <loader v-else />
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import Loader from "@/components/Loader.vue";
import SubmitAttendance from "../../components/Attendance/SubmitAttendance.vue";
export default {
  mounted() {
    let self = this;
    self.$root.$on("attendance_submitted", function(val) {
      if (val) {
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", "");
        self.getAttendance();
      }
    });
    self.getAttendance();
  },
  components: {
    Loader,
    SubmitAttendance,
  },
  computed: {
    ...mapGetters({
      attendances: "app/pageData",
      type: "app/pageType",
    }),
  },
  data() {
    return {
      add: false,
      list: true,
      addText: "Add",
      form: this.getForm(),
      disabled: false,
      loading: false,
      allSelected: false,
      selected: [],
      attendancesId: [],
    };
  },
  methods: {
    async getAttendance() {
      await this.$axios
        .get(`/staff-attendances`, {
          params: this.form,
        })
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "attendances");
        })
        .catch((err) => {});
    },
    switchTab(key) {
      switch (key) {
        case "list":
          this.list = true;
          this.add = false;
          break;
        case "add":
          this.list = false;
          this.add = true;
          break;
        default:
          break;
      }
    },
    getForm() {
      return {
        date: moment().format('YYYY-MM-DD'),
        status: "all",
        name: "",
      };
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    runSearch() {
      this.loading = true;
      this.disabled = true;
      this.$store.commit("app/SET_DATA", null);
      this.$store.commit("app/SET_TYPE", "");
      this.getAttendance();
      this.stopLoader();
    },
    selectAll() {
      this.userIds = [];
      if (!this.allSelected) {
        this.attendancesId = this.attendances.map((o) => o.id);
        this.allSelected = true;
      } else {
        this.attendancesId = [];
        this.allSelected = false;
      }
    },
  },
};
</script>
