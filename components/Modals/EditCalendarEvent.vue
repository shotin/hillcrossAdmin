<template>
  <b-modal
    id="edit-event"
    hide-footer
    size="lg"
    no-close-on-esc
    no-close-on-backdrop
    body-class="px-4"
    title="Edit Event"
  >
    <div class="px-3">
      <form>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label>Title</label>
            <input
              type="text"
              class="form-control"
              v-model="form.title"
              placeholder="title"
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label>Date</label>
            <input
              type="date"
              class="form-control"
              v-model="form.start"
              placeholder="Start Date"
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label>Start Time</label>
            <input
              type="time"
              class="form-control"
              v-model="form.start_time"
              placeholder="Start Time"
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
          <button type="button" @click="closeModal()" class="btn btn-danger">
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
    academic_calendar: {
      type: Object,
      required: true,
    },
    calendar_event_data: {
      type: Object,
      required: true,
    },
  },
  watch: {
    calendar_event_data: {
      handler(newVal, oldVal) {
        this.form.title = newVal.title;
        this.form.start = newVal.start;
        this.form.end = newVal.end;
        this.form.start_time = newVal.start_time;
      },
    },
  },
  data() {
    return {
      loading: false,
      disabled: false,
      form: this.getForm(),
    };
  },
  methods: {
    closeModal() {
      this.$bvModal.hide("edit-event");
    },
    getForm() {
      return {
        title: "",
        start: "",
        start_time: "",
        end: "",
      };
    },
    done() {
      this.loading = true;
      this.disabled = true;
      this.$axios
        .patch(`/academic-calendars/${this.academic_calendar.id}/events/${this.calendar_event_data.eventId}`)
        .then((res) => {
          this.loading = false;
          this.disabled = false;
          notify("Event updated successfully", "success");
          this.$store.commit("event/UPDATE_VIEW_DATA", update);
          this.$bvModal.hide("edit-event");
        })
        .catch((err) => {
          this.loading = false;
          this.disabled = false;
          handleError(err);
          this.getForm();
        });
    },
  },
};
</script>
