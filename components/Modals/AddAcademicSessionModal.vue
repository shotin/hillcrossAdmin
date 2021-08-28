<template>
  <b-modal
    id="add-academic-session"
    hide-footer
    size="md"
    no-close-on-esc
    no-close-on-backdrop
    body-class="px-4"
    title="Add New Session"
  >
    <div class="px-3">
      <form>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="form.name" class="form-control" placeholder="Enter Name">
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>Start Date</label>
            <input type="date" v-model="form.start_date" class="form-control" placeholder="Start Date">
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>End Date</label>
            <input type="date" v-model="form.end_date" class="form-control" placeholder="End Date">
          </div>
        </div>        
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
export default {
  data() {
    return {
      disabled: false,
      loading: false,
      form: this.getForm(),
    };
  },
  methods: {
    closeModel() {
      this.$bvModal.hide("add-academic-session");
    },
    getForm() {
      return {
        name: "",
        start_date: "",
        end_date: ""
      };
    },
    done() {
      this.loading = true;
      this.disabled = true;
      this.$axios
        .post(`/academic-sessions`, this.form)
        .then((res) => {
          notify("Academic session successfully created", "success");
          this.$root.$emit("academic_session_paginate", true);
          this.stopLoader();
          this.$bvModal.hide("add-academic-session");
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
  },
};
</script>
