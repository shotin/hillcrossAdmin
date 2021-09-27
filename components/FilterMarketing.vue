<template>
  <div class="row">
    <div class="col-lg-4 col-md-4 col-sm-6">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="search description"
          v-model="form.description"
        />
      </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6 mb-2">
      <div class="input-group">
        <multiselect
          v-model="form.file_type"
          :options="fileTypes"
          track-by="type"
          label="name"
          required
          :multiple="false"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select File Type"
        >
        </multiselect>
      </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6 mb-2">
      <div class="input-group">
        <multiselect
          v-model="form.year"
          :options="years"
          required
          :multiple="false"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select Year"
        >
        </multiselect>
      </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6 mb-2">
      <div class="input-group">
        <multiselect
          v-model="form.province"
          :options="provinces"
          required
          :multiple="true"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Select Province"
        >
        </multiselect>
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
      <div class="form-inline">
        <label for="" class="mr-2">From: </label>
        <input type="date" class="form-control" placeholder="Start date" />
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
      <div class="form-inline">
        <label for="" class="mr-2">To: </label>
        <input type="date" class="form-control" placeholder="End date" />
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
      provinces: [
        "Eastern Cape",
        "Free State",
        "Gauteng",
        "KwaZulu-Natal",
        "Limpopo",
        "Mpumalanga",
        "Northern Cape",
        "North West",
        "Western Cape",
      ],
      fileTypes: [
        {
          type: "docx",
          name: "Microsoft Word Document",
        },
        {
          type: "xlss",
          name: "Microsoft Excel Document",
        },
        {
          type: "pdf",
          name: "PDF Document",
        },
        {
          type: "img",
          name: "Image File",
        },
      ],
      years: ["2021", "2022", "2023", "2024", "2025"],
    };
  },
  methods: {
    getForm() {
      return {
        description: "",
        file_type: "",
        year: "",
        province: "",
        start_date: "",
        end_date: "",
      };
    },
    runFilter() {
      this.$store.commit("app/SET_DATA", null);
      this.$store.commit("app/SET_TYPE", "");
      if (!this.form.description) {
        delete this.form.description;
      }
      if (!this.form.file_type) {
        delete this.form.file_type;
      }
      if (!this.form.year) {
        delete this.form.year;
      }
      if (!this.form.province) {
        delete this.form.province;
      }
      if (!this.form.start_date) {
        delete this.form.start_date;
      }
      if (!this.form.end_date) {
        delete this.form.end_date;
      }
      this.$axios
        .get(`/marketing/databases?page=${this.records.current_page}`, {
          params: this.form,
        })
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", 'databases');
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
