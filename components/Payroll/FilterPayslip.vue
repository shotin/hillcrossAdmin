<template>
  <div class="row">
    <div class="col-lg-4 col-md-4 col-sm-6">
      <div class="input-group">
        <select name="" v-model="form.year" class="form-control" id="">
          <option
            :value="year"
            v-for="(year, index) in years"
            :key="index + 200"
            >{{ year }}</option
          >
        </select>
      </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6">
      <div class="input-group">
        <select name="" v-model="form.month" class="form-control" id="">
          <option
            :value="month"
            v-for="(month, index) in months"
            :key="index"
            >{{ month }}</option
          >
        </select>
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-sm-6">
      <div class="input-group">
        <select name="" v-model="form.status" class="form-control" id="">
          <option value="all">All</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
          <option value="Pending Payment">Pending Payment</option>
        </select>
      </div>
    </div>
    <div class="col-lg-1 col-md-4 col-sm-6">
      <Button
        :button_class="'btn btn-sm btn-primary btn-block'"
        :disabled="disabled"
        :button_type="'button'"
        :loading="loading"
        :value="'Filter'"
        @click.native="runFilter()"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      years: ["2021", "2022", "2023", "2024", "2025", "2026"],
      records: this.getRecords(),
    };
  },
  methods: {
    getForm() {
      return {
        status: "all",
        month: moment().format("MMMM"),
        year: moment().format("YYYY"),
      };
    },
    runFilter() {
      this.$store.commit("app/SET_DATA", null);
      this.$store.commit("app/SET_TYPE", "");
      this.$axios
        .get(`/payslips?page=${this.records.current_page}`, {
          params: this.form,
        })
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
  },
};
</script>
