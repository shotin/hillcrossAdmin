<template>
  <div class="card">
    <filter-announcement class="mt-2 mr-2 ml-2" />
    <div class="table-responsive">
      <table
        class="table table-hover table-vcenter text-nowrap table-striped mb-0"
        v-if="type === 'announcements'"
      >
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="announcement in announcements" :key="announcement.id">
            <td>
              <div class="font-15">{{ announcement.type }}</div>
            </td>
            <td>
              <div class="font-15">{{ announcement.description }}</div>
            </td>
            <td>
              <strong>{{ announcement.status }}</strong>
            </td>
            <td>
              <strong>{{ announcement.date_created }}</strong>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                @click="download(announcement)"
                title="View Assets"
              >
                <i class="fa fa-download"></i>
              </button>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                @click="openEdit(announcement)"
                title="Deactivate"
              >
                <i class="fa fa-edit"></i>
              </button>
              <delete-item
                :want_block="true"
                :data="announcement"
                :url="`/announcements/${announcement.id}`"
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
import FilterAnnouncement from "../FilterAnnouncement.vue";
export default {
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
    FilterAnnouncement,
  },
  computed: {
    ...mapGetters({
      announcements: "app/pageData",
      type: "app/pageType",
      announcement_data: "app/pageViewData",
    }),
  },
  watch: {
    announcement_data: {
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
    this.$root.$on("announcement_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getAnnouncements();
      }
    });
    this.getAnnouncements();
  },
  methods: {
    getAnnouncements() {
      this.$axios
        .get(`/announcements?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "announcements");
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
    download(data) {
      window.open(data.file_url, '_blank')
    }
  },
};
</script>
