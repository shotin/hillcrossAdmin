<template>
  <div class="auth option2">
    <div class="auth_left">
      <form @submit.prevent="forgotPassword()">
        <div class="card" style="width : 400px;">
          <div class="card-body">
            <div class="text-center">
              <nuxt-link class="header-brand" to="/">
                <img
                  src="https://hillcrosscollege.s3.eu-west-2.amazonaws.com/site-assets/hillcross_logo.jpeg"
                  alt="Hillcross College CMS"
                  style="width: 200px;"
                />
              </nuxt-link>
              <div class="card-title mt-3">Forgot Password</div>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email/ID"
                v-model="form.username"
                required
              />
            </div>
            <div class="text-center">
              <Button
                :button_class="'btn btn-block btn-primary'"
                :disabled="disabled"
                :button_type="'submit'"
                :loading="loading"
                :value="'Submit'"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
import { notify, handleError } from "@/assets/js/utility";
export default {
  layout: "auth",
  middleware: "guest",

  components: {
    Button,
  },

  data() {
    return {
      form: { username: "" },
      loading: false,
      disabled: false,
    };
  },

  methods: {
    async forgotPassword() {
      this.loading = true;
      this.disabled = true;

      await this.$axios
        .post("/forgot-password", this.form)
        .then((res) => {
          this.stopLoader();
          this.form.username = "";
          notify(res.data.message, "success");
          this.$router.push("/auth/change-password");
        })
        .catch((err) => {
          this.stopLoader();
          handleError(err);
        });
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
  },
};
</script>
