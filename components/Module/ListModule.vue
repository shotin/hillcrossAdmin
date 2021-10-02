<template>
  <span>
    <div class="row mb-3">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search Modules"
            v-model="form.search"
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
        <span v-if="type === 'modules'">
          <table
            class="table table-hover table-vcenter text-nowrap table-striped mb-0"
          >
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Semester</th>
                <th>Qualifications</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="module in modules" :key="module.id">
                <td class="w60" v-if="module.logo">
                  <img class="avatar" :src="module.logo" :alt="module.name" />
                </td>
                <td>
                  <div class="font-15">{{ module.name }}</div>
                </td>
                <td>
                  <strong>{{
                    module.default_semester ? module.semester.name : ""
                  }}</strong>
                </td>
                <td>
                  <strong>{{ module.qualifications }}</strong>
                </td>
                <td>
                  <strong>{{ module.date_created }}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-icon btn-sm"
                    @click="openEdit(module)"
                    title="Edit"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                  <delete-item
                    :want_block="true"
                    :data="module"
                    :url="`/modules/${module.id}`"
                    :storeItem="`app/REMOVE_DATA`"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <paginate
            :pagination="records"
            @paginate="modules"
            :offset="4"
            :emitTo="`module_paginate`"
            class="mb-1 ml-2"
            v-if="modules.length"
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
export default {
  data() {
    return {
      disabled: false,
      loading: false,
      form: {
        search: "",
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
      modules: "app/pageData",
      type: "app/pageType",
      module_data: "app/pageViewData",
    }),
  },
  watch: {
    module_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          //   this.$root.$emit("edit-role");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("module_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getModules();
      }
    });
    this.getModules();
  },
  methods: {
    getModules() {
      this.$axios
        .get(`/modules/auth?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "modules");
          this.records = res.data.meta;
        })
        .catch((err) => {});
    },
    runFilter() {
      this.loading = true;
      this.disabled = true;
      this.$store.commit("app/SET_DATA", null);
      this.$store.commit("app/SET_TYPE", "");
      if(!this.form.search) {
        delete this.form.search
      }
      this.$axios
        .get(`/modules/auth?page=${this.records.current_page}`, {
          params: this.form,
        })
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "modules");
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
    openEdit(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_VIEW_DATA", update);
    },
  },
};
</script>
