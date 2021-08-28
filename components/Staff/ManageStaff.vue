<template>
  <div class="row clearfix">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Basic Information</h3>
        </div>
        <form @submit.prevent="processStaff()">
          <div class="card-body">
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    required
                    v-model="form.first_name"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    required
                    v-model="form.last_name"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    required
                    v-model="form.phone_number"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    v-model="form.email"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-4 col-sm-12" v-if="!isUpdate">
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    v-model="form.password"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-4 col-sm-12" v-if="!isUpdate">
                <div class="form-group">
                  <label>Re Password</label>
                  <input
                    type="password"
                    required
                    v-model="form.re_password"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-4 col-sm-12">
                <div class="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    class="form-control"
                    placeholder="Date of Birth"
                    required
                    v-model="form.dob"
                  />
                </div>
              </div>
              <div class="col-md-4 col-sm-12">
                <label>Gender</label>
                <select
                  class="form-control show-tick"
                  required
                  v-model="form.gender"
                >
                  <option value="">-- Gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div class="col-md-5 col-sm-12">
                <label for="">Avatar</label>
                <div class="form-group">
                  <button
                    @click="form.file_url = 'new'"
                    type="button"
                    class="btn btn-primary"
                  >
                    <i class="fa fa-image mr-2"></i>Upload New
                  </button>
                </div>
              </div>
              <div class="col-md-3 col-sm-12" v-if="form.file_url !== ''">
                <img
                  :src="form.file_url"
                  style="width: 50px; height: 50px"
                  alt=""
                />
              </div>

              <div class="col-md-4 col-sm-12" v-if="roles">
                <div class="form-group">
                  <label>Role</label>
                  <multiselect
                    v-model="form.selectRole"
                    :options="roles"
                    track-by="id"
                    label="name"
                    required
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Select Role"
                  >
                  </multiselect>
                </div>
              </div>
              <div class="col-md-4 col-sm-12" v-if="qualifications">
                <label>Position</label>
                <select
                  class="form-control show-tick"
                  v-model="form.position"
                  required
                >
                  <option value="">-- Position --</option>
                  <option value="Intern">Intern</option>
                  <option value="Lecturer">Lecturer</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12">
                <label>Mode</label>
                <select
                  class="form-control show-tick"
                  v-model="form.mode"
                  required
                >
                  <option value="">-- Mode --</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Full Time">Full Time</option>
                </select>
              </div>
              <div class="col-md-12 col-sm-12 mt-3" v-if="qualifications">
                <div
                  class="row"
                  v-for="(data, index) in form.selectQualifications"
                  :key="index"
                >
                  <div class="col-md-5 col-sm-12">
                    <div class="form-group">
                      <label>Qualification</label>
                      <multiselect
                        v-model="data.selectedQualification"
                        :options="qualifications"
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
                  </div>
                  <div class="col-md-5 col-sm-12">
                    <div class="form-group">
                      <label>Level</label>
                      <multiselect
                        v-model="data.selectedLevel"
                        :options="levels"
                        required
                        :multiple="false"
                        :searchable="true"
                        :close-on-select="true"
                        :show-labels="false"
                        placeholder="Select Level"
                      >
                      </multiselect>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-icon btn-sm"
                    title="Add More"
                    v-if="index + 1 === form.selectQualifications.length"
                    @click="addRow()"
                  >
                    <i class="fa fa-plus text-success"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-icon btn-sm"
                    title="Remove"
                    v-if="index > 0"
                    @click="deleteRow()"
                  >
                    <i class="fa fa-minus text-danger"></i>
                  </button>
                </div>
              </div>
              <div class="col-md-12 col-sm-12">
                <div class="form-group">
                  <label>Address</label>
                  <textarea
                    name=""
                    required
                    v-model="form.address"
                    class="form-control"
                  ></textarea>
                </div>
              </div>
              <div class="col-sm-12">
                <Button
                  :button_class="'btn btn-primary'"
                  :disabled="disabled"
                  :button_type="'submit'"
                  :loading="loading"
                  :value="buttonName"
                />
                <Button
                  :button_class="'btn btn-outline-secondary'"
                  :disabled="disabled"
                  :button_type="'button'"
                  :loading="loading"
                  :value="'Cancel'"
                  @click.native="cancelForm()"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <uploader :file_type="form.file_type" />
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Uploader from "@/components/Uploader";
import { notify, handleError } from "@/assets/js/utility";

