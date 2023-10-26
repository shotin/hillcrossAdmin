<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <form role="form text-left" @submit.prevent="processRegister()">
              <div class="mb-3">
                <label for=""
                  >Nationality
                  <span class="text-danger">*</span></label
                >
                <multiselect
                  v-model="selectResidence"
                  :options="select.countries"
                  track-by="id"
                  label="name"
                  required
                  :multiple="false"
                  :searchable="true"
                  :close-on-select="true"
                  :show-labels="false"
                  placeholder="Select Nationality"
                >
                </multiselect>
              </div>

              <div class="mb-3">
                  <label for=""
                    >ID/Passport Number
                    <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    v-model="form.passport_number"
                    class="form-control"
                    placeholder="ID/Passport Number"
                    aria-label="Email"
                    aria-describedby="email-addon"
                    required
                  />
                </div>
              <!-- <div class="mb-3">
                <label style="font-weight: bolder" for="">DOB <span class="text-danger">*</span></label>
                <date-picker
                  :minimumView="'day'"
                  :maximumView="'month'"
                  :initialView="'month'"
                  input-class="form-control"
                  v-model="form.dob"
                  :typeable="true"
                ></date-picker>
              </div> -->
            
              <div class="mb-3">
                <label for=""
                  >Cell Phone Number <span class="text-danger">*</span></label
                >
                <vue-phone-number-input
                  v-model="phone_number"
                  :default-country-code="`ZA`"
                  :required="true"
                  @update="phoneResult = $event"
                />
              </div>
            
             
              <div class="text-left side-by-side-button w-200">
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
import { handleError, notify } from "@/assets/js/utility";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  components: { Multiselect },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      // selectNationality: "",
      selectResidence: "",
      phoneResult: null,
      // confirmPhoneResult: null,
      phone_number: "",
      // confirm_phone_number: ""
    };
  },
  computed: {
    ...mapGetters({
      select: "select/select"
    })
  },
  methods: {
    customFormatter(date) {
      return moment(date).format("Y-m-d");
    },
    getForm() {
      return {
        // nationality: "",
        residence_country: "",
        // dob: "",
        phone_number: "",
        // confirm_phone_number: "",
        passport_number: "",
      };
    },

    async processRegister() {
      this.loading = true;
      this.disabled = true;
      // this.form.nationality = this.selectNationality.id;
      this.form.residence_country = this.selectResidence.id;
      this.form.phone_number = {
        country_code: this.phoneResult.countryCode,
        phone_code: this.phoneResult.countryCallingCode,
        phone_number: this.phone_number
      };
      this.form.confirm_phone_number = {
        country_code: this.phoneResult.countryCode,
        phone_code: this.phoneResult.countryCallingCode,
        phone_number: this.confirm_phone_number
      };
      await this.$axios
        .post("/admin/students/new", this.form)
        .then(res => {
          this.stopLoader();
          this.form = this.getForm();
          this.$router.push(`/students/${res.data.data.student_id}/edit`)
        })
        .catch(err => {
          console.log(err);
          this.stopLoader();
          handleError(err);
        });
    },

    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
* {
  font-family: "Inter", sans-serif;
}
</style>