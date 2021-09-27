<template>
  <table
    class="table table-hover table-vcenter text-nowrap table-striped mb-0"
    v-if="type === 'logs'"
  >
    <thead>
      <tr>
        <th>User</th>
        <th>Action</th>
        <th>Message</th>
        <th>IP Address</th>
        <th>Date Created</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="log in logs" :key="log.id">
        <td>
          <div class="font-15">{{ log.user }}</div>
        </td>
        <td>
          <strong>{{ log.action }}</strong>
        </td>
        <td>
          <strong>{{ log.message }}</strong>
        </td>
        <td>
          <strong>{{ log.ip }}</strong>
        </td>
        <td>
          <strong>{{ log.date_created }}</strong>
        </td>
      </tr>
    </tbody>
  </table>
  <loader v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "@/components/Loader.vue";
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
      logs: "app/pageData",
      type: "app/pageType",
    }),
  },
  mounted() {
    let self = this;
    this.$root.$on("log_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getLogs();
      }
    });
    this.getLogs();
  },
  methods: {
    getLogs() {
      this.$axios
        .get(`/activity-logs?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "logs");
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
  },
};
</script>
