<template>
  <span>
    <filter-student
      :hasFinancialStatus="true"
      :hasQualification="true"
      :hasSchool="true"
      :hasStatus="true"
      :pageType="pageType"
      :defaultStatus="status"
      :hasRegistrationStatus="registrationStatus"
      class="mt-2 mb-2 ml-2 mr-2"
    />
    <div class="table-responsive" v-if="type === pageType">
      <table
        class="table table-hover table-vcenter mb-2"
      >
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Registration ID</th>
            <th>Phone Number</th>
            <th>School</th>
            <th>Qualification</th>
            <th>Registration Year</th>
            <th>Creation Date</th>
            <th>Registration Status</th>
            <th>Sage Account Status</th>
            <th>Financial Status</th>
            <th>Admission Status</th>
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
              {{ student.student_id }}
            </td>
            <td>
              <strong>{{ student.registration_id }}</strong>
            </td>
            <td>
              <strong>{{ student.phone_number }}</strong>
            </td>
            <td>
              <strong>{{ student.profile.school ? student.profile.school.name : '' }}</strong>
            </td>
            <td>
              <strong>{{ student.profile ? student.profile.qualification ? student.profile.qualification.name : '' : '' }}</strong>
            </td>
            <td>
              <strong>{{ student.registration_year }}</strong>
            </td>
            <td>
              <strong>
                {{student.date_created}}
              </strong>
            </td>
            <td>
              <strong>{{ student.registration_completion_status }}</strong>
            </td>
            <td>
              <strong>{{ student.sage_status }}</strong>
            </td>
            <td>
              <span
                class="tag tag-success"
                v-if="student.financial_status === 'Cleared'"
                >{{ student.financial_status }}</span
              >
              <span class="tag tag-danger" v-else>{{
                student.financial_status
              }}</span>
            </td>
            <td>
              <strong>{{ student.admission_status }}</strong>
            </td>
            <td>
              <span class="tag tag-success">{{ student.status_word }}</span>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button
                  id="btnGroupDrop1"
                  type="button"
                  class="btn btn-icon dropdown-toggle btn-sm"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <a
                    class="dropdown-item btn-block"
                    type="button"
                    href="#"
                    @click="openShow(student)"
                  >
                    Show Student
                  </a>
                  <a
                    class="dropdown-item"
                    type="button"
                    @click="openEdit(student)"
                  >
                    Edit Student
                  </a>
                  <create-sage
                    v-if="
                      pageType === 'admitted_students' &&
                        student.sage_status === 'Not Created'
                    "
                    :want_block="true"
                    :data="student"
                    :url="`/accounts/students/${student.id}/create-sage`"
                    :storeItem="`app/UPDATE_DATA`"
                  />
                  <delete-sage
                    v-if="
                      pageType === 'admitted_students' &&
                        student.sage_status === 'Created'
                    "
                    :want_block="true"
                    :data="student"
                    :url="`/accounts/students/${student.id}/delete-sage`"
                    :storeItem="`app/UPDATE_DATA`"
                  />
                  <manage-financial-status
                    v-if="pageType === 'admitted_students'"
                    :want_block="true"
                    :data="student"
                    :url="
                      student.financial_status === 'Cleared'
                        ? `/admin/students/${student.id}/financial/disable`
                        : `/admin/students/${student.id}/financial/clear`
                    "
                    :storeItem="`app/UPDATE_DATA`"
                    :financial_status="
                      student.financial_status === 'Cleared'
                        ? 'Disable'
                        : 'Clear'
                    "
                  />
                  <archive-student
                    v-if="pageType === 'admitted_students'"
                    :want_block="true"
                    :data="student"
                    :url="`/students/${student.id}/archive`"
                    :storeItem="`app/UPDATE_DATA`"
                    :emitTo="emitTo"
                  />
                  <grant-admission
                    v-if="
                      student.admission_status === 'Registered' &&
                        student.next_stage === 'end'
                    "
                    :want_block="true"
                    :data="student"
                    :url="`/students/${student.id}/grant-admission`"
                    :storeItem="`app/UPDATE_DATA`"
                    :emitTo="emitTo"
                  />
                  <regenerate-admission-letter
                    v-if="
                      student.admission_status === 'Admitted'
                    "
                    :want_block="true"
                    :data="student"
                    :url="`/students/${student.id}/regenerate-admission-letter`"
                    :storeItem="`app/UPDATE_DATA`"
                    :emitTo="emitTo"
                  />
                  <print-details
                    :want_block="true"
                    :data="student"
                    :url="`/students/${student.id}/details/print`"
                    :storeItem="`app/UPDATE_DATA`"
                  />
                  <admission-letter
                    v-if="student.admission_status === 'Admitted'"
                    :want_block="true"
                    :data="student"
                    :url="`/students/${student.id}/admission-letter`"
                    :storeItem="`app/UPDATE_DATA`"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <paginate
        :pagination="records"
        @paginate="students"
        :offset="4"
        :emitTo="emitTo"
        class="mb-1 ml-2"
        v-if="students.length"
      />
    </div>
    <loader v-else />
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
import FilterStudent from "../FilterStudent.vue";
import CreateSage from "@/components/CreateSage";
import DeleteSage from "@/components/DeleteSage";
import Paginate from "../Paginate.vue";
import ManageFinancialStatus from "../ManageFinancialStatus.vue";
import ArchiveStudent from "../ArchiveStudent.vue";
import GrantAdmission from "../GrantAdmission.vue";
import PrintDetails from '../PrintDetails.vue';
import AdmissionLetter from '../AdmissionLetter.vue';
import RegenerateAdmissionLetter from '../RegenerateAdmissionLetter.vue';
export default {
  props: {
    status: {
      type: String,
    },
    pageType: {
      type: String,
    },
    emitTo: {
      type: String,
    },
    show: {
      type: Boolean,
      required: true,
    },
    edit: {
      type: Boolean,
      required: true,
    },
    emitDetailsTo: {
      type: String,
      required: true,
    },
    registrationStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
    FilterStudent,
    Paginate,
    CreateSage,
    DeleteSage,
    ManageFinancialStatus,
    ArchiveStudent,
    GrantAdmission,
    PrintDetails,
    AdmissionLetter,
    RegenerateAdmissionLetter,
  },
  computed: {
    ...mapGetters({
      students: "app/pageData",
      type: "app/pageType",
      student_data: "app/pageViewData",
      student_show_data: "app/pageShowData",
    }),
  },
  watch: {
    student_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("edit-student");
        }
      },
      immediate: true,
      deep: true,
    },
    student_show_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit(`${this.emitDetailsTo}`);
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on(self.emitTo, function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getStudents();
      }
    });
    this.$root.$on("update_pagination", function(filter) {
      self.records = filter;
    });
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.$axios
        .get(`/students?page=${this.records.current_page}`, {
          params: { admission_status: this.status },
        })
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", this.pageType);
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
    openEdit(data) {
      this.$router.push(`/students/${data.student_id}/edit`)
    },
    openShow(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_SHOW_DATA", update);
    },
  },
};
</script>
<style>
.dropdown-menu {
    max-height: 180px;
    overflow-y: auto;
}
</style>
