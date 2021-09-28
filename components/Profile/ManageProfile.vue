<template>
  <span v-if="Object.keys(user_data).length != 0">
    <form @submit.prevent="updateProfile()">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Manage Profile</h3>
        </div>
        <div class="card-body form-horizontal">
          <div class="form-group row">
            <label class="col-md-3 col-form-label"
              >Email address <span class="text-danger">*</span></label
            >
            <div class="col-md-7">
              <input
                type="text"
                disabled
                class="form-control"
                placeholder="email address"
                v-model="form.email"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 col-form-label"
              >First Name <span class="text-danger">*</span></label
            >
            <div class="col-md-7">
              <input
                type="text"
                class="form-control"
                v-model="form.first_name"
                placeholder="first name"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 col-form-label"
              >Last Name <span class="text-danger">*</span></label
            >
            <div class="col-md-7">
              <input
                type="text"
                class="form-control"
                v-model="form.last_name"
                placeholder="last name"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 col-form-label"
              >Phone Number <span class="text-danger">*</span></label
            >
            <div class="col-md-7">
              <input
                type="text"
                class="form-control"
                v-model="form.phone_number"
                placeholder="phone number"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 col-form-label"
              >Avatar <span class="text-danger">*</span></label
            >
            <div class="col-md-7">
              <button
                @click="form.file_url = 'new'"
                type="button"
                class="btn btn-danger mb-2"
              >
                <i class="fa fa-image mr-2"></i>Upload New
              </button>
              <div class="col-md-3 col-sm-12" v-if="form.file_url !== ''">
                <img
                  :src="form.file_url"
                  style="width: 50px; height: 50px"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-3 col-form-label"
              >Address <span class="text-danger">*</span></label
            >
            <div class="col-md-7">
              <input
                type="text"
                class="form-control"
                placeholder="Home Address"
                v-model="form.address"
              />
            </div>
          </div>
        </div>
        <div class="card-footer text-right">
          <Button
            :button_class="'btn btn-danger'"
            :disabled="disabled"
            :button_type="'submit'"
            :loading="loading"
            :value="`Update Profile`"
          />
        </div>
      </div>
    </form>
    <uploader :file_type="form.file_type" />
  </span>
  <loader v-else />
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Uploader from "@/components/Uploader";
import { notify, handleError } from "@/assets/js/utility";
import Loader from "../Loader.vue";
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      form: this.getForm(),
    };
  },
  components: {
    Uploader,
    Loader,
  },
  computed: {
    ...mapGetters({
      file_url: "upload/file",
      file_type: "upload/file_type",
      user_data: "app/pageViewData",
    }),
    ...mapState({
      file: (state) => state.upload.file,
    }),
  },
  watch: {
    user_data: {
      immediate: true,
      handler(newVal) {
        console.log(newVal);
        this.form.first_name = newVal.first_name;
        this.form.last_name = newVal.last_name;
        this.form.email = newVal.email;
        this.form.phone_number = newVal.phone_number;
        this.form.address = newVal.profile ? newVal.profile.address : "";
        this.form.file_url = newVal.profile ? newVal.profile.avatar : "";
      },
    },
    "form.file_url": {
      immediate: true,
      handler(value) {
        if (value === "new") {
          if (!this.form.file_type) {
            this.form.file_url = "";
            notify("Please select a file type");
          } else {
            this.triggerUploader();
          }
        }
      },
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
  },
  mounted() {
    this.getUser();
    let self = this;
    self.$root.$on("bv::modal::hidden", (bvEvent, modalId) => {
      if (modalId === "custom-uploader") {
        if (!self.file) self.form.file_url = "";
      }
    });
  },
  methods: {
    getUser() {
      this.$axios
        .get("/me")
        .then((res) => {
          this.$store.commit("app/SET_VIEW_DATA", res.data.data);
        })
        .catch((err) => {});
    },
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
        file_type: "image",
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        avatar: "",
        file_url: "",
      };
    },
    async updateProfile() {
      this.form.name = `${this.form.first_name} ${this.form.last_name}`;
      this.loading = true;
      this.disabled = true;
      await this.$axios
        .patch(`/users`, this.form)
        .then((res) => {
          notify("Profile updated successfully", "success");
          this.stopLoader();
          this.$store.commit("app/SET_VIEW_DATA", res.data.data);
          this.$store.commit("auth/FETCH_USER_SUCCESS", res.data.data);
          notify("User profile updated successfully", "success");
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
  },
};
</script>
