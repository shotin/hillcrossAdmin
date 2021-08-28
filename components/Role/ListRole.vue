<template>
  <table
    class="table table-hover table-vcenter text-nowrap table-striped mb-0"
    v-if="type === 'roles'"
  >
    <thead>
      <tr>
        <th>Role</th>
        <th>Permissions Count</th>
        <th>Users Count</th>
        <th>Date Created</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="role in roles" :key="role.id">
        <td>
          <div class="font-15">{{ role.name }}</div>
        </td>
        <td>
          <strong>{{ role.permissions_count }}</strong>
        </td>
        <td>
          <strong>{{ role.user_count }}</strong>
        </td>
        <td>
          <strong>{{ role.date_created }}</strong>
        </td>
        <td>
          <button type="button" class="btn btn-icon btn-sm" title="View">
            <i class="fa fa-eye"></i>
          </button>
          <button
            type="button"
            class="btn btn-icon btn-sm"
            @click="openEdit(role)"
            title="Edit"
          >
            <i class="fa fa-edit"></i>
          </button>
          <delete-item
            :want_block="true"
            :data="role"
            :url="`/roles/${role.id}`"
            :storeItem="`app/REMOVE_DATA`"
          />
        </td>
      </tr>
    </tbody>
  </table>
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
      roles: "app/pageData",
      type: "app/pageType",
      role_data: "app/pageViewData",
    }),
  },
  watch: {
    role_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("edit-role");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("role_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getRoles();
      }
    });
    this.getRoles();
  },
  methods: {
    getRoles() {
      this.$axios
        .get(`/roles?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "roles");
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
