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
  padding: auto 0 !important;
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
      <div class="col-sm-10 col-md-8 mx-0 my-auto main-div px-0">
        <div class="welcome-div">
          <p class="welcome-p">
                    <nuxt-link to="/" class="text-white text-decoration-none">
                    Welcome to HillCross
                    </nuxt-link>
          </p>
        </div>
      <h6 class="login-intro">Log into your account</h6>

        <form  class="my-10 mt-16"  @submit.prevent="login()">
          <div class="main-fields">
            <div class="form-group">
              <label class="text-label" for="email_2">ID/Email:</label>
              <div class="input-group">
                <input
                  id="exampleInputEmail1"
                  type="text"
                  required
                  v-model="form.username"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email/ID"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label class="text-label" for="password_2">Password:</label>
              <div class="input-group input-group-merge">
                <input
                  id="exampleInputPassword1"
                  type="password"
                  :type="passwordVisible ? 'text' : 'password'"
                  required
                  v-model="form.password"
                  class="form-control form-control-appended"
                  placeholder="Enter your password"
                />
                <div class="input-group-append">
                  <span
                    class="input-group-text"
                    @click="togglePasswordVisibility"
                  >
                    <i
                      :class="passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
            
            <p class="forgot-p">
              <router-link to="/auth/forgot-password" class="text-decoration-none" style="color: rgb(25 28 27); ">
                forget password?
              </router-link>
            </p>

          </div>
          
          <div class="submit-div">
            <Button
            class="submit-btn"
              :button_class="'rounded-md h-40 w-159 text-md text-white hover:bg-opacity-80'"
              :disabled="disabled"
              :button_type="'submit'"
              :loading="loading"
              :value="'Sign in'"
              style="background-color: rgb(197 13 0); border-color: rgb(197 13 0);"
            />
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
      form: this.getForm(),
      disabled: false,
      loading: false,
      passwordVisible: false
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
    togglePasswordVisibility () {
      this.passwordVisible = !this.passwordVisible;
    }
  },
};
</script>
