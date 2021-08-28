<template>
  <div class="row clearfix">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Leave Information</h3>
        </div>
        <form @submit.prevent="processLeave()">
          <div class="card-body">
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Reviewer</label>
                  <multiselect
                    v-model="form.selectedReviewer"
                    :options="reviewers"
                    :group-select="true"
                    track-by="id"
                    label="name"
                    required
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Select Reviewer"
                  >
                  </multiselect>
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Leave Reason</label>
                  <multiselect
                    v-model="form.selectedReason"
                    :options="leaveReasons"
                    :group-select="true"
                    track-by="id"
                    label="name"
                    required
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Select Leave Reason"
                  >
                  </multiselect>
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Start date</label>
                  <input
                    type="date"
                    class="form-control"
                    placeholder="Start date"
                    required
                    v-model="form.start_date"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>End date</label>
                  <input
                    type="date"
                    class="form-control"
                    placeholder="End date"
                    required
                    v-model="form.end_date"
                  />
                </div>
              </div>
              <div class="col-md-12 col-sm-12">
                <div class="form-group">
                  <label>Description</label>
                  <textarea
                    name=""
                    required
                    v-model="form.description"
                    class="form-control"
                  ></textarea>
                </div>
              </div>
              <div class="col-sm-12">
                <Button
                  :button_class="'btn btn-primary'"
                  :disabled="disabled"
                  :button_type="'submit'"
                  :loading="loading"
                  :value="buttonName"
                />
                <Button
                  :button_class="'btn btn-outline-secondary'"
                  :disabled="disabled"
                  :button_type="'button'"
                  :loading="loading"
                  :value="'Cancel'"
                  @click.native="cancelForm()"
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
import { mapGetters, mapState } from "vuex";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { notify, handleError } from "@/assets/js/utility";

export default {
  props: {
    reviewers: {
      type: Array,
      required: true,
    },
    leaveReasons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      loadingCancel: false,
      disabledCancel: false,
      records: this.getRecords(),
      buttonName: "Submit",
      isUpdate: false,
    };
  },
  components: {
    Multiselect,
  },
  computed: {
    ...mapGetters({
      leave_data: "app/pageViewData",
    }),
  },
  watch: {
    leave_data(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.form.selectedReviewer = newVal.reviewer
        this.form.selectedReason = newVal.reason
        this.form.start_date = newVal.start_date
        this.form.end_date = newVal.end_date
        this.form.description = newVal.description
      }
    },
  },
  mounted() {
    let self = this;
    self.$root.$on("edit-leave", function(val) {
      self.buttonName = "Update";
      self.isUpdate = true;
    });
  },
  methods: {
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    getForm() {
      return {
        selectedReviewer: "",
        selectedReason: "",
        start_date: "",
        end_date: "",
        description: "",
        reviewer_id: "",
        leave_reason_id: ""
      };
    },
    processLeave() {
      this.loading = true;
      this.disabled = true;
      this.form.reviewer_id = this.form.selectedReviewer.id
      this.form.leave_reason_id = this.form.selectedReason.id
      if (this.isUpdate) {
        this.updateRequest(this.form);
      } else {
        this.storeRequest(this.form);
      }
    },
    async storeRequest(form) {
      await this.$axios
        .post("/leaves", form)
        .then((res) => {
          notify("Leave created successfully", "success");
          this.stopLoader();
          this.form = this.getForm();
          this.$root.$emit("leave_paginate", this.records);
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    async updateRequest(form) {
      await this.$axios
        .patch(`/leaves/${this.leave_data.id}`, form)
        .then((res) => {
          notify("Leave updated successfully", "success");
          this.stopLoader();
          this.$store.commit("app/UPDATE_DATA", res.data.data);
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    cancelForm() {
      if (!this.loading && !this.disabled) {
        this.form = this.getForm();
      }
    },
    getRecords() {
      return {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
      };
    },
  },
};
</script>
