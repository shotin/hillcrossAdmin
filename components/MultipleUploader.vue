<template>
  <b-modal
    id="custom-multiple-uploader"
    hide-footer
    size="lg"
    no-close-on-esc
    no-close-on-backdrop
    body-class="px-4"
  >
    <div class="px-3">
      <div class="d-flex justify-content-center mt-2 mb-4 navbar-light">
        <a href="#" class="navbar-brand" style="min-width: 0">
          <span class="ml-2">Upload {{ file_type }}</span>
        </a>
      </div>
      <form>
        <div class="form-group">
          <input
            multiple
            class="form-control"
            :accept="fileFormat"
            @change="onFileChange($event)"
            type="file"
          />
        </div>
        <b-row class="w-100 mx-0">
          <b-col md="6" class="my-auto text-center text-lg-right">
            <b-progress
              :value="upload_percentage"
              variant="success"
              class="mt-2"
              :striped="striped"
              v-if="show_progress"
            ></b-progress>
          </b-col>
        </b-row>
        <ul v-if="files.length" class="file-items">
          <li v-for="(file, index) in files" :key="index">
            <div class="img-details">
              <b-row class="w-100 mx-0">
                <b-col md="6" class="mb-3 mb-md-0">
                  <span class="photo-desc">{{ file_type }} details:</span><br />
                  <div class="to-hidden">
                    Name: <strong>{{ file.file_name }}</strong>
                  </div>
                  <!-- <div>File size: <strong>{{file.size | formatSize}}</strong></div> -->
                  <div v-if="file.status === 'error'">
                    Error status:
                    <strong class="text-danger">{{
                      file.error_message
                    }}</strong>
                  </div>
                  <div v-else>
                    Upload Status:
                    <strong
                      v-if="file.status === 'success'"
                      class="text-success"
                      >Success</strong
                    >
                    <strong v-else-if="file.active" class="text-warning"
                      >Active</strong
                    >
                    <strong v-else class="text-warning">Inactive</strong>
                  </div>
                </b-col>
                <b-col md="6" class="my-auto text-center text-lg-right">
                  <b-progress
                    :value="upload_percentage"
                    variant="success"
                    class="mt-2"
                    :striped="striped"
                    v-if="show_progress"
                  ></b-progress>
                  <span
                    v-if="
                      !hidePlay &&
                        file.status === 'success' &&
                        file_type === 'video'
                    "
                    class="photo-action view"
                    @click.prevent="open(file)"
                    >Play Video</span
                  >
                  <span
                    v-if="
                      !hidePlay &&
                        file.status === 'success' &&
                        file_type === 'audio'
                    "
                    class="photo-action view"
                    @click.prevent="open(file)"
                    >Play Audio</span
                  >
                  <span
                    v-if="
                      !hidePlay &&
                        file.status === 'success' &&
                        file_type === 'file'
                    "
                    class="photo-action view"
                    @click.prevent="open(file)"
                    >View File</span
                  >
                  <span
                    class="photo-action delete"
                    v-if="file.file_url"
                    @click.prevent="removeFile(file)"
                    >Delete</span
                  >
                </b-col>
              </b-row>
            </div>
          </li>
        </ul>
        <div class="form-group text-right">
          <Button
            :button_class="'btn btn-primary'"
            :disabled="disabled"
            :button_type="'button'"
            :loading="loading"
            :value="'Store'"
            @click.native="done()"
          />
          <button type="button" @click="closeModel()" class="btn btn-danger">
            Close
          </button>
        </div>
      </form>
    </div>
  </b-modal>
