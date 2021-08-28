<template>
  <div class="tab-pane" id="Invoice-detail" role="tabpanel">
    <div class="row clearfix">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              {{ payroll_data.payment_month }}/{{ payroll_data.payment_year }}
            </h3>
            <div class="card-options">
              <button type="button" class="btn btn-primary">
                <i class="si si-printer"></i> Print Invoice
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row my-8">
              <div class="col-6">
                <p class="h3">{{ payroll_data.staff.name }}</p>
                <address>
                  ID Number: 123456789<br />
                  Staff ID: 2233445566<br />
                  Role: {{ payroll_data.role.name }}<br />
                  Position: {{ payroll_data.staff.name }}<br />
                </address>
              </div>
              <!-- <div class="col-6 text-right">
                <p class="h3">Hillcross College Limited</p>
                <address>
                  Street Address<br />
                  State, City<br />
                  Region, Postal Code<br />
                  <a
                    href="https://nsdbytes.com/cdn-cgi/l/email-protection"
                    class="__cf_email__"
                    data-cfemail="086b7c7a486d70696578646d266b6765"
                    >[email&#160;protected]</a
                  >
                </address>
              </div> -->
            </div>
            <div class="table-responsive push">
              <table class="table table-bordered table-hover">
                <tr>
                  <th colspan="3">Earnings</th>
                  <th class="text-right" style="width: 2%">
                    Amount (R)
                  </th>
                </tr>
                <tr
                  v-for="(earning, index) in payroll_data.breakdowns.earnings"
                  :key="index"
                >
                  <td colspan="3">
                    <p class="font600 mb-1">{{ earning.title }}</p>
                  </td>
                  <td class="text-right">
                    {{ new Intl.NumberFormat().format(earning.value) }}.00
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="font600 text-right">
                    Gross Pay
                  </td>
                  <td class="text-right">{{ new Intl.NumberFormat().format(processGrossSum()) }}.00</td>
                </tr>
                <tr>
                  <th colspan="3">Deductions</th>
                </tr>
                <tr
                  v-for="(deduction, index) in payroll_data.breakdowns.deductions"
                  :key="index+100"
                >
                  <td colspan="3" class="text-right">
                    <p class="font600 mb-1">{{ deduction.title }}</p>
                  </td>
                  <td class="text-right">
                    {{ new Intl.NumberFormat().format(deduction.value) }}.00
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="font600 text-right">
                    Total Deduction
                  </td>
                  <td class="text-right">{{ new Intl.NumberFormat().format(processDeductionSum()) }}.00</td>
                </tr>
                <tr class="bg-green text-light">
                  <td colspan="3" class="font800 text-right">
                    Net Pay
                  </td>
                  <td class="text-right font800">{{ new Intl.NumberFormat().format(getNetPay()) }}.00</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { notify, handleError } from "@/assets/js/utility";
export default {
  computed: {
    ...mapGetters({
      payroll_data: "app/pageShowData",
    }),
  },
  methods: {
    processGrossSum() {
      return _.sumBy(this.payroll_data.breakdowns.earnings, function(o) { return parseInt(o.value); });
    },
    processDeductionSum() {
      return _.sumBy(this.payroll_data.breakdowns.deductions, function(o) { return parseInt(o.value); });
    },
    getNetPay() {
        return this.processGrossSum() - this.processDeductionSum();
    }
  },
};
</script>
