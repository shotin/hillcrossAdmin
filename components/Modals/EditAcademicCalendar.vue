<template>
  <b-modal
    id="edit-academic-calendar"
    hide-footer
    size="md"
    no-close-on-esc
    no-close-on-backdrop
    body-class="px-4"
    title="Edit Academic Calendar"
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
              <option
                :value="session.id"
                v-for="session in academic_sessions"
                :key="session.id"
              >
                {{ session.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>Academic Semester</label>
            <select name="" class="form-control" v-model="form.semester_id">
              <option value="">Select Academic Semester</option>
              <option
                :value="semester.id"
                v-for="semester in academic_semesters"
                :key="semester.id"
              >
                {{ semester.name }}
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
            :value="'Update'"
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
    academic_calendar: {
      required: true,
      type: Object,
    },
  },
  watch: {
    academic_calendar: {
      handler(newVal, oldVal) {
        this.form.name = newVal.name;
        this.form.session_id = newVal.session.id;
        this.form.semester_id = newVal.semester.id;
        this.form.start_date = newVal.start_date;
        this.form.end_date = newVal.end_date;
        this.form.course_registration_start_date =
          newVal.course_registration_start_date;
        this.form.course_registration_end_date =
          newVal.course_registration_end_date;
      },
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
      this.$bvModal.hide("edit-academic-calendar");
    },
    getForm() {
      return {
        name: "",
        start_date: "",
        end_date: "",
        course_registration_start_date: "",
        course_registration_end_date: "",
        semester_id: "",
        session_id: "",
      };
    },
    done() {
      this.loading = true;
      this.disabled = true;
      this.$axios
        .patch(
          `/academic-sessions/${this.form.session_id}/academic-calenders/${this.academic_calendar.id}`,
          this.form
        )
        .then((res) => {
          notify("Academic calendar successfully updated", "success");
          this.$store.commit("app/UPDATE_DATA", res.data.data);
          this.stopLoader();
          this.$bvModal.hide("edit-academic-calendar");
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
