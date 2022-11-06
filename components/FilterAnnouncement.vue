<template>
  <div class="row">
    <div class="col-lg-4 col-md-4 col-sm-6 mb-2">
      <div class="input-group">
        <multiselect
          v-model="form.type"
          :options="types"
          track-by="type"
          label="name"
          required
          :multiple="false"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select Type"
        >
        </multiselect>
      </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6 mb-2">
      <div class="input-group">
        <multiselect
          v-model="form.status"
          :options="status"
          track-by="type"
          label="name"
          required
          :multiple="false"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select Status"
        >
        </multiselect>
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
import { mapGetters } from "vuex";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      records: this.getRecords(),
      types: [
        {
          type: "Upcoming events",
          name: "Upcoming Events",
        },
        {
          type: "Announcements",
          name: "Announcements",
        },
        {
          type: "Emergency notifications",
          name: "Emergency Notifications",
        },
        {
          type: "Updates",
          name: "Updates",
        },
      ],
      status: [
        {
          type: "all",
          name: "All",
        },
        {
          type: "Active",
          name: "Active",
        },
        {
          type: "Closed",
          name: "Closed",
        }
      ],
    };
  },
  methods: {
    getForm() {
      return {
        type: "",
        status: "",
        start_date: "",
        end_date: "",
      };
    },
    runFilter() {
      this.$store.commit("app/SET_DATA", null);
      this.$store.commit("app/SET_TYPE", "");
      if (!this.form.type) {
        delete this.form.type;
      }
      if (!this.form.status) {
        delete this.form.status;
      }
      if (!this.form.start_date) {
        delete this.form.start_date;
      }
      if (!this.form.end_date) {
        delete this.form.end_date;
      }
      this.$axios
        .get(`/announcements?page=${this.records.current_page}`, {
          params: this.form,
        })
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "announcements");
          this.$root.$emit("update_pagination", res.data.meta);
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
