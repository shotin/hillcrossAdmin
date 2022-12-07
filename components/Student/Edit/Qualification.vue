<template>
  <div class="container-fluid py-4">
    <div class="row mt-4">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <form role="form" @submit.prevent="processPersonalInformation()">
              <div class="row">
                <div class="col-lg-6">
                  <div class="d-flex flex-column h-100">
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Faculty <span class="text-danger">*</span></label
                      >
                      <multiselect
                        v-model="selectedFaculty"
                        :options="select.schools"
                        track-by="id"
                        label="name"
                        required
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        placeholder="Select Faculty"
                      >
                      </multiselect>
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Academic Qualification
                        <span class="text-danger">*</span></label
                      >
                      <multiselect
                        v-model="selectedQualification"
                        :options="qualifications"
                        track-by="id"
                        label="name"
                        required
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        placeholder="Select Academic Qualification"
                      >
                      </multiselect>
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Study Mode <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.study_mode"
                        class="form-control"
                        id=""
                      >
                        <option value="">Select Study Mode</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Online/Distance Learning"
                          >Online/Distance Learning</option
                        >
                      </select>
                    </div>
                    <div
                      class="mb-3"
                      v-if="form.study_mode === 'Online/Distance Learning'"
                    >
                      <label class="custom-text" for=""
                        >Courier Delivery Process
                        <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.study_material_delivery"
                        class="form-control"
                        id=""
                      >
                        <option value=""
                          >Select Courier Delivery Process</option
                        >
                        <option value="I prefer PAXI">I prefer PAXI</option>
                        <option value="Doorstep delivery">
                          Doorstep delivery
                        </option>
                        <option value="I will pick up myself">
                          I will pick up myself
                        </option>
                      </select>
                    </div>
                    <span
                      class="mb-2"
                      style="color: red; font-style: italic"
                      v-if="form.study_material_delivery === 'I prefer PAXI'"
                      >*PAXI does not do a door to door delivery</span
                    >
                    <div
                      class="mb-3"
                      v-if="
                        ['I prefer PAXI', 'Doorstep delivery'].includes(
                          form.study_material_delivery
                        )
                      "
                    >
                      <label class="custom-text" for=""
                        >Enter Delivery Address
                      </label>
                      <input
                        type="text"
                        v-model="form.delivery_address"
                        class="form-control"
                        placeholder="Input Address"
                        aria-label="Address"
                        aria-describedby="address-addon"
                        :disabled="user.next_stage === 'end'"
                      />
                    </div>
                    <div
                      class="mb-3"
                      v-if="form.study_mode === 'Online/Distance Learning'"
                    >
                      <label class="custom-text" for="">Email </label>
                      <input
                        type="email"
                        v-model="form.email"
                        class="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="email-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Registration Period
                        <span class="text-danger">*</span></label
                      >
                      <multiselect
                        v-model="selectedCalender"
                        :options="calenders"
                        track-by="id"
                        label="name"
                        required
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        placeholder="Select Registration Period"
                      >
                      </multiselect>
                    </div>
                  </div>
                </div>
              </div>
              <p><br /></p>
              <p class="text-center">
                Fields marked with asterisk(<span class="text-danger">*</span>)
                must be filled before advancing to the next page!
              </p>
              <div class="text-left side-by-side-button w-200">
                <button type="button" @click="goBack()" class="btn btn-primary">
                  Back
                </button>
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
import CustomButton from "@/components/Button.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  mounted() {},
  components: {
    CustomButton,
    Multiselect,
  },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      selectedFaculty: null,
      selectedQualification: null,
      selectedCalender: null,
      qualifications: [],
      selectedCalender: null,
      calenders: [],
    };
  },
  computed: {
    ...mapGetters({
      user: "student/pageData",
      select: "select/select",
    }),
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
        this.selectedFaculty = newVal.qualification
          ? newVal.qualification.school
          : "";
        this.selectedQualification = newVal.qualification
          ? newVal.qualification.qualification
          : "";
        this.form.study_mode = newVal.qualification
          ? newVal.qualification.study_mode
          : "";
        this.selectedCalender = newVal.qualification
          ? newVal.qualification.academic_session
          : "";
        this.form.email = newVal.email;
        this.form.study_material_delivery = newVal.study_material_delivery;
        this.form.delivery_address = newVal.delivery_address;
      },
      immediate: true,
      deep: true,
    },
    selectedFaculty: {
      handler(newVal, oldVal) {
        this.qualifications = _.filter(this.select.qualifications, {
          school_id: newVal.id,
        });
        console.log(this.select.registration_sessions);
        this.calenders = _.filter(this.select.registration_sessions, function(
          o
        ) {
          return o.specific_school.includes(newVal.id) ? o : "";
        });
      },
    },
  },
  methods: {
    async processPersonalInformation() {
      this.loading = true;
      this.disabled = true;
      if (this.selectedFaculty) {
        this.form.school_id = this.selectedFaculty.id;
      }
      if (this.selectedQualification) {
        this.form.qualification_id = this.selectedQualification.id;
      }
      if (this.selectedCalender) {
        this.form.academic_session_id = this.selectedCalender.id;
      }
      await this.$axios
        .post(
          `/admin/students/${this.user.id}/qualification-information`,
          this.form
        )
        .then((res) => {
          this.stopLoader();
          notify("Qualification information updated successfully", "success");
          this.$store.commit("student/UPDATE_USER_INFO", res.data.data);
          this.$root.$emit("update_tab", "document_upload");
        })
        .catch((err) => {
          console.log(err);
          this.stopLoader();
          handleError(err);
        });
    },
    goBack() {
      this.$root.$emit("update_tab", "education_history");
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    getForm() {
      return {
        school_id: "",
        qualification_id: "",
        study_mode: "",
        academic_session_id: "",
        email: "",
        study_material_delivery: "",
        delivery_address: "",
      };
    },
  },
};
</script>
<style>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
  border: 1px solid #dfdfdf;
  border-radius: 2px;
  margin-right: 2rem;
  padding: 1rem;
  padding-right: 2rem;
}
</style>
