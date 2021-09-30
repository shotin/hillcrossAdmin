<template>
  <span>
    <button
      class="btn btn-success mt-2 mr-2 mb-3 float-right"
      @click="openPayslipModal()"
      type="button"
    >
      Generate Payment
    </button>
    <update-payslip
      :isSingle="false"
      :payslipIds="payslipIds"
      v-if="payslipIds.length > 1"
    />
    <span v-if="type === 'payslips'">
      <table class="table table-hover table-vcenter table-striped mb-0">
        <thead>
          <tr>
            <th>
              <input type="checkbox" @click="selectAll" v-model="allSelected" />
            </th>
            <th></th>
            <th>Staff</th>
            <th>Role</th>
            <th>Payment Month</th>
            <th>Payment Year</th>
            <th>Payment Date</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payslip in payslips" :key="payslip.id">
            <td>
              <input
                type="checkbox"
                v-model="payslipIds"
                :value="payslip.id"
                v-if="payslip.can_mark"
              />
            </td>
            <td class="w60" v-if="payslip.staff.avatar">
              <img
                class="avatar"
                :src="payslip.staff.avatar"
                :alt="payslip.staff.name"
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
                <span>{{ payslip.staff.avatar_alternative }}</span>
              </div>
            </td>
            <td>
              <div class="font-15">{{ payslip.staff.name }}</div>
            </td>
            <td>
              <div class="font-15">{{ payslip.role.name }}</div>
            </td>
            <td>
              <div class="font-15">{{ payslip.payment_month }}</div>
            </td>
            <td>
              <div class="font-15">{{ payslip.payment_year }}</div>
            </td>
            <td>
              <div class="font-15">{{ payslip.payment_date }}</div>
            </td>
            <td>
              <strong>{{ payslip.status }}</strong>
            </td>
            <td>
              <strong>{{ payslip.date_created }}</strong>
            </td>
            <td width="150">
              <button
                type="button"
                class="btn btn-icon btn-sm"
                @click="openShow(payslip)"
                title="Details"
              >
                <i class="fa fa-eye"></i>
              </button>
              <update-payslip
                :isSingle="true"
                :payslipIds="payslipIds"
                :payslip="payslip"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <paginate
        :pagination="records"
        @paginate="payslips"
        :offset="4"
        :emitTo="`payslip_paginate`"
        class="mb-1 ml-2"
        v-if="payslips.length"
      />
    </span>

    <loader v-else />
    <generate-payment />
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
import GeneratePayment from "../Modals/GeneratePayment.vue";
import UpdatePayslip from "./UpdatePayslip.vue";
export default {
  data() {
    return {
      records: this.getRecords(),
      roles: [],
      allSelected: false,
      selected: [],
      payslipIds: [],
      form: this.getForm(),
      loading: false,
      disabled: false,
    };
  },
  components: {
    Loader,
    DeleteItem,
    GeneratePayment,
    UpdatePayslip,
  },
  computed: {
    ...mapGetters({
      payslips: "app/pageData",
      type: "app/pageType",
      payslip_data: "app/pageViewData",
      payslip_show_data: "app/pageShowData",
    }),
  },
  watch: {
    payslip_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$bvModal.show("edit-payroll");
        }
      },
      immediate: true,
      deep: true,
    },
    payslip_show_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("show-payslip");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("payslip_paginate", function(filter) {
      if (filter) {
        if (filter.updated === "updated") {
          self.allSelected = false;
        }
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getPayslip();
      }
    });
    this.getPayslip();
  },
  methods: {
    getPayslip() {
      this.$axios
        .get(`/payslips?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "payslips");
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
    openPayslipModal() {
      this.$bvModal.show("generate-payment");
    },
    openShow(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_SHOW_DATA", update);
    },
    selectAll() {
      if (!this.allSelected) {
        let filtered = _.filter(this.payslips, ["status", "Pending Payment"]);
        if (filtered.length) {
          this.payslipIds = this.payslips.map((o) => o.id);
          this.allSelected = true;
        }
      } else {
        this.payslipIds = [];
        this.allSelected = false;
      }
    },
    getForm() {
      return {
        status: "",
        month: "",
        year: "",
      };
    },
  },
};
</script>
