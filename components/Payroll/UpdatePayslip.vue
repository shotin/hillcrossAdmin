<template>
  <span>
    <button
      type="button"
      class="btn btn-icon btn-sm"
      :title="
        payslip.status === 'Paid' ? 'Payment already updated' : 'Update Payment'
      "
      :disabled="payslip.status === 'Paid'"
      v-if="isSingle"
      @click="updatePayment()"
    >
      <i class="fa fa-check"></i>
    </button>
    <button
      type="button"
      class="btn btn-primary mt-2 mr-2 mb-3 float-right"
      title="Mark Selected"
      @click="updatePayment()"
      v-else
    >
      Update Payment
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
    payslipIds: {
      required: true,
      type: Array,
    },
    payslip: {
      type: Object,
    },
  },
  methods: {
    updatePayment() {
      let form = {};
      if (this.isSingle) {
        form.payslips = [this.payslip.id];
      } else {
        form.payslips = this.payslipIds;
      }
      Swal.fire({
        title: "Select status",
        input: "select",
        inputOptions: {
          Paid: "Paid",
          Failed: "Failed"
        },
        inputPlaceholder: "Select status",
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: (status) => {
          form.status = status;
          return this.$axios
            .post("/payslips/bulk-update", form)
            .then((res) => {
              this.$root.$emit("payslip_paginate", {updated: 'updated'});
              notify("Updated successfully", "success");
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
