<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Payroll Management</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Payroll Management
              </li>
            </ol>
          </div>
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="[listPayroll ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('listPayroll')"
                href="#payroll-config"
                >Payrolls</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="[listPayslip ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('listPayslip')"
                href="#payslips"
                >Payslips</a
              >
            </li>
            <li class="nav-item" v-if="details">
              <a
                class="nav-link"
                :class="[details ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('details')"
                href="#pro-details"
                >Details</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section-body mt-4">
      <div class="container-fluid">
        <div class="tab-content">
          <div
            class="tab-pane"
            :class="[listPayroll ? 'active' : '']"
            id="payroll-config"
          >
            <div class="card">
              <div class="table-responsive">
                <list-payroll v-if="listPayroll" />
              </div>
            </div>
          </div>
          <div class="card">
            <div
              v-if="details"
              class="tab-pane"
              :class="[details ? 'active' : '']"
              id="pro-details"
            >
              <payslip-details v-if="details" />
            </div>
          </div>
          <div
            class="tab-pane"
            :class="[listPayslip ? 'active' : '']"
            id="payslips"
          >
            <div class="card">
              <div class="card-body">
                <filter-payslip v-if="listPayslip" />
                <div class="table-responsive">
                  <list-payslip v-if="listPayslip" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import FilterPayslip from "../../components/Payroll/FilterPayslip.vue";
import ListPayroll from "../../components/Payroll/ListPayroll.vue";
import ListPayslip from "../../components/Payroll/ListPayslip.vue";
import PayslipDetails from "../../components/Payroll/PayslipDetails.vue";
export default {
  components: { ListPayroll, ListPayslip, PayslipDetails, FilterPayslip },
  mounted() {
    let self = this;
    self.$root.$on("show-payslip", function(val) {
      self.listPayroll = false;
      self.listPayslip = false;
      self.details = true;
    });
  },
  data() {
    return {
      listPayroll: true,
      listPayslip: false,
      details: false,
    };
  },
  methods: {
    switchTab(key) {
      switch (key) {
        case "listPayroll":
          this.listPayroll = true;
          this.listPayslip = false;
          this.details = false;
          break;
        case "listPayslip":
          this.listPayroll = false;
          this.listPayslip = true;
          this.details = false;
          break;
        default:
          this.listPayroll = true;
          this.listPayslip = false;
          this.details = false;
          break;
      }
    },
  },
};
</script>
