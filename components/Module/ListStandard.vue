<template>
  <span v-if="type === 'standards'">
    <table
      class="table table-hover table-vcenter text-nowrap table-striped mb-0"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Module Count</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="standard in standards" :key="standard.id">
          <td>
            <div class="font-15">{{ standard.name }}</div>
          </td>
          <td>
            <strong>{{ standard.module_count }}</strong>
          </td>
          <td>
            <strong>{{ standard.date_created }}</strong>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-icon btn-sm"
              @click="openEdit(standard)"
              title="Edit"
            >
              <i class="fa fa-edit"></i>
            </button>
            <delete-item
              :want_block="true"
              :data="standard"
              :url="`/standards/${standard.id}`"
              :storeItem="`app/REMOVE_DATA`"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <paginate
      :pagination="records"
      @paginate="standards"
      :offset="4"
      :emitTo="`standard_data_paginate`"
      class="mb-1 ml-2"
      v-if="standards.length"
    />
  </span>

  <loader v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
export default {
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
  },
  computed: {
    ...mapGetters({
      standards: "app/pageData",
      type: "app/pageType",
      standard_data: "app/pageViewData",
    }),
  },
  watch: {
    standard_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          //   this.$root.$emit("edit-role");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("standard_data_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getStandards();
      }
    });
    this.getStandards();
  },
  methods: {
    getStandards() {
      this.$axios
        .get(`/standards/auth?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "standards");
          this.records = res.data.meta;
        })
        .catch((err) => {});
    },
    getRecords() {
      return {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
      };
    },
    openEdit(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_VIEW_DATA", update);
    },
  },
};
</script>
