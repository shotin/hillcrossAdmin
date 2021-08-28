<template>
  <div class="pagination-light">
    <ul class="pagination m-0">
      <li
        class="page-item disabled"
        :class="{ disabled: pagination.current_page === 1 }"
      >
        <a
          class="page-link"
          href="javascript:void(0)"
          aria-label="Previous"
          v-on:click.prevent="changePage(pagination.current_page - 1)"
        >
          <i class="fa fa-chevron-left"></i>
          <span>Prev</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(page, index) in pagesNumber"
        :key="index"
        :class="{ active: page == pagination.current_page }"
      >
        <a
          class="page-link"
          href="javascript:void(0)"
          v-on:click.prevent="changePage(page)"
          aria-label="1"
        >
          <span>{{ page }}</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: pagination.current_page === pagination.last_page }"
      >
        <a
          class="page-link"
          href="javascript:void(0)"
          aria-label="Next"
          v-on:click.prevent="changePage(pagination.current_page + 1)"
        >
          <span>Next</span>
          <i class="fa fa-chevron-right"></i>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    offset: {
      type: Number,
      default: 4,
    },
    emitTo: {
      type: String,
    },
  },
  computed: {
    pagesNumber() {
      if (!this.pagination.to) {
        return [];
      }
      let from = this.pagination.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset * 2;
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      let pagesArray = [];
      for (let page = from; page <= to; page++) {
        pagesArray.push(page);
      }
      return pagesArray;
    },
  },
  methods: {
    changePage(page) {
      this.pagination.current_page = page;
      this.$root.$emit(this.emitTo, this.pagination);
    },
  },
};
</script>
