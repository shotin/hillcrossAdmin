<template>
  <a
    type="button"
    class="dropdown-item"
    href="#"
    @click="printDetails()"
    title="Print Details"
  >
    Print Details
  </a>
</template>
<script>
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
    printDetails() {
      
    },
  },
};
</script>
