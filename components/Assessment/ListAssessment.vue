<template>
  <span>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search Teacher"
            v-model="form.search"
          />
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 mb-2">
        <div class="input-group">
          <multiselect
            v-model="selected_module"
            :options="moduleLists"
            track-by="type"
            label="name"
            required
            :multiple="false"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            placeholder="Select Module"
          >
          </multiselect>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
        <select name="" v-model="form.admin_status" class="form-control" id="">
          <option value="" disabled>Select Status</option>
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="End">End</option>
        </select>
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
        <span v-if="type === 'assessments'">
          <table
            class="table table-hover table-vcenter text-nowrap table-striped mb-0"
          >
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Module</th>
                <th>Assessment Type</th>
                <th>File Type</th>
                <th>Submission Date</th>
                <th>Additional Info</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="assessment in assessments" :key="assessment.id">
                <td>
                  <div class="font-15">{{ assessment.teacher }}</div>
                </td>
                <td>
                  <strong>{{ assessment.module }}</strong>
                </td>
                <td>
                  <strong>{{ assessment.assessment_type }}</strong>
                </td>
                <td>
                  <strong>{{ assessment.file_type }}</strong>
                </td>
                <td>
                  <strong>{{ assessment.submission_date }}</strong>
                </td>
                <td>
                  <small
                    class="text-muted"
                    v-if="assessment.assessment_type === 'cbt'"
                  >
                    Start Date : {{ assessment.assessment_details.start_date
                    }}<br />
                    End Date : {{ assessment.assessment_details.end_date
                    }}<br />
                    Start Time : {{ assessment.assessment_details.start_time
                    }}<br />
                    End Time : {{ assessment.assessment_details.end_time
                    }}<br />
                    Duration : {{ assessment.assessment_details.duration
                    }}<br />
                    Total Questions Expected :
                    {{ assessment.assessment_details.total_questions }}<br />
                    Total Questions Answerable :
                    {{ assessment.assessment_details.total_questions_answerable
                    }}<br />
                    Total Score Obtainable :
                    {{ assessment.assessment_details.total_score }}<br />
                  </small>
                  <small v-else></small>
                </td>
                <td>
                  <strong>{{ assessment.status }}</strong>
                </td>
                <td>
                  <strong>{{ assessment.creation_date }}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-icon btn-sm"
                    @click="openFile(assessment)"
                    title="Open File"
                  >
                    <i class="fa fa-play text-success"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-icon btn-sm"
                    @click="openDetails(assessment)"
                    title="Details"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                  <activate-item
                    v-if="assessment.status !== 'Approved'"
                    :want_block="false"
                    :data="assessment"
                    :url="
                      `/administrators/assessments/${assessment.id}/approval`
                    "
                    :storeItem="`app/UPDATE_DATA`"
                  />
                  <end-item
                    v-if="assessment.status === 'Approved'"
                    :want_block="false"
                    :data="assessment"
                    :url="`/administrators/assessments/${assessment.id}/end`"
                    :storeItem="`app/UPDATE_DATA`"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <paginate
            :pagination="records"
            @paginate="assessments"
            :offset="4"
            :emitTo="`assessment_paginate`"
            class="mb-1 ml-2"
            v-if="assessments.length"
          />
        </span>
        <loader v-else />
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
import ActivateItem from "@/components/ActivateItem.vue";
import EndItem from "@/components/EndItem.vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  data() {
    return {
      form: {
        search: "",
        admin_status: "",
        module: ""
      },
      selected_module: "",
      moduleLists: [],
      loading: false,
      disabled: false,
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
    ActivateItem,
    EndItem,
    Multiselect,
  },
  computed: {
    ...mapGetters({
      assessments: "app/pageData",
      type: "app/pageType",
      assessment_data: "app/pageViewData",
    }),
  },
  watch: {
    assessment_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("assessment-details");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.getModules();
    this.$root.$on("assessment_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getAssessments();
      }
    });
    this.getAssessments();
  },
  methods: {
    getModules() {
      this.$axios
        .get("/modules", {
          params: {
            fetch : "all"
          }
        })
        .then((res) => {
          this.moduleLists = res.data.data;
        })
        .catch((err) => {});
    },
    getAssessments() {
      this.$axios
        .get(`/administrators/assessments?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "assessments");
          this.records = res.data.meta;
        })
        .catch((err) => {});
    },
    runFilter() {
      this.loading = true;
      this.disabled = true;
      if (!this.form.search) {
        delete this.form.search;
      }
      if (!this.selected_module) {
        delete this.form.module;
      }
      if (!this.form.admin_status) {
        delete this.form.admin_status;
      }
      if(this.selected_module) {
        this.form.module = this.selected_module.id
      }
      this.$store.commit("app/SET_DATA", null);
      this.$store.commit("app/SET_TYPE", "");
      this.$axios
        .get(`/administrators/assessments`, {
          params: this.form,
        })
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "assessments");
          this.records = res.data.meta;
          this.loading = false;
          this.disabled = false;
        })
        .catch((err) => {
          this.loading = false;
          this.disabled = false;
        });
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
    openDetails(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_VIEW_DATA", update);
    },
    openFile(details) {
      window.open(details.file_url, "_blank");
    },
  },
};
</script>
