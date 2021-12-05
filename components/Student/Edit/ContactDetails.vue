<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3" v-if="user">
            <form role="form" @submit.prevent="processContactInformation()">
              <!-- <div class="row"> -->
              <div class="col-lg-6">
                <div class="d-flex flex-column h-100">
                  <div class="mb-3">
                    <label class="custom-text" for="">Mobile Number </label>
                    <input
                      type="text"
                      disabled
                      v-model="user.phone_number"
                      class="form-control"
                      placeholder="Mobile Number"
                      aria-label="Mobile Number"
                      aria-describedby="mobile-number-addon"
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="d-flex flex-column h-100">
                  <div class="mb-3">
                    <label class="custom-text" for="">Telephone</label>
                    <vue-phone-number-input
                      v-model="telephone"
                      :default-country-code="country_code"
                      @update="phoneResult = $event"
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="d-flex flex-column h-100">
                  <div class="mb-3">
                    <label class="custom-text" for="">FAX</label>
                    <input
                      type="text"
                      v-model="form.fax"
                      class="form-control"
                      placeholder="FAX"
                      aria-label="Fax"
                      aria-describedby="fax-addon"
                    />
                  </div>
                </div>
              </div>
              <!-- </div> -->
              <p><br /></p>
              <div class="row">
                <div class="col-lg-6">
                  <p class="text-center">
                    Home Address <span class="text-danger">*</span>
                  </p>
                  <div class="d-flex flex-column h-100">
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >House/Building No
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.house_number"
                        class="form-control"
                        placeholder="House/Building Number"
                        aria-label="house-number"
                        aria-describedby="house-number-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Street <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.street"
                        class="form-control"
                        placeholder="Street"
                        aria-label="street"
                        aria-describedby="street-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for="">Area/Location</label>
                      <input
                        type="text"
                        v-model="form.area"
                        class="form-control"
                        placeholder="Area/Location"
                        aria-label="area"
                        aria-describedby="area-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >City <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.city"
                        class="form-control"
                        placeholder="City"
                        aria-label="city"
                        aria-describedby="city-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Postal Code <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.postal_code"
                        class="form-control"
                        placeholder="Postal Code"
                        aria-label="postal-code"
                        aria-describedby="postal-code-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Country <span class="text-danger">*</span></label
                      >
                      <multiselect
                        v-model="selectCountry"
                        :options="select.countries"
                        track-by="id"
                        label="name"
                        required
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        placeholder="Select Country"
                      >
                      </multiselect>
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >State/Province
                        <span class="text-danger">*</span></label
                      >
                      <multiselect
                        v-model="selectState"
                        :options="states"
                        track-by="id"
                        label="name"
                        required
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        placeholder="Select State/Province"
                      >
                      </multiselect>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <p class="text-center">
                    Postal Address <span class="text-danger">*</span>
                  </p>
                  <div class="mb-3">
                    <label class="custom-text" for="">Same as Home Address?</label>
                    <select
                      name=""
                      v-model="form.is_home"
                      class="form-control"
                      id=""
                    >
                      <option :value="true">Yes</option>
                      <option :value="false">No</option>
                    </select>
                  </div>
                  <div class="d-flex flex-column h-100" v-if="!form.is_home">
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >House/Building No
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.postal_house_number"
                        class="form-control"
                        placeholder="House/Building Number"
                        aria-label="house-number"
                        aria-describedby="house-number-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Street <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.postal_street"
                        class="form-control"
                        placeholder="Street"
                        aria-label="street"
                        aria-describedby="street-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for="">Area/Location</label>
                      <input
                        type="text"
                        v-model="form.postal_area"
                        class="form-control"
                        placeholder="Area/Location"
                        aria-label="area"
                        aria-describedby="area-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >City <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.postal_city"
                        class="form-control"
                        placeholder="City"
                        aria-label="city"
                        aria-describedby="city-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Postal Code <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="form.postal_postal_code"
                        class="form-control"
                        placeholder="Postal Code"
                        aria-label="postal-code"
                        aria-describedby="postal-code-addon"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >Country <span class="text-danger">*</span></label
                      >
                      <multiselect
                        v-model="selectPostalCountry"
                        :options="select.countries"
                        track-by="id"
                        label="name"
                        required
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        placeholder="Select Country"
                      >
                      </multiselect>
                    </div>
                    <div class="mb-3">
                      <label class="custom-text" for=""
                        >State/Province
                        <span class="text-danger">*</span></label
                      >
                      <multiselect
                        v-model="selectPostalState"
                        :options="postal_states"
                        track-by="id"
                        label="name"
                        required
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        placeholder="Select State/Province"
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
import { mapGetters } from "vuex";
import { notify, handleError } from "@/assets/js/utility";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  mounted() {},
  components: {
    Multiselect
  },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      selectCountry: "",
      selectState: "",
      selectPostalCountry: "",
      selectPostalState: "",
      states: [],
      postal_states: [],
      phoneResult: "",
      country_code: "ZA",
      telephone: ""
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
        if (newVal) {
          this.form.house_number = newVal.address
            ? newVal.address.house_number
            : "";
          this.form.street = newVal.address ? newVal.address.street : "";
          this.form.area = newVal.address ? newVal.address.area : "";
          this.form.city = newVal.address ? newVal.address.city : "";
          this.form.postal_code = newVal.address
            ? newVal.address.postal_code
            : "";
          this.form.is_home = newVal.address
            ? newVal.address.is_home_address
            : false;
          this.selectState = newVal.address ? newVal.address.state : "";
          this.selectCountry = newVal.address ? newVal.address.country : "";
          this.form.postal_house_number = newVal.address
            ? newVal.address.postal_house_number
            : "";
          this.form.postal_street = newVal.address
            ? newVal.address.postal_street
            : "";
          this.form.postal_area = newVal.address
            ? newVal.address.postal_area
            : "";
          this.form.postal_city = newVal.address
            ? newVal.address.postal_city
            : "";
          this.form.postal_postal_code = newVal.address
            ? newVal.address.postal_postal_code
            : "";
          this.selectPostalState = newVal.address
            ? newVal.address.postal_state
            : "";
          this.selectPostalCountry = newVal.address
            ? newVal.address.postal_country
            : "";
          this.form.email = newVal.email;
          this.telephone = newVal.profile ? newVal.profile.telephone : "";
          this.form.fax = newVal.profile ? newVal.profile.fax : "";
          this.country_code = newVal.profile.telephone_country_code
            ? newVal.profile.telephone_country_code
            : this.country_code;
        }
      },
      immediate: true,
      deep: true
    },
    selectCountry: {
      handler(newVal, oldVal) {
        this.states = _.filter(this.select.states, { country_id: newVal.id });
      }
    },
    selectPostalCountry: {
      handler(newVal, oldVal) {
        this.postal_states = _.filter(this.select.states, {
          country_id: newVal.id
        });
      }
    }
  },
  methods: {
    async processContactInformation() {
      this.loading = true;
      this.disabled = true;
      if (this.selectCountry) {
        this.form.country_id = this.selectCountry.id;
      }
      if (this.selectState) {
        this.form.state_id = this.selectState.id;
      }
      if (this.selectPostalCountry) {
        this.form.postal_country_id = this.selectPostalCountry.id;
      }
      if (this.selectPostalState) {
        this.form.postal_state_id = this.selectPostalState.id;
      }
      if (this.phoneResult) {
        this.form.telephone = {
          country_code: this.phoneResult.countryCode,
          phone_code: this.phoneResult.countryCallingCode,
          phone_number: this.telephone
        };
      }
      await this.$axios
        .post(`/admin/students/${this.user.id}/contact-details`, this.form)
        .then(res => {
          this.stopLoader();
          notify("Contact details updated successfully", "success");
          this.$store.commit("student/UPDATE_USER_INFO", res.data.data);
          this.$root.$emit('update_tab', 'sponsor_information')
        })
        .catch(err => {
          console.log(err);
          this.stopLoader();
          handleError(err);
        });
    },
    goBack() {
      this.$root.$emit('update_tab', 'personal_details')
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    getForm() {
      return {
        house_number: "",
        street: "",
        area: "",
        city: "",
        postal_code: "",
        state_id: "",
        country_id: "",
        is_home: false,
        postal_house_number: "",
        postal_street: "",
        postal_area: "",
        postal_city: "",
        postal_postal_code: "",
        postal_state_id: "",
        postal_country_id: "",
        email: "",
        fax: "",
        telephone: ""
      };
    }
  }
};
</script>
