<template>
  <b-modal
    id="add-event"
    hide-footer
    size="md"
    no-close-on-esc
    no-close-on-backdrop
    body-class="px-4"
    title="Add New Event"
  >
    <div class="px-3">
      <form>
        <div class="col-md-12 col-sm-12">
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
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label>Start Date</label>
            <input
              type="date"
              class="form-control"
              v-model="form.start"
              placeholder="Start Date"
            />
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
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
        <div class="col-md-12 col-sm-12">
          <div class="form-group">
            <label class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                name="example-checkbox1"
                v-model="form.extend"
              />
              <span class="custom-control-label">Is Extended?</span>
            </label>
          </div>
        </div>
        <div class="col-md-12 col-sm-12" v-if="form.extend">
          <div class="form-group">
            <label>End Date</label>
            <input
              type="date"
              class="form-control"
              v-model="form.end"
              placeholder="End Date"
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
      this.$bvModal.hide("add-event");
    },
    getForm() {
      return {
        title: "",
        start: "",
        start_time: "",
        end: "",
        extend: false
      };
    },
    done() {
      this.loading = true;
      this.disabled = true;
      this.$axios
        .post(
          `/academic-calendars/${this.academic_calendar.id}/events`,
          this.form
        )
        .then((res) => {
          this.loading = false;
          this.disabled = false;
          notify("Event added successfully", "success");
          this.$root.$emit('event_lists', true)
          this.$bvModal.hide("add-event");
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
