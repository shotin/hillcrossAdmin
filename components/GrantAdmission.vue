<template>
  <a
    type="button"
    class="dropdown-item"
    href="#"
    @click="grantAdmission()"
    title="Grant Admission"
  >
    Grant Admission
  </a>
</template>
<script>
import Swal from "sweetalert2";
import { notify, handleError } from "@/assets/js/utility";

export default {
  props: {
    data: {
      required: true,
      type: Object,
    },
    url: {
      required: true,
      type: String,
    },
    storeItem: {
      required: true,
      type: String,
    },
    want_block: {
      required: false,
    },
    emitTo: {
      required: true,
      type: String,
    },
  },
  methods: {
    grantAdmission() {
      Swal.fire({
        title: `Are you sure you want to grant this student admission?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#44c1c9",
        showLoaderOnConfirm: true,
        confirmButtonText: `Yes, Proceed`,
        cancelButtonText: "No, cancel!",
        preConfirm: () => {
          return this.$axios
            .get(this.url)
            .then((res) => {
              notify(
                `Student admitted successfuly`,
                "success"
              );
              this.$store.commit("app/UPDATE_DATA", res.data.data);
            })
            .catch((error) => {
              Swal.showValidationMessage(
                `Request failed: user cannot be granted admission at this time, please try again`
              );
            });
        },
        allowOutsideClick: false,
      });
    },
  },
};
</script>
