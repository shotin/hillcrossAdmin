<template>
  <table
    class="table table-hover table-vcenter text-nowrap table-striped mb-0"
    v-if="type === 'non_academic_staffs'"
  >
    <thead>
      <tr>
        <th>Avatar</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Role</th>
        <th>Date Created</th>
        <th>Status</th>
        <th>Mode</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="staff in academic_staff" :key="staff.id">
        <td class="w60" v-if="staff.profile.avatar">
          <img
            class="avatar"
            :src="staff.profile.avatar"
            :alt="staff.first_name"
          />
        </td>
        <td class="w60" v-else>
          <div
            class="avatar avatar-pink"
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title="Avatar Name"
          >
            <span>{{ staff.avatar_alternative }}</span>
          </div>
        </td>
        <td>
          <div class="font-15">{{ staff.name }}</div>
        </td>
        <td>
          <span>{{ staff.email }}</span>
        </td>
        <td>
          <span>{{ staff.phone_number }}</span>
        </td>
        <td>
          {{ staff.role }}
        </td>
        <td>
          <strong>{{ staff.date_created }}</strong>
        </td>
        <td>
          <span class="tag tag-success">{{ staff.status_word }}</span>
        </td>
        <td>
          <span class="tag tag-success">{{ staff.mode }}</span>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-icon btn-sm"
            @click="openShow(staff)"
            title="View"
          >
            <i class="fa fa-eye"></i>
          </button>
          <button
            type="button"
            class="btn btn-icon btn-sm"
            @click="openEdit(staff)"
            title="Edit"
          >
            <i class="fa fa-edit"></i>
          </button>
          <delete-item
            :want_block="true"
            :data="staff"
            :url="`/administrators/${staff.id}`"
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
      academic_staff: "app/pageData",
      type: "app/pageType",
      staff_data: "app/pageViewData",
      teacher_show_data: "app/pageShowData",
    }),
  },
  watch: {
    staff_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("edit-teacher");
        }
      },
      immediate: true,
      deep: true,
    },
    teacher_show_data: {
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal.timestamp !== oldVal.timestamp) {
          this.$root.$emit("show-teacher");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    let self = this;
    this.$root.$on("non_academic_staff_paginate", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getNonAcademicStaff();
      }
    });
    this.getNonAcademicStaff();
  },
  methods: {
    getNonAcademicStaff() {
      this.$axios
        .get(`/administrators/non-academics?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "non_academic_staffs");
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
    openShow(data) {
      const time = new Date();
      const update = { ...data, timestamp: time.getTime() };
      this.$store.commit("app/SET_SHOW_DATA", update);
    },
  },
};
</script>
