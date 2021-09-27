<template>
  <div class="row clearfix">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Quote Information</h3>
        </div>
        <form @submit.prevent="processIncome()">
          <div class="card-body">
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Student Name</label>
                  <input
                    type="text"
                    required
                    v-model="form.student_name"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Student ID</label>
                  <input
                    type="text"
                    required
                    v-model="form.student_id"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>SAQA ID</label>
                  <input
                    type="text"
                    required
                    v-model="form.saqa_id"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Study Mode</label>
                  <multiselect
                    v-model="form.study_mode"
                    :options="['Online', 'In class']"
                    required
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Select Study Mode"
                  >
                  </multiselect>
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Title of Quote</label>
                  <input
                    type="text"
                    required
                    v-model="form.title"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    required
                    v-model="form.amount"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>School</label>
                  <multiselect
                    v-model="form.school"
                    :options="select.schools"
                    track-by="id"
                    label="name"
                    required
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Select School"
                  >
                  </multiselect>
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Qualification</label>
                  <multiselect
                    v-model="form.qualification"
                    :options="selectQualifications"
                    track-by="id"
                    label="name"
                    required
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Select Qualification"
                  >
                  </multiselect>
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col-md-4 col-sm-12">
                <div class="form-group">
                  <label>Academic Calender</label>
                  <multiselect
                    v-model="form.academic_calender"
                    :options="select.active_calenders"
                    track-by="id"
                    label="name"
                    required
                    :multiple="false"
                    :searchable="true"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Select Calender"
                  >
                  </multiselect>
                </div>
              </div>
            </div>
            <hr />
            <h5>Breakdowns</h5>
            <div class="form-group">
              <div
                class="row"
                v-for="(data, index) in form.breakdowns"
                :key="index"
              >
                <div class="col-md-4 col-sm-12">
                  <div class="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      required
                      v-model="data.title"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-3 col-sm-12">
                  <div class="form-group">
                    <label>Amount</label>
                    <input
                      type="number"
                      required
                      v-model="data.amount"
                      class="form-control"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-icon btn-sm"
                  title="Add More"
                  v-if="index + 1 === form.breakdowns.length"
                  @click="addRow()"
                >
                  <i class="fa fa-plus text-success"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-icon btn-sm"
                  title="Remove"
                  v-if="index > 0"
                  @click="deleteRow(index)"
                >
                  <i class="fa fa-minus text-danger"></i>
                </button>
              </div>
            </div>
            <div class="col-sm-12">
              <Button
                :button_class="'btn btn-primary'"
                :disabled="disabled"
                :button_type="'submit'"
                :loading="loading"
                :value="buttonName"
              />
              <Button
                :button_class="'btn btn-outline-secondary'"
                :disabled="disabled"
                :button_type="'button'"
                :loading="loading"
                :value="'Cancel'"
                @click.native="cancelForm()"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import { notify, handleError } from "@/assets/js/utility";

export default {
  computed: {
    ...mapGetters({
      account_data: "app/pageViewData",
      clone_account_data: "app/pageCloneData",
      select: "select/select",
    }),
  },
  data() {
    return {
      form: this.getForm(),
      loading: false,
      disabled: false,
      loadingCancel: false,
      disabledCancel: false,
      records: this.getRecords(),
      buttonName: "Submit",
      selectQualifications: [],
      isUpdate: false,
      isClone: false,
    };
  },
  mounted() {
    let self = this;
    self.$root.$on("edit-account", function(val) {
      console.log("Hello update");
      self.isUpdate = true;
      self.buttonName = "Update";
    });

    self.$root.$on("clone-account", function(val) {
      console.log("Hello clone");
      self.buttonName = "Clone";
      self.isClone = true;
    });

    if (!self.form.breakdowns.length) {
      self.addRow();
    }
  },
  components: {
    Multiselect,
  },
  watch: {
    account_data(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.form.student_name = newVal.student_name;
        this.form.student_id = newVal.student_id;
        this.form.saqa_id = newVal.saqa_id;
        this.form.study_mode = newVal.study_mode;
        this.form.title = newVal.title;
        this.form.amount = newVal.amount;
        this.form.academic_calender = newVal.calender;
        this.form.qualification = newVal.qualification;
        this.form.school = newVal.school;
        _.map(newVal.breakdowns, (value) => {
          this.form.breakdowns.push({
            title: value.title,
            amount: value.amount,
          });
        });
      }
    },
    clone_account_data(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.form.title = newVal.title;
        this.form.amount = newVal.amount;
        this.form.academic_calender = newVal.calender;
        this.form.qualification = newVal.qualification;
        this.form.school = newVal.school;
        _.map(newVal.breakdowns, (value) => {
          this.form.breakdowns.push({
            title: value.title,
            amount: value.amount,
          });
        });
      }
    },
    "form.school": {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.getQualification(newVal);
        }
      },
    },
  },
  methods: {
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
    addRow() {
      this.form.breakdowns.push({
        title: "",
        amount: "",
      });
    },
    deleteRow: function(index) {
      this.form.breakdowns.splice(index, 1);
    },
    getForm() {
      return {
        title: "",
        amount: "",
        qualification: "",
        academic_calender: "",
        breakdowns: [],
      };
    },
    processIncome() {
      this.loading = true;
      this.disabled = true;
      let sumBreakdown = _.sumBy(this.form.breakdowns, function(o) {
        return parseInt(o.amount);
      });
      if (sumBreakdown > parseInt(this.form.amount)) {
        notify("Amount breakdown cannot be more than the bill amount");
        this.stopLoader();
        return;
      }
      this.form.qualification = this.form.qualification.id;
      this.form.academic_calender = this.form.academic_calender.id;
      if (this.isUpdate) {
        this.updateRequest(this.form);
      } else {
        this.storeRequest(this.form);
      }
    },
    getQualification(school) {
      if (school && school.id) {
        this.selectQualifications = _.filter(this.select.qualifications, {
          school_id: school.id,
        });
      }
    },
    async storeRequest(form) {
      await this.$axios
        .post("/quotes", form)
        .then((res) => {
          notify("Quote created successfully", "success");
          this.stopLoader();
          this.form = this.getForm();
          this.form.qualifications = [];
          this.$root.$emit("quotes", true);
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    async updateRequest(form) {
      await this.$axios
        .patch(`/quotes/${this.quote_data.id}`, form)
        .then((res) => {
          notify("Quote updated successfully", "success");
          this.stopLoader();
          this.$store.commit("app/UPDATE_DATA", res.data.data);
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    async cloneRequest(form) {
      //   await this.$axios
      //     .patch(`/accounts/expenses/${this.income_data.id}`, form)
      //     .then((res) => {
      //       notify("Expense updated successfully", "success");
      //       this.stopLoader();
      //       this.$store.commit("app/UPDATE_DATA", res.data.data);
      //     })
      //     .catch((err) => {
      //       handleError(err);
      //       this.stopLoader();
      //     });
    },
    cancelForm() {
      if (!this.loading && !this.disabled) {
        this.form = this.getForm();
      }
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
