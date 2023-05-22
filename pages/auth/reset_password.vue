<style lang="scss">
* {
  padding-right: 0;
  padding-left: 0;
  margin-right: 0;
  margin-left: 0;
}

.bg-red,
.border-red,
.btn-red {
  background-color: #c50d00;
}

.welcome-div {
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  --bg-opacity: 1;
  background-color: rgb(197 13 0 / var(--bg-opacity));
  border-color: rgb(197 13 0 / var(--border-opacity));
  border-bottom-width: 0px !important;
  border-top-width: 2px;
  border-radius: 0.375rem;
  justify-content: center;
  width: 100%;
  display: flex;
}

.welcome-p {
  --text-opacity: 1;
  color: rgb(255 255 255 / var(--text-opacity));
  letter-spacing: 0em;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
  text-align: center;
  color: white;
  cursor: pointer;
}

.main-div {
  padding: 0 !important;
  padding-bottom: 2rem;
  background-color: rgb(217 217 217 / 20%);
  overflow: hidden !important;
}

.login-intro {
  --text-opacity: 1;
  color: rgb(255 255 255 / var(--text-opacity));
  text-align: center;
  margin-top: 2.5rem !important;
  margin-bottom: 2.5rem !important;
}

.main-fields {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.forgot-p {
  --text-opacity: 1;
  color: rgb(32 135 255 / var(--text-opacity));
  color: rgb(25 28 27 / var(--text-opacity));
  text-transform: capitalize;
  font-weight: 400;
  font-size: 0.88rem;
  text-align: right;
  margin-top: 0.75rem;
}

p.welcome-p a:hover {
  opacity: 0.9;
}

p.forgot-p a:hover {
  color: #c50d00 !important;
}

.submit-div {
  justify-content: center;
  display: flex;
  margin-top: 4rem;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
}

.submit-btn {
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-colored: 0 1px 3px 0 var(--shadow-color), 0 1px 2px -1px var(--shadow-color);
  box-shadow: var(--ring-offset-shadow, 0 0 #0000), var(--ring-shadow, 0 0 #0000), var(--shadow);
  --text-opacity: 1;
  color: rgb(255 255 255 / var(--text-opacity));
  --bg-opacity: 1;
  background-color: rgb(197 13 0 / var(--bg-opacity));
  border-radius: 0.375rem;
  width: 159px;
  height: 40px;
  -webkit-appearance: button;
  appearance: button;
  background-color: transparent;
  background-image: none;
  cursor: pointer;
  text-transform: none;
}

@media (min-width: 1024px) {
  .welcome-p {
    font-size: 1.4rem;
  }

  .main-fields {
    width: 66.666667%;
  }
}
</style>


<template>
      <div class="row vh-100 vw-100 position-relative mx-0">
        <div class="col-sm-1 col-md-2 mx-0"></div>
        <div class="col-sm-10 col-md-8 pt-20 mx-0 my-auto main-div px-0">
          <div class="welcome-div">
            <p class="welcome-p">
              <nuxt-link to="/" class="text-white text-decoration-none">
                Welcome to HillCross
              </nuxt-link>
            </p>
          </div>

          <h6 class="login-intro">Reset Password</h6>
        
        <form @submit.prevent="resetPassword()">
          <div class="main-fields">

              <div class="form-group">
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  placeholder="Enter OTP code" v-model="form.otp" required />
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
              <div class="submit-div">
                <Button
                class="submit-btn"
                  :button_class="
                    'rounded-md p-2 h-40 w-159 text-md text-white hover:bg-opacity-80'
                  "
                    style="background-color: rgb(197 13 0); border-color: rgb(197 13 0);" :disabled="disabled" :button_type="'submit'"
                  :loading="loading" :value="'Change Password'" />
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
