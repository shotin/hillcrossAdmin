<template>
  <div class="row">
    <div class="col-xl-4 col-md-12">
      <div class="card">
        <div class="card-body w_user">
          <div class="user_avtar" v-if="teacher_data.profile.avatar">
            <img
              class="rounded-circle"
              :src="teacher_data.profile.avatar"
              alt=""
            />
          </div>
          <div
            v-else
            class="avatar avatar-pink"
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title="Avatar Name"
          >
            <span>{{ teacher_data.avatar_alternative }}</span>
          </div>
          <div class="wid-u-info">
            <h5>{{ teacher_data.name }}</h5>
            <p class="text-muted m-b-0">
              {{ teacher_data.profile.address }}
            </p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">About Me</h3>
        </div>
        <div class="card-body">
          <p v-if="teacher_data.qualifications">
            {{ teacher_data.qualifications }}
          </p>
          <ul class="list-group">
            <li class="list-group-item">
              <b>Gender </b>
              <div>{{ teacher_data.profile.gender }}</div>
            </li>
            <li class="list-group-item">
              <b>Position </b>
              <div>{{ teacher_data.profile.position }}</div>
            </li>
            <li class="list-group-item">
              <b>Mode </b>
              <div>{{ teacher_data.mode }}</div>
            </li>
            <li class="list-group-item">
              <b>Designation</b>
              <div>{{ teacher_data.role }}</div>
            </li>
          </ul>
        </div>
        <div
          class="card-footer text-center"
          v-if="teacher_data.role === 'Teacher'"
        >
          <div class="row">
            <div class="col-md-4 col-sm-4 col-6">
              <div class="font-18 font-weight-bold">37</div>
              <div>Currently Allocated Modules</div>
            </div>
            <div class="col-md-4 col-sm-4 col-6">
              <div class="font-18 font-weight-bold">51</div>
              <div>Total Lessons</div>
            </div>
            <div class="col-md-4 col-sm-4 col-6">
              <div class="font-18 font-weight-bold">61</div>
              <div>Total Assignment & Assessments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-8 col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Staff Documents</h3>
          <div class="card-options ">
            <button
              type="button"
              @click="triggerUploader()"
              class="btn btn-primary text-right"
            >
              <i class="fa fa-upload mr-2"></i>Add New
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="file_folder" v-if="documents.length">
            <div class="row" v-for="document in documents" :key="document.id">
              <div class="col-md-12">
                <a :href="document.file_url" target="_blank" class="ml-2">
                  <div class="icon">
                    <i class="fa fa-file-pdf-o text-danger"></i>
                  </div>
                  <div class="file-name">
                    <p class="mb-0 text-muted">{{ document.name }}</p>
                    <small
                      >Size: {{ parseInt(document.file_size) / 1024 }}KB</small
                    >
                  </div>
                </a>
              </div>
            </div>
          </div>
          <p v-else>No document uploaded</p>
        </div>
      </div>
    </div>

    <multiple-uploader
      :file_type="'file'"
      :isMultiple="true"
      :user="teacher_data"
      style="display: none;"
    />
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import MultipleUploader from "@/components/MultipleUploader";
import { notify, handleError } from "@/assets/js/utility";
export default {
  components: {
    Multiselect,
    MultipleUploader,
  },
  data() {
    return {
      form: this.getForm(),
      documents: [],
    };
  },
  mounted() {
    let self = this;
    self.$root.$on("upload_done", function(val) {
      self.getDocuments();
    });
    self.getDocuments();
  },
  computed: {
    ...mapGetters({
      teacher_data: "app/pageShowData",
    }),
  },
  methods: {
    getForm() {
      return {
        file_type: "pdf",
      };
    },
    triggerUploader() {
      this.$bvModal.show("custom-multiple-uploader");
    },
    getDocuments() {
      this.$axios
        .get(`/administrators/${this.teacher_data.id}/documents`)
        .then((res) => {
          this.documents = res.data.data;
        })
        .catch((err) => {});
    },
  },
};
</script>
