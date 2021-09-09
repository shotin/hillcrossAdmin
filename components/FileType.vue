<template>
  <div class="card-body">
    <div class="file_folder">
      <a :href="file_url" target="_blank">
        <div class="icon">
          <i class="text-primary" :class="icon"></i>
        </div>
        <div class="file-name">
          <p class="mb-0 text-muted">{{ file_name }}</p>
          <!-- <small>Size: 68KB</small> -->
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    file_type: {
      required: true,
      type: String,
    },
    file_url: {
      required: true,
      trpe: String,
    },
    file_name: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      icon: "fa fa-file-word-o",
    };
  },
  methods: {
    getIcon() {
      switch (this.file_type) {
        case "docs":
          this.icon = "fa fa-file-word-o";
          break;
        case "pdf":
          this.icon = "fa fa-file-pdf-o";
          break;
        case "xlsx":
          this.icon = "fa fa-file-excel-o";
          break;
        default:
          break;
      }
    },
  },
};
</script>
