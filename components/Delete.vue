<template>
  <button
    type="button"
    class="btn btn-icon btn-sm"
    title="Delete"
    @click="deleteItem()"
  >
    <i class="fa fa-trash-alt text-danger"></i>
  </button>
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
    deleteItem() {
      Swal.fire({
        title: `Are you sure you want to delete "${
          this.data.name ? this.data.name : "Item"
        }?"`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#44c1c9",
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        preConfirm: () => {
          return this.$axios
            .delete(this.url)
            .then((res) => {
              this.$store.commit(this.storeItem, this.data);
              notify("Item deleted successfully", "success");
            })
            .catch((error) => {
              handleError(error);
            });
        },
        allowOutsideClick: false,
      });
    },
  },
};
</script>
