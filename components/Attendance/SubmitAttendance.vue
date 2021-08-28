<template>
  <span>
    <button
      type="button"
      class="btn btn-icon btn-sm"
      :title="
        attendance.status === 'Present' || attendance.status === 'On Vacation'
          ? 'Attendance already taken'
          : 'Mark Attendance'
      "
      :disabled="
        attendance.status === 'Present' || attendance.status === 'On Vacation'
      "
      v-if="isSingle"
      @click="markAttendance()"
    >
      <i class="fa fa-check"></i>
    </button>
    <button
      type="button"
      class="btn btn-sm btn-primary btn-block"
      title="Mark Selected"
      @click="markAttendance()"
      v-else
    >
      Mark Selected
    </button>
  </span>
</template>
<script>
import Swal from "sweetalert2";
import { notify, handleError } from "@/assets/js/utility";
export default {
  props: {
    isSingle: {
      required: true,
      type: Boolean,
    },
    attendanceIds: {
      required: true,
      type: Array,
    },
    attendance: {
      type: Object,
    },
  },
  methods: {
    markAttendance() {
      let form = {};
      if (this.isSingle) {
        form.attendance = [this.attendance.id];
      } else {
        form.attendance = this.attendanceIds;
      }
      Swal.fire({
        title: "Enter the time",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        inputPlaceholder: "HH:MM",
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: (time) => {
          form.time = time;
          return this.$axios
            .post("/staff-attendances/mark", form)
            .then((res) => {
              this.$root.$emit("attendance_submitted", true);
              notify("Item deleted successfully", "success");
            })
            .catch((error) => {
              if (error.response.status === 422) {
                let errors = [];
                for (var key in error.response.data.errors) {
                  error.response.data.errors[key].forEach((element) => {
                    errors.push(`${key}: ${element}`);
                  });
                }
                Swal.showValidationMessage(`${errors.join("\n")}`);
              } else {
                Swal.showValidationMessage(`${error}`);
              }
            });
        },
        allowOutsideClick: false,
      });
    },
  },
};
</script>
