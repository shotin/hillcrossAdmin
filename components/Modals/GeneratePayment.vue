<template>
  <b-modal
    id="generate-payment"
    hide-footer
    size="lg"
    no-close-on-esc
    no-close-on-backdrop
    body-class="px-4"
    title="Generate Payment"
  >
    <div class="px-3">
      <form>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label>Pay date</label>
            <input type="date" v-model="form.payment_date" :min="min_date" :max="max_date" class="form-control">
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group">
            <label>Description</label>
            <textarea name="" class="form-control" id="" cols="30" v-model="form.description"></textarea>
          </div>
        </div>
        <div class="form-group text-right">
          <Button
            :button_class="'btn btn-primary'"
            :disabled="disabled"
            :button_type="'button'"
            :loading="loading"
            :value="'Store'"
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
export default {
  data() {
    return {
      disabled: false,
      loading: false,
      form: this.getForm(),
      min_date: moment().startOf('month').format('YYYY-MM-DD'),
      max_date: moment().endOf('month').format('YYYY-MM-DD'),
    };
  },
  methods: {
    closeModel() {
      this.$bvModal.hide("generate-payment");
    },
    getForm() {
      return {
        payment_date: moment().format('YYYY-MM-DD'),
        description: ""
      };
    },
    done() {
      this.loading = true;
      this.disabled = true;
      this.$axios
        .post(`/payslips`, this.form)
        .then((res) => {
          notify("Payment generated successfully", "success");
          this.$root.$emit("payslip_paginate", true);
          this.stopLoader();
          this.$bvModal.hide("generate-payment");
        })
        .catch((err) => {
          handleError(err);
          this.stopLoader();
        });
    },
    stopLoader() {
      this.loading = false;
      this.disabled = false;
    },
  },
};
</script>
