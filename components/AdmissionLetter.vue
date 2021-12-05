<template>
  <a
    type="button"
    class="dropdown-item"
    href="#"
    @click="viewAdmissionLetter()"
    title="View Admission Letter"
  >
    View Admission Letter
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
    viewAdmissionLetter() {
      if(this.data.admission_letter_url !== null) {
        window.open(this.data.admission_letter_url, "_blank");
      }else {
        notify('info', 'Please regenerate admission letter')
      }
    },
  },
};
</script>
