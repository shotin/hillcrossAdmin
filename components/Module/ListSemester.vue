<template>
  <span v-if="type === 'semesters'">
    <table
      class="table table-hover table-vcenter text-nowrap table-striped mb-0"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Module Count</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="semester in semesters" :key="semester.id">
          <td>
            <div class="font-15">{{ semester.name }}</div>
          </td>
          <td>
            <strong>{{ semester.module_count }}</strong>
          </td>
          <td>
            <strong>{{ semester.date_created }}</strong>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-icon btn-sm"
              @click="openEdit(semester)"
              title="Edit"
            >
              <i class="fa fa-edit"></i>
            </button>
            <delete-item
              :want_block="true"
              :data="semester"
              :url="`/semesters/${semester.id}`"
              :storeItem="`app/REMOVE_DATA`"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <paginate
      :pagination="records"
      @paginate="semesters"
      :offset="4"
      :emitTo="`semester_paginate`"
      class="mb-1 ml-2"
      v-if="semesters.length"
    />
  </span>
  <loader v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
export default {
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
  },
  computed: {
    ...mapGetters({
      semesters: "app/pageData",
      type: "app/pageType",
      semester_data: "app/pageViewData",
    }),
  },
  watch: {
    semester_data: {
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
    this.$root.$on("semester_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getSemesters();
      }
    });
    this.getSemesters();
  },
  methods: {
    getSemesters() {
      this.$axios
        .get(`/semesters/auth?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "semesters");
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
    openEdit(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_VIEW_DATA", update);
    },
  },
};
</script>
