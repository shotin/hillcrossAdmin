<template>
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-6 mb-2">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search student by Name, ID number, Phone Number, Registration ID"
          v-model="form.search"
        />
      </div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6 mb-2" v-if="hasSchool">
      <div class="input-group">
        <multiselect
          v-model="form.school"
          :options="select.schools"
          track-by="id"
          label="name"
          required
          :multiple="false"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select School"
        >
        </multiselect>
      </div>
    </div>
    <!-- <div class="col-lg-4 col-md-4 col-sm-6 mb-2" v-if="hasQualification">
      <div class="input-group">
        <multiselect
          v-model="form.qualification"
          :options="selectQualifications"
          track-by="id"
          label="name"
          required
          :multiple="false"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select Qualification"
        >
        </multiselect>
      </div>
    </div> -->
    <div class="col-lg-4 col-md-4 col-sm-6" v-if="hasFinancialStatus">
      <div class="input-group">
        <select
          name=""
          id=""
          v-model="form.financial_status"
          class="form-control"
        >
          <option value="" disabled>Select Financial Status</option>
          <option value="all">All</option>
          <option value="Cleared">Cleared</option>
          <option value="Disabled">Disabled</option>
        </select>
      </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6" v-if="hasStatus">
      <div class="input-group">
        <select name="" id="" v-model="form.status" class="form-control">
          <option value="" disabled>Select Status</option>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6" v-if="hasRegistrationStatus">
      <div class="input-group">
        <select
          name=""
          id=""
          v-model="form.registration_status"
          class="form-control"
        >
          <option value="" disabled>Select Registration Status</option>
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
    </div>
    <!-- <div class="col-lg-1 col-md-4 col-sm-6 mt-2">
      <Button
        :button_class="'btn btn-sm btn-primary btn-block'"
        :disabled="disabled"
        :button_type="'button'"
        :loading="loading"
        :value="'Filter'"
        @click.native="runFilter()"
      />
    </div> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  props: {
    hasQualification: {
      type: Boolean,
      default: false,
    },
    hasSchool: {
      type: Boolean,
      default: false,
    },
    hasFinancialStatus: {
      type: Boolean,
      default: false,
    },
    hasStatus: {
      type: Boolean,
      default: false,
    },
    pageType: {
      type: String,
      default: "students",
    },
    defaultStatus: {
      type: String,
      default: "All",
    },
    hasRegistrationStatus: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      records: this.getRecords(),
      // selectQualifications: [],
    };
  },
  // watch: {
  // "form.school": {
  //   handler(newVal, oldVal) {
  //     if (newVal !== oldVal) {
  //       this.getQualification(newVal);
  //     }
  //   },
  // },
  // },
  watch: {
    "form.school": {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.getQualification(newVal);
        }
      },
    },
    form: {
      deep: true, // Watch for changes to all properties within the form object
      handler() {
        this.watchForm();
      },
    },
  },

  methods: {
    getForm() {
      return {
        search: "",
        school: "",
        // qualification: "",
        financial_status: "",
        status: "",
        admission_status: this.defaultStatus,
        registration_status: "",
      };
    },

    watchForm() {
      this.$store.commit("app/SET_DATA", null);
      this.$store.commit("app/SET_TYPE", "");
      if (!this.form.financial_status) {
        delete this.form.financial_status;
      }
      if (!this.form.status) {
        delete this.form.status;
      }
      if (!this.form.school) {
        delete this.form.school;
      }
      if (!this.form.qualification) {
        delete this.form.qualification;
      }
      if (!this.form.search) {
        delete this.form.search;
      }
      if (!this.form.registration_status) {
        delete this.form.registration_status;
      }
      if (this.form.school) {
        this.form.school = this.form.school.id;
      }
      if (this.form.qualification) {
        this.form.qualification = this.form.qualification.id;
      }
      this.$axios
        .get(`/students?page=${this.records.current_page}`, {
          params: this.form,
        })
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", this.pageType);
          this.$root.$emit("update_pagination", res.data.meta);
          this.records = res.data.meta;
        })
        .catch((err) => {});
    },
    // runFilter() {
    //   this.$store.commit("app/SET_DATA", null);
    //   this.$store.commit("app/SET_TYPE", "");
    //   if (!this.form.financial_status) {
    //     delete this.form.financial_status;
    //   }
    //   if (!this.form.status) {
    //     delete this.form.status;
    //   }
    //   if (!this.form.school) {
    //     delete this.form.school;
    //   }
    //   if (!this.form.qualification) {
    //     delete this.form.qualification;
    //   }
    //   if (!this.form.search) {
    //     delete this.form.search;
    //   }
    //   if (!this.form.registration_status) {
    //     delete this.form.registration_status;
    //   }
    //   if (this.form.school) {
    //     this.form.school = this.form.school.id;
    //   }
    //   if (this.form.qualification) {
    //     this.form.qualification = this.form.qualification.id;
    //   }
    //   this.$axios
    //     .get(`/students?page=${this.records.current_page}`, {
    //       params: this.form,
    //     })
    //     .then((res) => {
    //       this.$store.commit("app/SET_DATA", res.data.data);
    //       this.$store.commit("app/SET_TYPE", this.pageType);
    //       this.$root.$emit('update_pagination', res.data.meta)
    //       this.records = res.data.meta;
    //     })
    //     .catch((err) => {});
    // },
    // getQualification(school) {
    //   if (school && school.id) {
    //     this.selectQualifications = _.filter(this.select.qualifications, {
    //       school_id: school.id,
    //     });
    //   }
    // },
    getRecords() {
      return {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
      };
    },
  },
};
</script>
