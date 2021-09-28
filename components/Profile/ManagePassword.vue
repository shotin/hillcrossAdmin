<template>
  <div class="card">
    <form @submit.prevent="changePassword()">
      <div class="card-header">
        <h3 class="card-title">Manage Password</h3>
      </div>
      <div class="card-body form-horizontal">
        <div class="form-group row">
          <label class="col-md-3 col-form-label"
            >Current Password <span class="text-danger">*</span></label
          >
          <div class="col-md-7">
            <input
              type="password"
              v-model="form.old_password"
              required
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3 col-form-label"
            >New Password <span class="text-danger">*</span></label
          >
          <div class="col-md-7">
            <input
              type="password"
              v-model="form.new_password"
              required
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3 col-form-label"
            >Re Password <span class="text-danger">*</span></label
          >
          <div class="col-md-7">
            <input
              type="password"
              v-model="form.re_new_password"
              required
              class="form-control"
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
          :value="`Change Password`"
        />
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { notify, handleError } from "@/assets/js/utility";
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      form: this.getForm(),
    };
  },
  methods: {
    getForm() {
      return {
        old_password: "",
        new_password: "",
        re_new_password: "",
      };
    },
    changePassword() {
      this.loading = true;
      this.disabled = true;
      this.$axios
        .patch("/users/change-password", this.form)
        .then((res) => {
          notify("Password changed successfully", "success");
          this.form = this.getForm()
          this.loading = false;
          this.disabled = false;
        })
        .catch((err) => {
          this.loading = false;
          this.disabled = false;
          handleError(err);
        });
    },
  },
};
</script>
