<template>
  <a
    type="button"
    class="dropdown-item"
    href="#"
    @click="createSage()"
    title="Create Sage Account"
  >
    Create Sage Account
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
  },
  methods: {
    createSage() {
      Swal.fire({
        title: `Are you sure you want to create a sage account for "${
          this.data.name ? this.data.name : "Item"
        }?"`,
        text: "This student will have his/her details moved to Sage",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#44c1c9",
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes, create it!",
        cancelButtonText: "No, cancel!",
        preConfirm: () => {
          return this.$axios
            .get(this.url)
            .then((res) => {
              this.$store.commit(this.storeItem, this.data);
              notify("Student record created on sage successfully", "success");
            })
            .catch((error) => {
              Swal.showValidationMessage(
                `Request failed: Sage account cannot be created at this time, please contact admin`
              );
            });
        },
        allowOutsideClick: false,
      });
    },
  },
};
</script>