</template>
<script>
import { notify, handleError } from "@/assets/js/utility";
import axios from "axios";
import { mapGetters, mapState } from "vuex";
export default {
  props: {
    file_type: {
      required: true,
      type: String,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      files: "upload/files",
    }),
    fileFormat: function() {
      let format = "";
      switch (this.file_type) {
        case "file":
          format = ".pdf";
          break;
        case "audio":
          format = ".mp3,.mpeg";
          break;
        case "video":
          format = ".flv,.mp4,.mov,.avi,.wmv";
          break;
        case "image":
          format = ".png,.jpg,.jpeg,.gif";
          break;
        default:
          format = "";
          break;
      }
      return format;
    },
  },
  data() {
    return {
      loading: false,
      disabled: false,
      striped: true,
      show_progress: false,
      upload_percentage: 0,
      file: {},
      s3PresignedUrl: "",
      hidePlay: false,
    };
  },
  methods: {
    closeModel() {
      this.$store.commit("upload/SET_FILE_TYPE", "");
      this.$bvModal.hide("custom-multiple-uploader");
    },
    onFileChange(event) {
      let self = this;
      Array.from(event.target.files).forEach(function(file) {
        self.handleUpload(file);
      });
    },
    done() {
      this.loading = true;
      this.disabled = true;
      let request_payload = {
        documents: this.files,
      };
      this.$axios
        .post(`/administrators/${this.user.id}/documents`, request_payload)
        .then((res) => {
          this.loading = false;
          this.disabled = false;
          this.$root.$emit("upload_done", true);
          this.$bvModal.hide("custom-multiple-uploader");
        })
        .catch((err) => {
          this.loading = false;
          this.disabled = false;
          handleError(err);
        });
    },
    handleUpload(file) {
      let formData = new FormData();
      formData.append("file_type", this.file_type);
      formData.append("file_name", file.name);
      formData.append("folder", "documents");
      formData.append("file_extension", file.type);
      formData.append("file_size", file.size);
      this.$axios
        .post("/uploads/presigned-url", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.show_progress = true;
          this.uploadFile(res.data, file);
        })
        .catch((error) => {
          handleError(error);
        });
      return this.s3PresignedUrl;
    },
    uploadFile(presigned_url, file) {
      console.log(file);
      axios
        .put(presigned_url, file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function(progressEvent) {
            this.upload_percentage = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }.bind(this),
        })
        .then((res) => {
          this.$store.commit("upload/ADD_FILE", {
            file_name: file.name,
            file_type: file.type,
            file_size: file.size,
            file_url: `https:${presigned_url.split("?")[0].substr(6)}`,
            status: "success",
          });
          this.show_progress = false;
          this.upload_percentage = 0;
        })
        .catch((error) => {
          handleError(error);
          file.status = "error";
          file.error_message = error;
        });
    },
    open(file) {
      if (this.file_type === "video" || this.file_type === "audio") {
        const view = this.$refs.videoView;
        // View an image
        this.viewer = BigPicture({
          el: view,
          // eslint-disable-next-line no-undef
          vidSrc: file.asset_link,
        });
      } else if (this.file_type === "file") {
        window.open(file.asset_link, "_blank");
      }
    },
    removeFile(file) {
      this.upload_percentage = 0;
      this.$store.commit("upload/REMOVE_FILE", file);
    },
  },
};
</script>
<style>
.progress {
  position: inherit !important;
}
.to-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.drag-drop-box {
  padding: 20px;
  min-height: 325px;
  background: linear-gradient(180deg, #f7f7f7 0%, #e5e5e5 100%);
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 12px;
  display: flex;
}
.drag-drop-box > td {
  display: inline-block;
  margin: 0 auto;
}
.choose-file-label {
  font-family: "Gotham Book", Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #7b7b7b;
  max-width: 180px;
}
.preview-image {
  position: relative;
  max-width: 100%;
  display: none;
}
.progress {
  height: 3px;
  position: absolute;
  width: calc(100% - 54px);
  bottom: -16px;
  right: 15px;
}
.success-badge {
  display: inline-block;
  position: absolute;
  border-radius: 9px;
  width: 17px;
  height: 17px;
  left: 7px;
  top: 7px;
  background-color: rgba(76, 175, 80, 0.67);
  background-image: url(/icon/upload/check.svg);
  background-position: 50%;
  background-repeat: no-repeat;
}
.file-items {
  padding: 0;
  list-style: none;
  margin-bottom: 25px;
}
.file-items > li {
  display: flex;
  min-height: 94px;
  background: #fff;
  border: 1px solid #ece9e9;
  box-sizing: border-box;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  margin-bottom: 15px;
}
.file-items > li > div.img-preview {
  position: relative;
  display: flex;
  width: 153px;
  height: 94px;
  border-radius: 12px;
  background-color: #f2f2f2;
  background-size: cover;
  background-position: 50%;
}
.file-items > li > div.img-details {
  display: flex;
  flex-grow: 1;
  padding: 18px 10px 18px 10px;
  max-width: 100%;
}
.photo-desc {
  font-family: "Gotham Book", Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #868686;
}
.photo-action {
  display: inline-block;
  font-family: "Gotham Book", Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  padding: 8px 13px 8px 36px;
  border-radius: 6px;
  background-position: top 7.6px left 12px;
  background-repeat: no-repeat;
  margin-right: 12px;
  cursor: pointer;
}
.photo-action:last-child {
  margin-right: 0;
}
.photo-action.view {
  color: #44c1c9;
  background-color: rgba(68, 193, 201, 0.08);
  background-image: url(/icon/upload/image.svg);
}
.photo-action.delete {
  color: #f00;
  background-color: rgba(255, 0, 0, 0.08);
  background-image: url(/icon/upload/delete.svg);
}
@media (max-width: 575.95px) {
  .file-items > li {
    display: block !important;
  }
  .img-preview,
  .img-details {
    display: block !important;
    width: 100% !important;
  }
  .img-preview {
    min-height: 220px !important;
    border-radius: 12px 12px 0 0 !important;
  }
  .photo-action {
    width: calc(50% - 8px) !important;
  }
}
</style>
