<template>
  <button :class="button_class" :disabled="disabled" :type="button_type">
    <span
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
      v-if="loading"
    ></span>
    <span v-else>{{ value }}</span>
  </button>
</template>
<script>
export default {
  props: {
    button_class: {
      required: true,
      type: String,
    },
    button_type: {
      required: true,
      type: String,
    },
    disabled: {
      required: true,
      type: Boolean,
    },
    loading: {
      required: true,
      type: Boolean,
    },
    value: {
      required: true,
      type: String,
    },
  },
};
</script>

<style>
.btn-primary {
  color: #fff;
  background-color: #bb3434;
  border-color: #bb3434;
}
</style>
