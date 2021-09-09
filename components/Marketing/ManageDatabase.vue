<template>
  <div class="row clearfix">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Marketing Database Info</h3>
        </div>
        <form @submit.prevent="processDatabase()">
          <div class="card-body">
            <div class="row clearfix">
              <div class="col-lg-4 col-md-4 col-sm-6 mb-2">
                <label for="">Year</label>
                <div class="form-group">
                  <multiselect
                    v-model="form.year"
                    :options="years"
                    required
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Select Year"
                  >
                  </multiselect>
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-6 mb-2">
                <label for="">Province</label>
                <div class="form-group">
                  <multiselect
                    v-model="form.province"
                    :options="provinces"
                    required
                    :multiple="true"
                    :searchable="true"
                    :close-on-select="false"
                    :show-labels="false"
                    placeholder="Select Province"
                  >
                  </multiselect>
                </div>
              </div>
              <div class="col-md-5 col-sm-12">
                <label for="">File Type</label>
                <div class="form-group">
                  <select name="" v-model="form.file_type" class="form-control">
                    <option value="" disabled>Select File Type</option>
                    <option
                      :value="file_type.type"
                      v-for="(file_type, index) in file_types"
                      :key="index"
                    >
                      {{ file_type.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-5 col-sm-12">
                <label for="">Upload Database</label>
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
                  v-if="file_type === 'img'"
                  :src="form.file_url"
                  style="width: 50px; height: 50px"
                  alt=""
                />
                <file-type
                  v-else
                  :file_type="form.file_type"
                  :file_url="form.file_url"
                  :file_name="file_name"
                />
              </div>
              <div class="col-md-12 col-sm-12">
                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    name=""
                    required
                    v-model="form.description"
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
    <uploader :file_type="form.file_type" :folder="`marketing`" />
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Uploader from "@/components/Uploader";
import { notify, handleError } from "@/assets/js/utility";
import FileType from "../FileType.vue";

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
      file_types: [
        {
          type: "docx",
          name: "Microsoft Word Document",
        },
        {
          type: "xlsx",
          name: "Microsoft Excel Document",
        },
        {
          type: "pdf",
          name: "PDF Document",
        },
        {
          type: "img",
          name: "Image File",
        },
      ],
      provinces: [
        "Eastern Cape",
        "Free State",
        "Gauteng",
        "KwaZulu-Natal",
        "Limpopo",
        "Mpumalanga",
        "Northern Cape",
        "North West",
        "Western Cape",
      ],
      years: ["2021", "2022", "2023", "2024", "2025"],
    };
  },
  components: {
    Multiselect,
    Uploader,
    FileType,
  },
  computed: {
    ...mapGetters({
      file_url: "upload/file",
      file_name: "upload/file_name",
      file_type: "upload/file_type",
      marketing_data: "app/pageViewData",
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
    marketing_data(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.file_name = newVal.file_name;
        this.form.file_type = newVal.file_type;
        this.form.file_url = newVal.file_url;
        this.form.description = newVal.description;
        this.form.province = newVal.province;
        this.form.year = newVal.year;
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
    self.$root.$on("edit-database", function(val) {
      self.buttonName = "Update";
      self.isUpdate = true;
    });
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
    getForm() {
      return {
        file_name: "",
        file_type: "",
        file_url: "",
        description: "",
        year: "",
        province: "",
      };
    },
    processDatabase() {
      this.loading = true;
      this.disabled = true;
      this.form.file_url = this.file_url;
      this.form.file_name = this.file_name
      if (this.isUpdate) {
        this.updateRequest(this.form);
      } else {
        this.storeRequest(this.form);
      }
    },
    async storeRequest(form) {
      await this.$axios
        .post("/marketing/databases", form)
        .then((res) => {
          notify("Marketing Database created successfully", "success");
          this.stopLoader();
          this.form = this.getForm();
          this.form.qualifications = [];
          this.$root.$emit("marketing_paginate", this.records);
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    async updateRequest(form) {
      await this.$axios
        .patch(`/marketing/databases/${this.marketing_data.id}`, form)
        .then((res) => {
          notify("Marketing Database updated successfully", "success");
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
