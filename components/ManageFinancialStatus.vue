<template>
  <a
    type="button"
    class="dropdown-item"
    href="#"
    @click="createSage()"
    title="Create Sage Account"
  >
    {{ financial_status }} Student
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
    financial_status: {
      type: String,
      required: true,
    },
  },
  methods: {
    createSage() {
      Swal.fire({
        title: `Are you sure you want to ${
          this.financial_status
        } this student: "${this.data.name ? this.data.name : "Item"}?"`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#44c1c9",
        showLoaderOnConfirm: true,
        confirmButtonText: `Yes, ${this.financial_status}!`,
        cancelButtonText: "No, cancel!",
        preConfirm: () => {
          return this.$axios
            .get(this.url)
            .then((res) => {
              this.$store.commit(this.storeItem, res.data.data);
              notify(
                `Student financial record ${this.financial_status} successfuly`,
                "success"
              );
            })
            .catch((error) => {
              Swal.showValidationMessage(
                `Request failed: Record cannot be ${this.financial_status} at this time, contact admin`
              );
            });
        },
        allowOutsideClick: false,
      });
    },
  },
};
</script>
