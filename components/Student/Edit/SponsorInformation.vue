<!-- <template>
  <div class="container-fluid py-4">
    <div class="row mt-4">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <form role="form" @submit.prevent="processSponsorInformation()">
              <div class="row">
                <div class="col-lg-6">
                  <div class="d-flex flex-column h-100">
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Who will be paying your fees?
                        <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.sponsor_type"
                        class="form-control"
                        id=""
                      >
                        <option
                          :value="type.key"
                          v-for="type in sponsorTypes"
                          :key="type.key"
                          >{{ type.value }}</option
                        >
                      </select>
                    </div>
                    <div class="mb-3" v-if="form.sponsor_type === 'bursary'">
                      <label class="custom-text" for="">Bursary Body </label>
                      <input
                        type="text"
                        v-model="form.body_name"
                        class="form-control"
                        placeholder="Bursary Body Name"
                        aria-label="OtherName"
                        aria-describedby="other_name-addon"
                      />
                    </div>
                    <div class="mb-3" v-if="form.sponsor_type === 'bursary'">
                      <label class="custom-text" for=""
                        >Bursary Body Telephone
                        <span class="text-danger">*</span></label
                      >
                      <vue-phone-number-input
                        v-model="bursaryPhone"
                        :default-country-code="bursary_country_code"
                        :required="true"
                        @update="bursaryBodyPhoneResult = $event"
                      />
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        ['myself', 'parents', 'family_members'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
                      <label class="custom-text" for=""
                        >Title <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.title"
                        class="form-control"
                        id=""
                        :disabled="shouldDisabled"
                      >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                      </select>
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        ['myself', 'parents', 'family_members'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
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
                        :disabled="shouldDisabled"
                      />
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        ['myself', 'parents', 'family_members'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
                      <label class="custom-text" for="">Other Name </label>
                      <input
                        type="text"
                        v-model="form.other_name"
                        class="form-control"
                        placeholder="Other Name"
                        aria-label="OtherName"
                        aria-describedby="other_name-addon"
                        :disabled="shouldDisabled"
                      />
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        ['myself', 'parents', 'family_members'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
                      <label class="custom-text" for=""
                        >Nationality <span class="text-danger">*</span></label
                      >
                      <multiselect
                        v-model="selectCountry"
                        :options="select.countries"
                        track-by="id"
                        label="name"
                        :disabled="shouldDisabled"
                        required
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        placeholder="Select Nationality"
                      >
                      </multiselect>
                    </div>
                    <div class="mb-3" v-if="form.sponsor_type === 'myself'">
                      <label class="custom-text" for=""
                        >Home Language <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.home_language"
                        class="form-control"
                        id=""
                        :disabled="shouldDisabled"
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
                    <div
                      class="mb-3"
                      v-if="
                        ['employer', 'trust_fund'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
                      <label class="custom-text" for="">Employer Name </label>
                      <input
                        type="text"
                        v-model="form.cooperate_name"
                        class="form-control"
                        placeholder="Employer Name"
                        aria-label="EmployerName"
                        aria-describedby="employer-name-addon"
                      />
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        ['employer', 'trust_fund'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
                      <label class="custom-text" for="">Employer Email </label>
                      <input
                        type="text"
                        v-model="form.cooperate_email"
                        class="form-control"
                        placeholder="Employer Email"
                        aria-label="EmployerEmail"
                        aria-describedby="employer-email-addon"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="d-flex flex-column h-100">
                    <div
                      class="mb-3"
                      v-if="
                        ['myself', 'parents', 'family_members'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
                      <label class="custom-text" for=""
                        >Gender <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.gender"
                        class="form-control"
                        id=""
                        :disabled="shouldDisabled"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        ['myself', 'parents', 'family_members'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
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
                        :disabled="shouldDisabled"
                      />
                    </div>
                    <div class="mb-3" v-if="form.sponsor_type === 'myself'">
                      <label class="custom-text" for="">Maiden Name </label>
                      <input
                        type="text"
                        v-model="form.maiden_name"
                        class="form-control"
                        placeholder="Maiden Name if applicable"
                        aria-label="Maidenname"
                        aria-describedby="maiden_name-addon"
                        :disabled="shouldDisabled"
                      />
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        ['myself', 'parents', 'family_members'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
                      <label class="custom-text" for=""
                        >Race <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        v-model="form.race"
                        class="form-control"
                        id=""
                        :disabled="shouldDisabled"
                      >
                        <option value="">Select Race</option>
                        <option value="Black">Black</option>
                        <option value="Coloured">Coloured</option>
                        <option value="Indian">Indian</option>
                        <option value="White">White</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        ['myself', 'parents', 'family_members'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
                      <label class="custom-text" for=""
                        >ID/Passport Number
                      </label>
                      <input
                        type="text"
                        v-model="form.passport_number"
                        class="form-control"
                        placeholder="Passport Number"
                        aria-label="OtherName"
                        aria-describedby="other_name-addon"
                        :disabled="shouldDisabled"
                      />
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        ['employer', 'trust_fund'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
                      <label class="custom-text" for=""
                        >Employer Telephone
                        <span class="text-danger">*</span></label
                      >
                      <vue-phone-number-input
                        v-model="telephone"
                        :default-country-code="country_code"
                        :required="true"
                        @update="phoneResult = $event"
                      />
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        ['employer', 'trust_fund'].includes(
                          this.form.sponsor_type
                        )
                      "
                    >
                      <label class="custom-text" for=""
                        >Employer Address
                        <span class="text-danger">*</span></label
                      >
                      <textarea
                        name=""
                        v-model="form.cooperate_address"
                        class="form-control"
                        id=""
                        cols="10"
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <p><br /></p>
              <p class="text-center">
                Fields marked with asterisk(<span class="text-danger">*</span>)
                must be filled before advancing to the next page!
              </p>
              <div
                class="text-left side-by-side-button w-200"
              >
                <button type="button" @click="goBack()" class="btn btn-primary"
                  >Back</button
                >
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
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import { notify, handleError } from "@/assets/js/utility";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  mounted() {
  },
  components: {
    Multiselect
  },
  data() {
    return {
      sponsorTypes: [
        {
          key: "",
          value: "Select Sponsor Type"
        },
        {
          key: "myself",
          value: "Myself"
        },
        {
          key: "parents",
          value: "Parents/Guardian"
        },
        {
          key: "family_members",
          value: "Family member"
        },
        {
          key: "employer",
          value: "Employer"
        },
        {
          key: "trust_fund",
          value: "Trust Fund"
        },
        {
          key: "bursary",
          value: "Bursary"
        }
      ],
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
        "Other"
      ],
      form: this.getForm(),
      loading: false,
      disabled: false,
      selectCountry: "",
      shouldDisabled: false,
      phoneResult: null,
      country_code: "ZA",
      bursary_country_code: "ZA",
      telephone: "",
      bursaryPhone: "",
      bursaryBodyPhoneResult: null
    };
  },
  computed: {
    ...mapGetters({
      user: "student/pageData",
      select: "select/select"
    })
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
        this.form.sponsor_type = newVal.sponsor
          ? newVal.sponsor.sponsor_type
          : "";
      },
      immediate: true,
      deep: true
    },
    "form.sponsor_type": {
      handler(newVal, oldVal) {
        if (newVal === "myself") {
          (this.form.first_name = this.user.first_name),
            (this.form.last_name = this.user.last_name),
            (this.form.title = this.user.profile
              ? this.user.profile.title
              : "");
          this.form.gender = this.user.profile ? this.user.profile.gender : "";
          this.form.other_name = this.user.profile
            ? this.user.profile.other_name
            : "";
          this.form.maiden_name = this.user.profile
            ? this.user.profile.maiden_name
            : "";
          this.form.race = this.user.profile ? this.user.profile.race : "";
          this.form.home_language = this.user.profile
            ? this.user.profile.home_language
            : "";
          this.form.disability = this.user.profile
            ? this.user.profile.have_disability
              ? "Yes"
              : "No"
            : "";
          this.form.passport_number = this.user.student_id;
          this.selectCountry = this.user.profile
            ? this.user.profile.nationality
            : "";
          this.shouldDisabled = true;
        } else if (newVal === "employer" || newVal === "trust_fund") {
          this.form.cooperate_name = this.user.sponsor
            ? this.user.sponsor.cooperate_name
            : "";
          this.form.cooperate_email = this.user.sponsor
            ? this.user.sponsor.cooperate_email
            : "";
          this.telephone = this.user.sponsor && this.user.sponsor.cooperate_telephone
            ? this.user.sponsor.cooperate_telephone
            : "";
          this.country_code = this.user.sponsor
            ? this.user.sponsor.country_code
            : this.country_code;
          this.form.cooperate_address = this.user.sponsor
            ? this.user.sponsor.cooperate_address
            : "";
          this.shouldDisabled = false;
        } else if (newVal === "parents" || newVal === "family_members") {
          (this.form.first_name = this.user.sponsor
            ? this.user.sponsor.first_name
            : ""),
            (this.form.last_name = this.user.sponsor
              ? this.user.sponsor.last_name
              : ""),
            (this.form.title = this.user.sponsor
              ? this.user.sponsor.title
              : "");
          this.form.gender = this.user.sponsor ? this.user.sponsor.gender : "";
          this.form.other_name = this.user.sponsor
            ? this.user.sponsor.other_name
            : "";
          this.form.maiden_name = this.user.sponsor
            ? this.user.sponsor.maiden_name
            : "";
          this.form.race = this.user.sponsor ? this.user.sponsor.race : "";
          this.form.passport_number = this.user.sponsor
            ? this.user.sponsor.passport_number
            : "";
          this.selectCountry = this.user.profile
            ? this.user.profile.nationality
            : "";
          this.shouldDisabled = false;
        } else if (newVal === "bursary") {
          if (this.user.next_stage != "end") {
            Swal.fire({
              title: `IMPORTANT NOTICE!`,
              text: "No NASFAS! but we accept other Bursaries",
              icon: "warning",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              showLoaderOnConfirm: true,
              confirmButtonText: "Continue",
              allowOutsideClick: false
            });
          }
          this.form.body_name = this.user.sponsor
            ? this.user.sponsor.body_name
            : "";
          this.bursaryPhone = this.user.sponsor
            ? `${this.user.sponsor.bursary_body_phone}`
            : "";
          this.bursary_country_code = this.user.sponsor && this.user.sponsor.bursary_body_phone_country_code
            ? this.user.sponsor.bursary_body_phone_country_code
            : this.bursary_country_code;
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async processSponsorInformation() {
      this.loading = true;
      this.disabled = true;
      if (this.selectCountry) {
        this.form.country_id = this.selectCountry.id;
      }
      if (this.phoneResult) {
        this.form.cooperate_telephone = {
          country_code: this.phoneResult.countryCode,
          phone_code: this.phoneResult.countryCallingCode,
          phone_number: this.telephone
        };
      }
      if (this.bursaryBodyPhoneResult) {
        this.form.bursary_phone_number = {
          country_code: this.bursaryBodyPhoneResult.countryCode,
          phone_code: this.bursaryBodyPhoneResult.countryCallingCode,
          phone_number: this.bursaryPhone
        };
      }
      if (this.form.race === "") {
        delete this.form.race;
      }
      if (this.form.maiden_name === "" || this.form.maiden_name === null) {
        delete this.form.maiden_name;
      }
      if (this.form.other_name === "" || this.form.other_name === null) {
        delete this.form.other_name;
      }
      if (this.form.country_id === "") {
        delete this.form.country_id;
      }
      if (this.form.gender === "") {
        delete this.form.gender;
      }
      if (this.form.cooperate_telephone === "") {
        delete this.form.cooperate_telephone;
      }
      await this.$axios
        .post(`/admin/students/${this.user.id}/sponsor-information`, this.form)
        .then(res => {
          this.stopLoader();
          notify("Sponsor information updated successfully", "success");
          this.$store.commit("student/UPDATE_USER_INFO", res.data.data);
          this.$root.$emit('update_tab', 'education_history')
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
    goBack() {
      this.$root.$emit('update_tab', 'contact_details')
    },
    getForm() {
      return {
        sponsor_type: "myself",
        title: "",
        first_name: "",
        last_name: "",
        other_name: "",
        maiden_name: "",
        country_id: "",
        gender: "",
        home_language: "",
        race: "",
        passport_number: "",
        cooperate_name: "",
        cooperate_email: "",
        cooperate_telephone: "",
        cooperate_address: "",
        body_name: ""
      };
    }
  }
};
</script> -->
