<template>
  <div class="auth option2">
    <div class="auth_left">
      <form @submit.prevent="resetPassword()">
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
              <div class="card-title mt-3">Reset Password</div>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter OTP code"
                v-model="form.otp"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter New Password"
                v-model="form.password"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Password Confirmation"
                v-model="form.re_password"
                required
              />
            </div>
            <div class="text-center">
              <Button
                :button_class="'btn btn-block btn-primary'"
                :disabled="disabled"
                :button_type="'submit'"
                :loading="loading"
                :value="'Change Password'"
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

  components : {
    Button
  },

  data () {
    return {
      form : this.getForm(),
      loading : false,
      disabled : false
    }
  },

  methods : {
    async resetPassword() {
      this.loading = true;
      this.disabled = true;

      await this.$axios
        .post("/reset-password", this.form)
        .then((res) => {
          this.stopLoader();
          this.form = this.getForm()
          notify('Password changed successfully, pleaae login', 'success')
          this.$router.push('/auth/login')
        })
        .catch((err) => {
          this.stopLoader();
          handleError(err);
        });
    },
    stopLoader () {
      this.loading = false
      this.disabled = false
    },
    getForm () {
        return {
            otp : '',
            password : '',
            re_password : ''
        }
    }
  }
};
</script>
