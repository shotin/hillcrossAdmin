<template>
  <span v-if="type === 'archived_staff'">
    <table
      class="table table-hover table-vcenter text-nowrap table-striped mb-0"
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
        <tr v-for="staff in archived_staff" :key="staff.id">
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
            <activate-item
              :want_block="true"
              :data="staff"
              :url="`/staff/archived/${staff.id}/activate`"
              :storeItem="`app/REMOVE_DATA`"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <paginate
      :pagination="records"
      @paginate="archived_staff"
      :offset="4"
      :emitTo="`archived_pagination`"
      class="mb-1 ml-2"
      v-if="archived_staff.length"
    />
  </span>
  <loader v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ActivateItem from "../ActivateItem.vue";
import Loader from "../Loader.vue";
export default {
  data() {
    return {
      records: this.getRecords(),
    };
  },
  components: {
    Loader,
    ActivateItem,
  },
  computed: {
    ...mapGetters({
      archived_staff: "app/pageData",
      type: "app/pageType",
    }),
  },
  mounted() {
    let self = this;
    this.$root.$on("archived_pagination", function(filter) {
      if (filter) {
        self.records.current_page = filter.current_page;
        self.$store.commit("app/SET_DATA", null);
        self.$store.commit("app/SET_TYPE", null);
        self.getArchivedStaff();
      }
    });
    this.getArchivedStaff();
  },
  methods: {
    getArchivedStaff() {
      this.$axios
        .get(`/staff/archived?page=${this.records.current_page}`)
        .then((res) => {
          this.$store.commit("app/SET_DATA", res.data.data);
          this.$store.commit("app/SET_TYPE", "archived_staff");
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
  },
};
</script>
