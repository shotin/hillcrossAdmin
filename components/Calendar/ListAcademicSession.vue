<template>
  <span>
    <button
      class="btn btn-success mt-2 mr-2 mb-3 float-right"
      @click="openAddModal()"
      type="button"
    >
      Add New Session
    </button>
    <table
      class="table table-hover table-vcenter text-nowrap table-striped mb-0"
      v-if="type === 'academic_sessions'"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="session in academic_sessions" :key="session.id">
          <td>
            <div class="font-15">{{ session.name }}</div>
          </td>
          <td>
            <span>{{ session.start_date }}</span>
          </td>
          <td>
            <span>{{ session.end_date }}</span>
          </td>
          <td>
            {{ session.status }}
          </td>
          <td>
            <strong>{{ session.date_created }}</strong>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-icon btn-sm"
              @click="openEdit(session)"
              title="Edit"
            >
              <i class="fa fa-edit"></i>
            </button>
            <activate-item
              v-if="session.status !== 'Active'"
              :want_block="false"
              :data="session"
              :url="
                `/academic-sessions/${session.id}/activate`
              "
              :storeItem="`app/UPDATE_DATA`"
            />
            <end-item
              v-if="session.status === 'Active'"
              :want_block="false"
              :data="session"
              :url="
                `/academic-sessions/${session.id}/end`
              "
              :storeItem="`app/UPDATE_DATA`"
            />
            <delete-item
              :want_block="true"
              :data="session"
              :url="`/academic-sessions/${session.id}`"
              :storeItem="`app/REMOVE_DATA`"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <loader v-else />
    <add-academic-session-modal style="display: none;" />
    <edit-academic-session
      :academic_session_data="academic_session_data"
      style="display: none;"
    />
  </span>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../Loader.vue";
import DeleteItem from "@/components/Delete";
import AddAcademicSessionModal from "../Modals/AddAcademicSessionModal.vue";
import EditAcademicSession from "../Modals/EditAcademicSession.vue";
export default {
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    DeleteItem,
    AddAcademicSessionModal,
    EditAcademicSession,
  },
  computed: {
    ...mapGetters({
      academic_sessions: "app/pageData",
      type: "app/pageType",
      academic_session_data: "app/pageViewData",
    }),
  },
  watch: {
    academic_session_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$bvModal.show("edit-academic-session");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("academic_session_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getAcademicSession();
      }
    });
    this.getAcademicSession();
  },
  methods: {
    getAcademicSession() {
      this.$axios
        .get(`/academic-sessions?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "academic_sessions");
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
    openAddModal() {
      this.$bvModal.show("add-academic-session");
    },
  },
};
</script>
