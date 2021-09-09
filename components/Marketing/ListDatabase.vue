<template>
  <div class="card">
    <filter-marketing class="mt-2 mr-2 ml-2" />
    <div class="table-responsive">
      <table
        class="table table-hover table-vcenter text-nowrap table-striped mb-0"
        v-if="type === 'databases'"
      >
        <thead>
          <tr>
            <th>File name</th>
            <th>File Type</th>
            <th>Year</th>
            <th>Province</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="marketing in marketings" :key="marketing.id">
            <td>
              <div class="font-15">{{ marketing.file_name }}</div>
            </td>
            <td>
              <div class="font-15">{{ marketing.file_type }}</div>
            </td>
            <td>
              <strong>{{ marketing.year }}</strong>
            </td>
            <td>
              <strong>{{ marketing.province_string }}</strong>
            </td>
            <td>
              <strong>{{ marketing.description }}</strong>
            </td>
            <td>
              <strong>{{ marketing.date_created }}</strong>
            </td>
            <td>
              <button type="button" class="btn btn-icon btn-sm" title="View">
                <i class="fa fa-eye"></i>
              </button>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                @click="openEdit(marketing)"
                title="Edit"
              >
                <i class="fa fa-edit"></i>
              </button>
              <delete-item
                :want_block="true"
                :data="marketing"
                :url="`/roles/${marketing.id}`"
                :storeItem="`app/REMOVE_DATA`"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <loader v-else />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
import FilterMarketing from "../FilterMarketing.vue";
export default {
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
    FilterMarketing,
  },
  computed: {
    ...mapGetters({
      marketings: "app/pageData",
      type: "app/pageType",
      marketing_data: "app/pageViewData",
    }),
  },
  watch: {
    marketing_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("edit-database");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("marketing_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getMarketings();
      }
    });
    this.getMarketings();
  },
  methods: {
    getMarketings() {
      this.$axios
        .get(`/marketing/databases?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "databases");
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
