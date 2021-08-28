<template>
  <b-modal
    id="add-academic-calendar"
    hide-footer
    size="md"
    no-close-on-esc
    no-close-on-backdrop
    body-class="px-4"
    title="Add New Calendar"
  >
    <div class="px-3">
      <form>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              v-model="form.name"
              class="form-control"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>Academic Session</label>
            <select name="" class="form-control" v-model="form.session_id">
                <option value="">Select Academic Session</option>
                <option :value="session.id" v-for="session in academic_sessions" :key="session.id">
                    {{session.name}}
                </option>
            </select>
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>Academic Semester</label>
            <select name="" class="form-control" v-model="form.semester_id">
                <option value="">Select Academic Semester</option>
                <option :value="semester.id" v-for="semester in academic_semesters" :key="semester.id">
                    {{semester.name}}
                </option>
            </select>
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>Start Date</label>
            <input
              type="date"
              v-model="form.start_date"
              class="form-control"
              placeholder="Start Date"
            />
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>End Date</label>
            <input
              type="date"
              v-model="form.end_date"
              class="form-control"
              placeholder="End Date"
            />
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>Course Registration Start Date</label>
            <input
              type="date"
              v-model="form.course_registration_start_date"
              class="form-control"
              placeholder="Start Date"
            />
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>Course Registration End Date</label>
            <input
              type="date"
              v-model="form.course_registration_end_date"
              class="form-control"
              placeholder="Start Date"
            />
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
  props: {
    academic_sessions: {
      required: true,
      type: Array,
    },
    academic_semesters: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      disabled: false,
      loading: false,
      form: this.getForm(),
    };
  },
  methods: {
    closeModel() {
      this.$bvModal.hide("add-academic-calendar");
    },
    getForm() {
      return {
        name: "",
        start_date: "",
        end_date: "",
        course_registration_start_date: "",
        course_registration_end_date: "",
        semester_id: "",
        session_id: ""
      };
    },
    done() {
      this.loading = true;
      this.disabled = true;
      this.$axios
        .post(`/academic-sessions/${this.form.session_id}/academic-calenders`, this.form)
        .then((res) => {
          notify("Academic calendar successfully created", "success");
          this.$root.$emit("academic_calendar_paginate", true);
          this.stopLoader();
          this.$bvModal.hide("add-academic-calendar");
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
