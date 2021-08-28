<template>
  <table
    class="table table-hover table-vcenter text-nowrap table-striped mb-0"
    v-if="type === 'assignments'"
  >
    <thead>
      <tr>
        <th>Teacher</th>
        <th>Module</th>
        <th>File Type</th>
        <th>Submission Date</th>
        <th>Status</th>
        <th>Date Created</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="assignment in assignments" :key="assignment.id">
        <td>
          <div class="font-15">{{ assignment.teacher }}</div>
        </td>
        <td>
          <strong>{{ assignment.module }}</strong>
        </td>
        <td>
          <strong>{{ assignment.file_type }}</strong>
        </td>
        <td>
          <strong>{{ assignment.submission_date }}</strong>
        </td>
        <td>
          <strong>{{ assignment.status }}</strong>
        </td>
        <td>
          <strong>{{ assignment.creation_date }}</strong>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-icon btn-sm"
            @click="openFile(assignment)"
            title="Open File"
          >
            <i class="fa fa-play text-success"></i>
          </button>
          <button
            type="button"
            class="btn btn-icon btn-sm"
            @click="openDetails(assignment)"
            title="Details"
          >
            <i class="fa fa-eye"></i>
          </button>
          <activate-item
            v-if="assignment.status !== 'Approved'"
            :want_block="false"
            :data="assignment"
            :url="
              `/administrators/assignments/${assignment.id}/approval`
            "
            :storeItem="`app/UPDATE_DATA`"
          />
          <end-item
            v-if="assignment.status === 'Approved'"
            :want_block="false"
            :data="assignment"
            :url="
              `/administrators/assignments/${assignment.id}/end`
            "
            :storeItem="`app/UPDATE_DATA`"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <loader v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
import ActivateItem from "../ActivateItem.vue";
import EndItem from '../EndItem.vue'
export default {
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
    ActivateItem,
    EndItem
  },
  computed: {
    ...mapGetters({
      assignments: "app/pageData",
      type: "app/pageType",
      assignment_data: "app/pageViewData",
    }),
  },
  watch: {
    assignment_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("assignment-details");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("assignment_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getAssignments();
      }
    });
    this.getAssignments();
  },
  methods: {
    getAssignments() {
      this.$axios
        .get(`/administrators/assignments?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "assignments");
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
    openDetails(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_VIEW_DATA", update);
    },
    openFile(details) {
      window.open(details.file_url, '_blank') 
    }
  },
};
</script>
