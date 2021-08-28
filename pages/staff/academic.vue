<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Academic Staff</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Academic Staff
              </li>
            </ol>
          </div>
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="[list ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('list')"
                href="#pro-all"
                >List View</a
              >
            </li>
            <li class="nav-item" v-if="profile">
              <a
                class="nav-link"
                :class="[profile ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('profile')"
                href="#pro-profile"
                >Details</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="[add ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('add')"
                href="#pro-add"
                >{{ addText }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section-body mt-4">
      <div class="container-fluid">
        <div class="tab-content">
          <div class="tab-pane" :class="[list ? 'active' : '']" id="pro-all">
            <div class="table-responsive">
              <list-staff />
            </div>
          </div>
          <div
            v-if="profile"
            class="tab-pane"
            :class="[profile ? 'active' : '']"
            id="pro-profile"
          >
            <staff-profile v-if="profile" />
          </div>
          <div class="tab-pane" :class="[add ? 'active' : '']" id="pro-add">
            <manage-staff
              :qualifications="select.qualifications"
              :levels="select.levels"
            />
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import ManageStaff from "../../components/Staff/ManageStaff.vue";
import ListStaff from "../../components/Staff/ListStaff.vue";
import StaffProfile from "../../components/Staff/StaffProfile.vue";
export default {
  components: { ManageStaff, ListStaff, StaffProfile },
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
  mounted() {
    let self = this;
    self.$root.$on("edit-teacher", function(val) {
      self.add = true;
      (self.list = false), (self.addText = "Edit");
    });
    self.$root.$on("show-teacher", function(val) {
      self.list = false;
      self.add = false;
      self.profile = true;
    });
  },
  data() {
    return {
      add: false,
      list: true,
      profile: false,
      addText: "Add",
    };
  },
  methods: {
    switchTab(key) {
      switch (key) {
        case "list":
          this.list = true;
          this.add = false;
          this.profile = false;
          break;
        case "profile":
          this.list = false;
          this.add = false;
          this.profile = true;
          break;
        case "add":
          this.list = false;
          this.add = true;
          this.profile = false;
          break;
        default:
          this.list = true;
          this.add = false;
          this.profile = false;
          break;
      }
    },
  },
};
</script>
