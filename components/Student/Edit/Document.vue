<template>
  <div class="container-fluid py-4">
    <div class="row mt-4">
      <div class="col-lg-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <form role="form" @submit.prevent="processPersonalInformation()">
              <div class="row mb-4">
                <div class="col-md-4">
                  <label class="custom-text" for=""
                    >ID copy or Passport copy or Birth certificate
                  </label>
                </div>
                <div class="col-md-6">
                  <document-uploader
                    :document_type="`student_id`"
                  />
                </div>
              </div>
              <!-- <div class="row mb-4">
                <div class="col-md-4">
                  <label class="custom-text" for=""
                    >Certified ID/Passport Of One Parent
                  </label>
                </div>
                <div class="col-md-6">
                  <document-uploader
                    :document_type="`parent_id`"
                  />
                </div>
              </div> -->
              <div class="row mb-4">
                <div class="col-md-4">
                  <label class="custom-text" for=""
                    >Copy of Matric or ABET L4 or Senior School Certificate or N3 certificate or Current Grade 12 result with school stamp.
                  </label>
                </div>
                <div class="col-md-6">
                  <document-uploader
                    :document_type="`student_result`"
                  />
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-md-4">
                  <label class="custom-text" for=""
                    >Copy Of Proof Of Address
                  </label>
                </div>
                <div class="col-md-6">
                  <document-uploader
                    :document_type="`student_address`"
                  />
                </div>
              </div>
              <!-- <div class="row mb-4">
                <div class="col-md-4">
                  <label class="custom-text" for=""
                    >Bursary/Trust Fund award letter
                  </label>
                </div>
                <div class="col-md-6">
                  <document-uploader
                    :document_type="`bursary_letter`"
                  />
                </div>
              </div> -->
              <!-- <div class="row mb-4">
                <div class="col-md-4">
                  <label class="custom-text" for=""
                    >Evidence/Result Of Higher Education Qualification (For
                    Students Who Have Studied Beyond Matric)
                  </label>
                </div>
                <div class="col-md-6">
                  <document-uploader
                    :document_type="`student_qualification`"
                  />
                </div>
              </div> -->
              <p><br /></p>
              <div
                class="text-left side-by-side-button w-200"
              >
                <button type="button" @click="goBack()" class="btn btn-primary"
                  >Back</button
                >
                <Button
                  :button_class="'btn btn-outline-success'"
                  :disabled="disabled"
                  :button_type="'submit'"
                  :loading="loading"
                  :value="'Submit'"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { notify, handleError } from "@/assets/js/utility";
import Swal from "sweetalert2";
import DocumentUploader from '../../DocumentUploader.vue';
export default {
  mounted() {
  },
  components: {
    DocumentUploader
  },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      selectedFaculty: null,
      selectedQualification: null,
      selectedCalender: null,
      qualifications: [],
      selectedCalender: null,
      calenders: [],
      has_bursary: false
    };
  },
  computed: {
    ...mapGetters({
      user: "student/pageData",
      document: "studentDocument/files"
    })
  },
  watch: {
    document: {
      handler(newVal, oldVal) {
        return (this.has_bursary = _.filter(newVal, [
          "type",
          "bursary_letter"
        ]).length);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async processPersonalInformation() {
      this.loading = true;
      this.disabled = true;
      let uploadedDocs = {};
      if (this.document.length) {
        uploadedDocs.documents = this.document;
      }
      if (!this.has_bursary) {
        let self = this;
        Swal.fire({
          title: `You are about to submit your application for admission but please note that some documents 
                have not been uploaded and this may mean that you will not to be considered for the SCHOLARSHIP/BURSARY.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#44c1c9",
          showLoaderOnConfirm: true,
          cancelButtonText: "Return to uploads",
          confirmButtonText: "Submit Application",
          preConfirm: () => {
            return this.$axios
              .post(`/admin/students/${this.user.id}/document-uploads`, uploadedDocs)
              .then(res => {
                this.loading = false;
                this.disabled = false;
                this.$store.commit("studentDocument/SET_FILES", []);
                notify("Upload submitted successfully", "success");
                this.$store.commit("student/UPDATE_USER_INFO", res.data.data);
                this.$root.$emit('update_tab', 'personal_details')
              })
              .catch(error => {
                Swal.showValidationMessage(`Request failed: ${error.response}`);
              });
          },
          allowOutsideClick: false
        }).then(res => {
          if (res.dismiss === Swal.DismissReason.cancel) {
            this.loading = false;
            this.disabled = false;
          }
        });
      } else {
        await this.$axios
          .post(`/admin/students/${this.user.id}/document-uploads`, uploadedDocs)
          .then(res => {
            this.stopLoader();
            this.$store.commit("document/SET_FILES", []);
            notify("Upload submitted successfully", "success");
            this.$store.commit("student/UPDATE_USER_INFO", res.data.data);
            this.$root.$emit('update_tab', 'personal_details')
          })
          .catch(err => {
            console.log(err);
            this.stopLoader();
            handleError(err);
          });
      }
    },
    goBack() {
      this.$root.$emit('update_tab', 'qualification_information')
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    getForm() {
      return {
        school_id: "",
        qualification_id: "",
        study_mode: "",
        academic_session_id: ""
      };
    }
  }
};
</script>
