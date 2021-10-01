<template>
  <span>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search Anything"
            v-model="form.search"
          />
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
        <div class="form-inline">
          <label for="" class="mr-2">From: </label>
          <input
            type="date"
            v-model="form.start_date"
            class="form-control"
            placeholder="Start date"
          />
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
        <div class="form-inline">
          <label for="" class="mr-2">To: </label>
          <input
            type="date"
            v-model="form.end_date"
            class="form-control"
            placeholder="End date"
          />
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
    <div class="card">
      <div class="table-responsive">
        <span v-if="type === 'logs'">
          <table class="table table-hover table-vcenter table-striped mb-0">
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
          <hr />
          <paginate
            :pagination="records"
            @paginate="logs"
            :offset="4"
            :emitTo="`log_paginate`"
            class="mb-1 ml-2"
            v-if="logs.length"
          />
        </span>
        <loader v-else />
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "@/components/Loader.vue";
import DeleteItem from "@/components/Delete";
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      form: {
        search: "",
        start_date: "",
        end_date: "",
      },
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
    runFilter() {
      this.disabled = true;
      this.loading = true;
      this.$store.commit("app/SET_DATA", null);
      this.$store.commit("app/SET_TYPE", null);
      if (!this.form.start_date) {
        delete this.form.start_date;
      }
      if (!this.form.end_date) {
        delete this.form.end_date;
      }
      if (!this.form.search) {
        delete this.form.search;
      }
      this.$axios
        .get(`/activity-logs`, {
          params: this.form,
        })
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "logs");
          this.records = res.data.meta;
          this.loading = false;
          this.disabled = false;
        })
        .catch((err) => {
          this.loading = false;
          this.disabled = false;
        });
    },
  },
};
</script>
