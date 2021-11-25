<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a
                class="nav-link active"
                data-toggle="tab"
                href="#personal-details"
                @click.prevent="switchTab('personal_details')"
                :class="[personal_details ? 'active' : '']"
                >Personal Details</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-toggle="tab"
                href="#contact-details"
                @click.prevent="switchTab('contact_details')"
                :class="[contact_details ? 'active' : '']"
                >Contact Details</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-toggle="tab"
                href="#sponsor-information"
                @click.prevent="switchTab('sponsor_information')"
                :class="[sponsor_information ? 'active' : '']"
                >Sponsor Information</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-toggle="tab"
                href="#education-history"
                @click.prevent="switchTab('education_history')"
                :class="[education_history ? 'active' : '']"
                >Education History</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-toggle="tab"
                href="#qualification-information"
                @click.prevent="switchTab('qualification_information')"
                :class="[qualification_information ? 'active' : '']"
                >Qualification Information</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-toggle="tab"
                href="#document-upload"
                @click.prevent="switchTab('document_upload')"
                :class="[document_upload ? 'active' : '']"
                >Document Upload</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-toggle="tab"
                href="#change-password"
                @click.prevent="switchTab('change_password')"
                :class="[change_password ? 'active' : '']"
                >Change Password</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section-body mt-4">
      <div class="container-fluid">
        <div class="tab-content">
          <div
            class="tab-pane"
            :class="[personal_details ? 'active' : '']"
            id="personal-details"
          >
            <personal-details v-if="user && personal_details" />
          </div>
          <div
            class="tab-pane active"
            :class="[contact_details ? 'active' : '']"
            id="contact-details"
          >
            <contact-details v-if="user && contact_details"/>
          </div>
          <div
            class="tab-pane active"
            :class="[sponsor_information ? 'active' : '']"
            id="sponsor-information"
          >
            <sponsor-information v-if="user && sponsor_information"/>
          </div>
          <div
            class="tab-pane active"
            :class="[education_history ? 'active' : '']"
            id="education-history"
          >
            <education-history v-if="user && education_history"/>
          </div>
          <div
            class="tab-pane active"
            :class="[qualification_information ? 'active' : '']"
            id="qualification-information"
          ></div>
          <div
            class="tab-pane active"
            :class="[document_upload ? 'active' : '']"
            id="document-upload"
          ></div>
          <div
            class="tab-pane active"
            :class="[change_password ? 'active' : '']"
            id="change-password"
          >
            <change-password v-if="user && change_password" />
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import ChangePassword from "../../components/Student/Edit/ChangePassword.vue";
import ContactDetails from '../../components/Student/Edit/ContactDetails.vue';
import EducationHistory from '../../components/Student/Edit/EducationHistory.vue';
import PersonalDetails from "../../components/Student/Edit/PersonalDetails.vue";
import SponsorInformation from '../../components/Student/Edit/SponsorInformation.vue';
export default {
  components: { ChangePassword, PersonalDetails, ContactDetails, SponsorInformation, EducationHistory },
  computed: {
    ...mapGetters({
      select: "select/select",
      user: "student/pageData",
    }),
  },
  mounted() {
    this.getStudent();
    this.switchTab("personal_details");
  },
  data() {
    return {
      personal_details: true,
      contact_details: false,
      sponsor_information: false,
      education_history: false,
      qualification_information: false,
      document_upload: false,
      change_password: false,
    };
  },
  methods: {
    getStudent() {
      this.$axios
        .get(`/students/${this.$route.params.id}/show`)
        .then((res) => {
          this.$store.commit("student/SET_DATA", res.data.data);
        })
        .catch((err) => {
          handleError(err);
        });
    },
    switchTab(key) {
      switch (key) {
        case "contact_details":
          this.contact_details = true;
          this.personal_details = false;
          this.sponsor_information = false;
          this.education_history = false;
          this.qualification_information = false;
          this.document_upload = false;
          this.change_password = false;
          break;
        case "sponsor_information":
          this.contact_details = false;
          this.personal_details = false;
          this.sponsor_information = true;
          this.education_history = false;
          this.qualification_information = false;
          this.document_upload = false;
          this.change_password = false;
          break;
        case "education_history":
          this.contact_details = false;
          this.personal_details = false;
          this.sponsor_information = false;
          this.education_history = true;
          this.qualification_information = false;
          this.document_upload = false;
          this.change_password = false;
          break;
        case "qualification_information":
          this.contact_details = false;
          this.personal_details = false;
          this.sponsor_information = false;
          this.education_history = false;
          this.qualification_information = true;
          this.document_upload = false;
          this.change_password = false;
          break;
        case "document_upload":
          this.contact_details = false;
          this.personal_details = false;
          this.sponsor_information = false;
          this.education_history = false;
          this.qualification_information = false;
          this.document_upload = true;
          this.change_password = false;
          break;
        case "change_password":
          this.contact_details = false;
          this.personal_details = false;
          this.sponsor_information = false;
          this.education_history = false;
          this.qualification_information = false;
          this.document_upload = false;
          this.change_password = true;
          break;
        default:
          this.personal_details = true;
          this.contact_details = false;
          this.sponsor_information = false;
          this.education_history = false;
          this.qualification_information = false;
          this.document_upload = false;
          this.change_password = false;
          break;
      }
    },
  },
};
</script>
