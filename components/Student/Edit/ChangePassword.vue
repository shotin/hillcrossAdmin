<template>
  <div class="row">
    <div class="col-md-12">
      <div class="d-flex flex-column h-100">
        <form @submit.prevent="processStaff()">
          <div class="card-body">
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Student ID</label>
                  <input
                    type="text"
                    disabled
                    v-model="user.student_id"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
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
            </div>
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
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
              <div class="col-sm-12">
                <Button
                  :button_class="'btn btn-outline-success'"
                  :disabled="disabled"
                  :button_type="'button'"
                  :loading="loading"
                  :value="'Submit'"
                  @click.native="processChangePassword()"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { notify, handleError } from "@/assets/js/utility";
export default {
  computed: {
    ...mapGetters({
      user: "student/pageData",
    }),
  },
  data() {
    return {
      form: this.getForm(),
      disabled: false,
      loading: false,
    };
  },
  watch: {},
  methods: {
    getForm() {
      return {
        password: "",
        re_password: "",
      };
    },
    processChangePassword() {
      this.$axios
        .patch("/admin/students/change-password", this.form)
        .then((res) => {
          this.form = this.getForm();
          notify("Account updated successfully", "success");
        })
        .catch((err) => {
          handleError(err);
        });
    },
  },
};
</script>