export default {
  props: {
    qualifications: {
      type: Array,
    },
    levels: {
      type: Array,
    },
    roles: {
      type: Array,
    },
  },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      loadingCancel: false,
      disabledCancel: false,
      records: this.getRecords(),
      buttonName: "Submit",
      isUpdate: false,
    };
  },
  components: {
    Multiselect,
    Uploader,
  },
  computed: {
    ...mapGetters({
      file_url: "upload/file",
      file_type: "upload/file_type",
      teacher_data: "app/pageViewData",
    }),
    ...mapState({
      file: (state) => state.upload.file,
    }),
  },
  watch: {
    "form.file_url"(value) {
      if (value === "new") {
        if (!this.form.file_type) {
          this.form.file_url = "";
          notify("Please select a file type");
        } else {
          this.triggerUploader();
        }
      }
    },
    "form.file_type": {
      handler(newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.$store.commit("upload/SET_FILE_TYPE", newVal);
        }
      },
    },
    file(value) {
      if (value) {
        this.form.file_url = value;
      }
    },
    teacher_data(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.form.first_name = newVal.first_name;
        this.form.last_name = newVal.last_name;
        this.form.email = newVal.email;
        this.form.phone_number = newVal.phone_number;
        this.form.dob = newVal.profile.dob;
        this.form.gender = newVal.profile.gender;
        this.form.position = newVal.profile.position;
        this.form.mode = newVal.mode;
        this.form.file_url = newVal.profile.avatar;
        this.form.address = newVal.profile.address;
        this.form.gender = newVal.profile.gender;
        this.form.selectRole = newVal.role_object;
        _.map(newVal.qualifications_collection, (value) => {
          this.form.selectQualifications.push({
            selectedQualification: value,
            selectedLevel: value.level.level,
          });
        });
      }
    },
  },
  mounted() {
    let self = this;
    self.$root.$on("bv::modal::hidden", (bvEvent, modalId) => {
      if (modalId === "custom-uploader") {
        if (!self.file) self.form.file_url = "";
      }
    });
    self.$root.$on("edit-teacher", function(val) {
      self.buttonName = "Update";
      self.isUpdate = true;
      self.form.selectQualifications = [];
    });
    if (!self.form.selectQualifications.length) {
      self.addRow();
    }
  },
  methods: {
    triggerUploader() {
      this.$bvModal.show("custom-uploader");
    },
    uploadDone() {
      this.$bvModal.hide("custom-uploader");
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    addRow() {
      this.form.selectQualifications.push({
        selectedQualification: "",
        selectedLevel: "",
      });
    },
    deleteRow: function(index) {
      this.form.selectQualifications.splice(index, 1);
    },
    getForm() {
      return {
        file_type: "image",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        dob: "",
        gender: "",
        mode: "",
        selectQualifications: [],
        qualifications: [],
        position: "",
        password: "",
        re_password: "",
        address: "",
        avatar: "",
        selectQualification: [],
        file_url: "",
        role: "",
      };
    },
    processStaff() {
      this.loading = true;
      this.disabled = true;
      this.form.avatar = this.file_url;
      _.map(this.form.selectQualifications, (value) => {
          this.form.qualifications.push({
            id: value.selectedQualification.id,
            level: value.selectedLevel,
          });
        });
      if (this.roles) {
        this.form.role = this.form.selectRole.name;
      } else {
        delete this.form.role;
      }
      if (this.isUpdate) {
        this.form.avatar = this.form.file_url;
        this.updateRequest(this.form);
      } else {
        this.storeRequest(this.form);
      }
    },
    async storeRequest(form) {
      await this.$axios
        .post("/teachers", form)
        .then((res) => {
          notify("New staff created successfully", "success");
          this.stopLoader();
          this.form = this.getForm();
          this.form.qualifications = [];
          if (this.roles) {
            this.$root.$emit("non_academic_staff_paginate", this.records);
          } else {
            this.$root.$emit("academic_staff_paginate", this.records);
          }
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    async updateRequest(form) {
      await this.$axios
        .patch(`/teachers/${this.teacher_data.id}`, form)
        .then((res) => {
          notify("Staff updated successfully", "success");
          this.stopLoader();
          this.$store.commit("app/UPDATE_DATA", res.data.data);
          this.form.qualifications = [];
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    cancelForm() {
      if (!this.loading && !this.disabled) {
        this.form = this.getForm();
      }
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
  },
};
</script>
