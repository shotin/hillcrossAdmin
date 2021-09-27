<template>
  <div class="auth option2">
    <div class="auth_left">
      <div class="card">
        <form @submit.prevent="login()">
          <div class="card-body">
            <div class="text-center">
              <nuxt-link class="header-brand" to="/">
                <img
                  src="https://hillcrosscollege.s3.eu-west-2.amazonaws.com/site-assets/hillcross_logo.jpeg"
                  alt="Hillcross College CMS"
                  style="width: 200px;"
                />
              </nuxt-link>
              <div class="card-title mt-3">Login to your account</div>
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
            <div class="form-group">
              <label class="form-label"
                ><nuxt-link to="/auth/forgot-password" class="float-right small"
                  >I forgot password</nuxt-link
                ></label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model="form.password"
                required
              />
            </div>
            <div class="form-group">
              <label class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" />
                <span class="custom-control-label">Remember me</span>
              </label>
            </div>
            <div class="text-center">
              <Button
                :button_class="'btn btn-block btn-primary'"
                :disabled="disabled"
                :button_type="'submit'"
                :loading="loading"
                :value="'Sign in'"
              />
            </div>
          </div>
        </form>
      </div>
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
      form: this.getForm(),
      disabled: false,
      loading: false,
    };
  },

  methods: {
    getForm() {
      return {
        username: "",
        password: "",
        remember_me: true,
      };
    },
    async login() {
      let data;
      this.loading = true;
      this.disabled = true;
      await this.$axios
        .post("/login", this.form)
        .then((res) => {
          data = res.data;
          this.stopLoader();
          this.form = this.getForm();
        })
        .catch((err) => {
          this.stopLoader();
          handleError(err);
        });
      if (!data) return;
      // Save the token.
      await this.$store.dispatch("auth/saveToken", {
        token: data.access_token,
        remember: Date.parse(data.expires_at),
      });
      // Redirect home.
      this.$router.push("/auth/callback");
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
  },
};
</script>
