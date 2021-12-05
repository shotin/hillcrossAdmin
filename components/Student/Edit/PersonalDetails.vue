<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <form role="form" @submit.prevent="processPersonalInformation()">
              <div class="row">
                <div class="col-lg-6">
                  <div class="d-flex flex-column h-100">
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Title <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.title"
                        class="form-control"
                        id=""
                      >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >First Name <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.first_name"
                        class="form-control"
                        placeholder="First Name"
                        aria-label="FirstName"
                        aria-describedby="first_name-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for="">Other Name </label>
                      <input
                        type="text"
                        v-model="form.other_name"
                        class="form-control"
                        placeholder="Other Name"
                        aria-label="OtherName"
                        aria-describedby="other_name-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for="">DOB </label>
                      <input
                        type="date"
                        v-model="user.profile.dob"
                        class="form-control"
                        placeholder="Date of birth"
                        aria-label="OtherName"
                        aria-describedby="other_name-addon"
                        disabled
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for="">Nationality </label>
                      <input
                        v-if="user.profile.nationality"
                        type="text"
                        v-model="user.profile.nationality.name"
                        class="form-control"
                        placeholder="Date of birth"
                        aria-label="OtherName"
                        aria-describedby="other_name-addon"
                        disabled
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Home Language <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.home_language"
                        class="form-control"
                        id=""
                      >
                        <option value="">Select Home Language</option>
                        <option
                          :value="language"
                          v-for="(language, index) in homeLanguages"
                          :key="index"
                          >{{ language }}</option
                        >
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="d-flex flex-column h-100">
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Gender <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.gender"
                        class="form-control"
                        id=""
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Surname <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.last_name"
                        class="form-control"
                        placeholder="Surname"
                        aria-label="Surname"
                        aria-describedby="surname-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for="">Maiden Name </label>
                      <input
                        type="text"
                        v-model="form.maiden_name"
                        class="form-control"
                        placeholder="Maiden Name if applicable"
                        aria-label="Maidenname"
                        aria-describedby="maiden_name-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Race <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.race"
                        class="form-control"
                        id=""
                      >
                        <option value="">Select Race</option>
                        <option value="Black">Black</option>
                        <option value="Coloured">Coloured</option>
                        <option value="Indian">Indian</option>
                        <option value="White">White</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >ID/Passport Number
                      </label>
                      <input
                        type="text"
                        v-model="user.student_id"
                        class="form-control"
                        placeholder="Passport Number"
                        aria-label="OtherName"
                        aria-describedby="other_name-addon"
                        disabled
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Do you have any disability
                        <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.disability"
                        class="form-control"
                        id=""
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
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
  mounted() {},
  data() {
    return {
      homeLanguages: [
        "Afrikaans",
        "English",
        "IsiNdebele",
        "IsiXhosa",
        "IsiZulu",
        "Sepedi/N Sotho",
        "Sesotho",
        "SeTswana",
        "SiSwati",
        "TshiVenda",
        "XiTsonga",
        "Other",
      ],
      form: this.getForm(),
      loading: false,
      disabled: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "student/pageData",
    }),
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
        (this.form.first_name = newVal ? newVal.first_name : ""),
          (this.form.last_name = newVal ? newVal.last_name : ""),
          (this.form.title = newVal.profile
            ? newVal.profile.title
              ? newVal.profile.title
              : ""
            : "");
        this.form.gender = newVal.profile
          ? newVal.profile.gender
            ? newVal.profile.gender
            : ""
          : "";
        this.form.other_name = newVal.profile ? newVal.profile.other_name : "";
        this.form.maiden_name = newVal.profile
          ? newVal.profile.maiden_name
          : "";
        this.form.race = newVal.profile
          ? newVal.profile.race
            ? newVal.profile.race
            : ""
          : "";
        this.form.home_language = newVal.profile
          ? newVal.profile.home_language
            ? newVal.profile.home_language
            : ""
          : "";
        this.form.disability = newVal.profile
          ? newVal.profile.have_disability
            ? "Yes"
            : "No"
          : "";
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async processPersonalInformation() {
      this.loading = true;
      this.disabled = true;
      await this.$axios
        .post(`/admin/students/${this.user.id}/personal-details`, this.form)
        .then((res) => {
          this.stopLoader();
          notify("Personal details updated successfully", "success");
          this.$store.commit("student/UPDATE_USER_INFO", res.data.data);
          this.$root.$emit('update_tab', 'contact_details')
        })
        .catch((err) => {
          console.log(err);
          this.stopLoader();
          handleError(err);
        });
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    getForm() {
      return {
        title: "",
        gender: "",
        first_name: "",
        last_name: "",
        other_name: "",
        maiden_name: "",
        home_language: "",
        race: "",
        disability: "No",
      };
    },
  },
};
</script>
