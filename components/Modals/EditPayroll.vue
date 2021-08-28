<template>
  <b-modal
    id="edit-payroll"
    hide-footer
    size="lg"
    no-close-on-esc
    no-close-on-backdrop
    body-class="px-4"
    title="Update Payroll"
  >
    <div class="px-3">
      <form>
        <div class="col-md-12 col-sm-12">
          <p>Monthly Earnings Breakdown</p>
          <div class="form-group">
            <div
              class="row"
              v-for="(data, index) in form.breakdowns.earnings"
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
                  <label>Value</label>
                  <input
                    type="number"
                    required
                    v-model="data.value"
                    class="form-control"
                  />
                </div>
              </div>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                title="Add More"
                v-if="index + 1 === form.breakdowns.earnings.length"
                @click="addRow('earnings')"
              >
                <i class="fa fa-plus text-success"></i>
              </button>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                title="Remove"
                v-if="index > 0"
                @click="deleteRow('earnings', index)"
              >
                <i class="fa fa-minus text-danger"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-sm-12">
          <p>Monthly Deductions Breakdown</p>
          <div class="form-group">
            <div
              class="row"
              v-for="(data, index) in form.breakdowns.deductions"
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
                  <label>Value</label>
                  <input
                    type="number"
                    required
                    v-model="data.value"
                    class="form-control"
                  />
                </div>
              </div>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                title="Add More"
                v-if="index + 1 === form.breakdowns.deductions.length"
                @click="addRow('deductions')"
              >
                <i class="fa fa-plus text-success"></i>
              </button>
              <button
                type="button"
                class="btn btn-icon btn-sm"
                title="Remove"
                v-if="index > 0"
                @click="deleteRow('deductions', index)"
              >
                <i class="fa fa-minus text-danger"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="form-group text-right">
          <Button
            :button_class="'btn btn-primary'"
            :disabled="disabled"
            :button_type="'button'"
            :loading="loading"
            :value="'Update'"
            @click.native="done()"
          />
          <button type="button" @click="closeModel()" class="btn btn-danger">
            Close
          </button>
        </div>
      </form>
    </div>
  </b-modal>
</template>
<script>
import { notify, handleError } from "@/assets/js/utility";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  props: {
    payroll_data: {
      type: Object,
      required: true
    }
  },
  components: { Multiselect },
  data() {
    return {
      disabled: false,
      loading: false,
      form: this.getForm(),
      users: [],
    };
  },
  watch: {
    payroll_data: {
      handler(newVal, oldVal) {
        this.form.selectRole = newVal.role
        this.form.selectStaff = newVal.staff
        _.map(newVal.breakdowns.earnings, (value) => {
          this.form.breakdowns.earnings.push({
            title: value.title,
            value: value.value,
          });
        });
        _.map(newVal.breakdowns.deductions, (value) => {
          this.form.breakdowns.deductions.push({
            title: value.title,
            value: value.value,
          });
        });
        this.getUsers(newVal.role.id)
      }
    }
  },
  methods: {
    closeModel() {
      this.$bvModal.hide("edit-payroll");
    },
    getForm() {
      return {
        selectRole: "",
        selectStaff: [],
        breakdowns: {
          earnings: [],
          deductions: [],
        },
        role_id: "",
        staffs: [],
      };
    },
    addRow(type) {
      switch (type) {
        case "earnings":
          this.form.breakdowns.earnings.push({
            title: "",
            value: 0,
          });
          break;
        case "deductions":
          this.form.breakdowns.deductions.push({
            title: "",
            value: 0,
          });
          break;
        default:
          this.form.breakdowns.earnings.push({
            title: "",
            value: 0,
          });
          this.form.breakdowns.deductions.push({
            title: "",
            value: 0,
          });
          break;
      }
    },
    deleteRow: function(type, index) {
      switch (type) {
        case "earnings":
          this.form.breakdowns.earnings.splice(index, 1);
          break;
        case "deductions":
          this.form.breakdowns.deductions.splice(index, 1);
          break;
        default:
          break;
      }
    },
    done() {
      this.loading = true;
      this.disabled = true;
      this.form.role_id = this.form.selectRole.id;
      this.$axios
        .patch(`/payrolls/${this.payroll_data.id}`, this.form)
        .then((res) => {
          notify("Payroll updated successfully", "success");
          this.$store.commit("app/UPDATE_DATA", res.data.data);
          this.stopLoader();
          this.$bvModal.hide("edit-payroll");
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    getUsers(role) {
      this.$axios
        .get(`/administrators/roles/${role}`)
        .then((res) => {
          this.users = res.data.data;
        })
        .catch((err) => {});
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
  },
};
</script>
