<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Role/User Management</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Role/User Management
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
            <div class="card">
              <div class="table-responsive">
                <list-role />
              </div>
            </div>
          </div>
          <div class="tab-pane" :class="[add ? 'active' : '']" id="pro-add">
            <manage-role :permissions="permissions" />
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import ListRole from "../components/Role/ListRole.vue";
import ManageRole from "../components/Role/ManageRole.vue";
export default {
  components: { ListRole, ManageRole },
  mounted() {
    let self = this;
    self.$root.$on("edit-role", function(val) {
      self.add = true;
      (self.list = false), (self.addText = "Edit");
    });
    self.getPermissions();
  },
  data() {
    return {
      add: false,
      list: true,
      addText: "Add",
      permissions: [],
    };
  },
  methods: {
    switchTab(key) {
      switch (key) {
        case "list":
          this.list = true;
          this.add = false;
          break;
        case "add":
          this.list = false;
          this.add = true;
          break;
        default:
          break;
      }
    },
    getPermissions() {
      this.$axios
        .get("/permissions")
        .then((res) => {
          this.permissions = res.data.data;
        })
        .catch((err) => {});
    },
  },
};
</script>
