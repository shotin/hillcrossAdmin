<template>
  <div class="container-fluid py-4">
    <div class="row mt-4">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <form role="form" @submit.prevent="processPersonalInformation()">
              <div class="row">
                <div class="col-lg-12">
                  <div class="d-flex flex-column h-100">
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Name of High School
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.school_name"
                        class="form-control"
                        placeholder="Name of High School"
                        aria-label="FirstName"
                        aria-describedby="first_name-addon"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Matriculation Year
                        <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.matriculation_year"
                        class="form-control"
                        id=""
                        required
                      >
                        <option value="">Select Matriculation Year</option>
                        <option
                          :value="year.toString()"
                          v-for="(year, index) in years"
                          :key="index"
                          >{{ year }}</option
                        >
                      </select>
                    </div>
                    <div class="mb-3" v-if="!is_base">
                      <label class="custom-text" for=""
                        >Matriculation Result Status
                        <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.matriculation_status"
                        class="form-control"
                        id=""
                        required
                      >
                        <option value="">Select Matriculation Status</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Higher Certificate"
                          >Higher Certificate</option
                        >
                        <option v-if="!is_base" value="Currently in Matric"
                          >Currently in Matric</option
                        >
                        <option value="No Matric">No Matric</option>
                        <option value="Failed Matric">Failed Matric</option>
                      </select>
                    </div>
                    <div class="mb-3" v-if="!is_base && !has_failed">
                      <label class="custom-text" for=""
                        >Have you studied beyond Matric?
                        <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.has_studied_beyond_matric"
                        class="form-control"
                        id=""
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <p><br></p>
                <span
                  v-if="!studied_beyond_matric && !is_base && !has_failed"
                >
                  <div class="col-md-12 col-sm-12">
                    <p>Post Matric Education Record</p>
                    <div class="form-group">
                      <div
                        class="row"
                        v-for="(data, index) in form.institution_object"
                        :key="index"
                      >
                        <div class="col-md-5 col-sm-12">
                          <div class="form-group">
                            <label class="custom-text">Institution Attended</label>
                            <input
                              type="text"
                              required
                              v-model="data.institution"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                          <div class="form-group">
                            <label class="custom-text">Qualification</label>
                            <input
                              type="text"
                              required
                              v-model="data.qualification"
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div class="col-md-3 mt-4" >
                          <button
                            type="button"
                            class="btn btn-link text-success text-sm mb-0 px-3"
                            title="Add More"
                            v-if="index + 1 === form.institution_object.length"
                            @click="addRow()"
                          >
                            <i class="fas fa-plus text-lg me-1"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-link text-danger text-sm mb-0 px-3"
                            title="Remove"
                            v-if="index > 0"
                            @click="deleteRow(index)"
                          >
                            <i class="fas fa-minus text-lg me-1"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
              <p><br /></p>
              <p class="text-center">
                Fields marked with asterisk(<span class="text-danger">*</span>)
                must be filled before advancing to the next page!
              </p>
              <div class="text-left side-by-side-button w-200">
                <nuxt-link to="/sponsor-information" class="btn btn-default">Back</nuxt-link>
                <Button
                  :button_class="'btn btn-outline-success'"
                  :disabled="disabled"
                  :button_type="'submit'"
                  :loading="loading"
                  :value="'Next'"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { notify, handleError } from "@/assets/js/utility";
export default {
  mounted() {
  },
  components: {
  },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      years: this.getYears(),
      is_base: false,
      has_failed: false,
      studied_beyond_matric: false
    };
  },
  computed: {
    ...mapGetters({
      user: "student/pageData"
    })
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
        this.form.school_name = newVal.education
          ? newVal.education.school_name
          : "";
        this.form.matriculation_status = newVal.education
          ? newVal.education.matriculation_status
          : "";
        this.form.matriculation_year = newVal.education
          ? newVal.education.matriculation_year
          : "";
        this.form.has_studied_beyond_matric = newVal.education
          ? newVal.education.has_studied_beyond_matric
          : "";
        if (newVal.education && newVal.education.institution_object.length) {
          _.map(newVal.education.institution_object, value => {
            this.form.institution_object.push({
              institution: value.institution,
              qualification: value.qualification
            });
          });
        }
      },
      immediate: true,
      deep: true
    },
    "form.matriculation_year": {
      handler(newVal, oldVal) {
        if (newVal === moment().format('Y')) {
          this.is_base = true;
        } else {
          this.is_base = false;
        }
      },
      immediate: true,
      deep: true
    },
    "form.matriculation_status": {
      handler(newVal, oldVal) {
        if (newVal === "Failed Matric") {
          this.has_failed = true;
        } else {
          this.has_failed = false;
        }
      },
      immediate: true,
      deep: true
    },
    "form.has_studied_beyond_matric": {
      handler(newVal, oldVal) {
        if (newVal === "No") {
          this.studied_beyond_matric = true;
        } else {
          this.studied_beyond_matric = false;
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async processPersonalInformation() {
      this.loading = true;
      this.disabled = true;
      await this.$axios
        .post("/students/education-histories", this.form)
        .then(res => {
          this.stopLoader();
          notify("Education history updated successfully", "success");
          this.$store.commit("auth/UPDATE_USER_INFO", res.data.data);
          this.$router.push("/qualification-information");
        })
        .catch(err => {
          console.log(err);
          this.stopLoader();
          handleError(err);
        });
    },
    getYears() {
      var currentYear = new Date().getFullYear();
      let years = [];
      let startYear = 1970;
      while (startYear <= currentYear) {
        years.push(startYear++);
      }
      return years;
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    addRow() {
      if (this.form.institution_object.length < 3) {
        this.form.institution_object.push({
          institution: "",
          qualification: ""
        });
      }
    },
    deleteRow(index) {
      this.form.institution_object.splice(index, 1);
    },
    getForm() {
      return {
        school_name: "",
        matriculation_year: "",
        matriculation_status: "",
        has_studied_beyond_matric: "Yes",
        institution_object: []
      };
    }
  }
};
</script>
