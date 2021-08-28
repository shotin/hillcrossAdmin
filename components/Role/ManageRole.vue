<template>
  <div class="row clearfix">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Role Information</h3>
        </div>
        <form @submit.prevent="processRole()">
          <div class="card-body">
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Role Name</label>
                  <input
                    type="text"
                    required
                    v-model="form.name"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Permissions</label>
                  <multiselect
                    v-model="form.selectPermissions"
                    :options="permissions"
                    group-values="permissions"
                    group-label="group"
                    :group-select="true"
                    track-by="id"
                    label="name"
                    required
                    :multiple="true"
                    :searchable="true"
                    :close-on-select="false"
                    :show-labels="false"
                    placeholder="Select Permissions"
                  >
                  </multiselect>
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
    permissions: {
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
      role_data: "app/pageViewData",
    }),
  },
  watch: {
    role_data(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.form.name = newVal.name;
        this.form.selectPermissions = newVal.permissions_collect;
      }
    },
  },
  mounted() {
    let self = this;
    self.$root.$on("edit-role", function(val) {
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
        name: "",
        permissions: [],
        selectPermissions: [],
      };
    },
    processRole() {
      this.loading = true;
      this.disabled = true;
      this.form.permissions = this.form.selectPermissions.map((o) => o.name);
      if (this.isUpdate) {
        this.updateRequest(this.form);
      } else {
        this.storeRequest(this.form);
      }
    },
    async storeRequest(form) {
      await this.$axios
        .post("/roles", form)
        .then((res) => {
          notify("New role created successfully", "success");
          this.stopLoader();
          this.form = this.getForm();
          this.$root.$emit("role_paginate", this.records);
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    async updateRequest(form) {
      await this.$axios
        .patch(`/roles/${this.role_data.id}`, form)
        .then((res) => {
          notify("Role updated successfully", "success");
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
