<template>
  <div class="row clearfix">
    <div class="col-xl-12">
      <div class="card" v-if="loaded">
        <div class="card-header">
          <h3 class="card-title">Student Inflow Report</h3>
        </div>
        <div class="card-body">
          <div class="d-sm-flex justify-content-between">
            <div class="font-12 mb-2"></div>
            <div class="selectgroup w250">
              <label class="selectgroup-item mr-2">
                <select v-model="year" class="form-control">
                  <option
                    :value="selectYear"
                    v-for="selectYear in years"
                    :key="selectYear"
                    >{{ selectYear }}</option
                  >
                </select>
              </label>
              <Button
                :button_class="'btn btn-sm btn-danger'"
                :disabled="disabled"
                :button_type="'button'"
                :loading="loading"
                :value="'Filter'"
                @click.native="runFilter()"
                style="height: fit-content;"
              />
            </div>
          </div>
          <bar-chart v-if="loaded" :chartdata="chartdata" :options="options" />
        </div>
      </div>
      <loader v-else />
    </div>
  </div>
</template>
<script>
import BarChart from "../Chart/BarChart.vue";
import Loader from "../Loader.vue";
export default {
  components: { BarChart },
  data() {
    return {
      reports: null,
      loaded: false,
      disabled: false,
      loading: false,
      year: moment().format("YYYY"),
      years: [
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
      ],
      chartdata: {
        labels: [
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
        datasets: [
          {
            label: "Number of Students",
            backgroundColor: "#f87979",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },
  component: {
    Loader,
  },
  mounted() {
    this.getStudentInflow();
  },
  methods: {
    getStudentInflow() {
      this.$axios
        .get("/admin/dashboard/students-inflow")
        .then((res) => {
          this.loaded = true;
          this.chartdata.datasets[0].data = res.data.data;
        })
        .catch((err) => {
          this.loaded = true;
        });
    },
    runFilter() {
      this.loaded = false;
      this.loading = true;
      this.disabled = true;
      this.$axios
        .get("/admin/dashboard/students-inflow", {
          params: {
            year: this.year,
          },
        })
        .then((res) => {
          this.loaded = true;
          this.loading = false;
          this.disabled = false;
          this.chartdata.datasets[0].data = res.data.data;
        })
        .catch((err) => {
          this.loaded = true;
          this.loading = false;
          this.disabled = false;
        });
    },
  },
};
</script>
