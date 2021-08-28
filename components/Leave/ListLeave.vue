<template>
  <table
    class="table table-hover table-vcenter text-nowrap table-striped mb-0"
    v-if="type === 'leaves'"
  >
    <thead>
      <tr>
        <th>Reviewer</th>
        <th>Reason</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Status</th>
        <th>Date Created</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="leave in leaves" :key="leave.id">
        <td>
          <div class="font-15">{{ leave.reviewer.name }}</div>
        </td>
        <td>
          <strong>{{ leave.reason.name }}</strong>
        </td>
        <td>
          <strong>{{ leave.start_date }}</strong>
        </td>
        <td>
          <strong>{{ leave.end_date }}</strong>
        </td>
        <td>
          <strong>{{ leave.status }}</strong>
        </td>
        <td>
          <strong>{{ leave.date_created }}</strong>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-icon btn-sm"
            @click="openDetails(leave)"
            title="View"
          >
            <i class="fa fa-eye"></i>
          </button>
          <button
            type="button"
            class="btn btn-icon btn-sm"
            @click="openEdit(leave)"
            title="Edit"
          >
            <i class="fa fa-edit"></i>
          </button>
          <button
            v-if="leave.status !== 'Approved'"
            type="button"
            class="btn btn-icon btn-sm"
            @click="approveLeave(leave)"
            title="View"
          >
            <i class="fa fa-thumbs-up text-success"></i>
          </button>
          <delete-item
            :want_block="true"
            :data="leave"
            :url="`/leaves/${leave.id}`"
            :storeItem="`app/REMOVE_DATA`"
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
import { notify, handleError } from "@/assets/js/utility";
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
      leaves: "app/pageData",
      type: "app/pageType",
      leave_data: "app/pageViewData",
    }),
  },
  watch: {
    leave_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("edit-leave");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("leave_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getLeaves();
      }
    });
    this.getLeaves();
  },
  methods: {
    getLeaves() {
      this.$axios
        .get(`/leaves?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "leaves");
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
    openDetails(leave) {
      this.$router.push(`/leaves/${leave.id}`);
    },
    async approveLeave(leave) {
      notify('Approve request in progress', 'info')
      await this.$axios
        .get(`/leaves/${leave.id}/approve`)
        .then((res) => {
          this.$store.commit("app/UPDATE_DATA", res.data.data);
          notify('Leave approved successfully', 'success')
        })
        .catch((err) => {
          handleError(err)
        });
    },
  },
};
</script>
