<template>
  <span>
    <button
      class="btn btn-success mt-2 mr-2 mb-3 float-right"
      @click="openAddModal()"
      type="button"
    >
      Add New Payroll
    </button>
    <table
      class="table table-hover table-vcenter table-striped mb-0"
      v-if="type === 'payrolls'"
    >
      <thead>
        <tr>
          <th></th>
          <th>Staff</th>
          <th>Role</th>
          <th>Monthly Earnings Breakdown</th>
          <th>Monthly Deductions Breakdown</th>
          <th>Status</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payroll in payrolls" :key="payroll.id">
          <td class="w60" v-if="payroll.staff.avatar">
            <img
              class="avatar"
              :src="payroll.staff.avatar"
              :alt="payroll.staff.first_name"
            />
          </td>
          <td class="w60" v-else>
            <div
              class="avatar avatar-pink"
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Avatar Name"
            >
              <span>{{ payroll.staff.avatar_alternative }}</span>
            </div>
          </td>
          <td>
            <div class="font-15">{{ payroll.staff.name }}</div>
          </td>
          <td>
            <div class="font-15">{{ payroll.role.name }}</div>
          </td>
          <td>
            <strong>{{ payroll.monthly_earnings }}</strong>
          </td>
          <td>
            <strong>{{ payroll.deductions }}</strong>
          </td>
          <td>
            <strong>{{ payroll.status }}</strong>
          </td>
          <td>
            <strong>{{ payroll.date_created }}</strong>
          </td>
          <td width="150">
            <button
              type="button"
              class="btn btn-icon btn-sm"
              @click="openEdit(payroll)"
              title="Edit"
            >
              <i class="fa fa-edit"></i>
            </button>
            <delete-item
              :want_block="true"
              :data="payroll"
              :url="`/payrolls/${payroll.id}`"
              :storeItem="`app/REMOVE_DATA`"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <loader v-else />
    <add-payroll :roles="roles" style="display: none;" />
    <edit-payroll :payroll_data="payroll_data"/>
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
import AddPayroll from "../Modals/AddPayroll.vue";
import EditPayroll from '../Modals/EditPayroll.vue';
export default {
  data() {
    return {
      records: this.getRecords(),
      roles: [],
    };
  },
  components: {
    Loader,
    DeleteItem,
    AddPayroll,
    EditPayroll,
  },
  computed: {
    ...mapGetters({
      payrolls: "app/pageData",
      type: "app/pageType",
      payroll_data: "app/pageViewData",
    }),
  },
  watch: {
    payroll_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$bvModal.show("edit-payroll");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("payroll_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getPayroll();
      }
    });
    this.getPayroll();
    this.getRoles();
  },
  methods: {
    getRoles() {
      this.$axios
        .get(`/roles/employable`)
        .then((res) => {
          this.roles = res.data.data;
        })
        .catch((err) => {});
    },
    getPayroll() {
      this.$axios
        .get(`/payrolls?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "payrolls");
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
    openAddModal() {
      this.$bvModal.show("add-payroll");
    },
  },
};
</script>
