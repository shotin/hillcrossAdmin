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
      <div class="col-lg-4 col-md-4 col-sm-6 mb-2">
        <div class="input-group">
          <multiselect
            v-model="selected_academic_calender"
            :options="select.active_calenders"
            track-by="type"
            label="name"
            required
            :multiple="false"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            placeholder="Select Academic Calender"
          >
          </multiselect>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 mb-2">
        <select name="" v-model="form.status" class="form-control" id="">
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
        <span v-if="type === 'examinations'">
          <table
            class="table table-hover table-vcenter text-nowrap table-striped mb-0"
          >
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Module</th>
                <th>Academic Calendar</th>
                <th>Exam Date</th>
                <th>Exam Start Time</th>
                <th>Exam Duration</th>
                <th>Total Questions</th>
                <th>Answerable Questions</th>
                <th>Total Score</th>
                <th>Date Created</th>
                <th>Approval Status</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="examination in examinations" :key="examination.id">
                <td>
                  <div class="font-15">{{ examination.teacher }}</div>
                </td>
                <td>
                  <strong>{{ examination.module.name }}</strong>
                </td>
                <td>
                  <strong>{{ examination.academic_calender.name }}</strong>
                </td>
                <td>
                  <strong>{{ examination.exam_date }}</strong>
                </td>
                <td>
                  <strong>{{ examination.exam_start_time }}</strong>
                </td>
                <td>
                  <strong>{{ examination.exam_duration }}</strong>
                </td>
                <td>
                  <strong>{{ examination.total_questions }}</strong>
                </td>
                <td>
                  <strong>{{ examination.answerable_questions }}</strong>
                </td>
                <td>
                  <strong>{{ examination.total_score }}</strong>
                </td>
                <td>
                  <strong>{{ examination.date_created }}</strong>
                </td>
                <td>
                  <strong>{{ examination.admin_approval }}</strong>
                </td>
                <td>
                  <strong>{{ examination.status }}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-icon btn-sm"
                    @click="openDetails(examination)"
                    title="Details"
                  >
                    <i class="fa fa-eye"></i>
                  </button>
                  <activate-item
                    v-if="examination.admin_approval !== 'Approved'"
                    :want_block="false"
                    :data="examination"
                    :url="
                      `/administrators/examinations/${examination.id}/approval`
                    "
                    :storeItem="`app/UPDATE_DATA`"
                  />
                  <end-item
                    v-if="examination.admin_approval === 'Approved'"
                    :want_block="false"
                    :data="examination"
                    :url="`/administrators/examinations/${examination.id}/end`"
                    :storeItem="`app/UPDATE_DATA`"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <paginate
            :pagination="records"
            @paginate="examinations"
            :offset="4"
            :emitTo="`examination_paginate`"
            class="mb-1 ml-2"
            v-if="examinations.length"
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
        status: "",
        module: "",
        academic_calender: ""
      },
      selected_academic_calender: "",
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
      examinations: "app/pageData",
      type: "app/pageType",
      examination_data: "app/pageViewData",
      select: "select/select",
    }),
  },
  watch: {
    examination_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("examination-details");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.getModules();
    this.$root.$on("examination_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getExamination();
      }
    });
    this.getExamination();
  },
  methods: {
    getModules() {
      this.$axios
        .get("/modules", {
          params: {
            fetch: "all",
          },
        })
        .then((res) => {
          this.moduleLists = res.data.data;
        })
        .catch((err) => {});
    },
    getExamination() {
      this.$axios
        .get(`/administrators/examinations?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "examinations");
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
      if (!this.form.status) {
        delete this.form.status;
      }
      if (!this.selected_academic_calender) {
        delete this.form.academic_calender;
      }
      if (this.selected_module) {
        this.form.module = this.selected_module.id;
      }
      if (this.selected_academic_calender) {
        this.form.academic_calender = this.selected_academic_calender.id;
      }
      this.$store.commit("app/SET_DATA", null);
      this.$store.commit("app/SET_TYPE", "");
      this.$axios
        .get(`/administrators/examinations`, {
          params: this.form,
        })
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "examinations");
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
