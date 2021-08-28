<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Leave Management</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Leave Management
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
                <list-leave />
              </div>
            </div>
          </div>
          <div class="tab-pane" :class="[add ? 'active' : '']" id="pro-add">
            <manage-leave
              :reviewers="reviewers"
              :leaveReasons="select.leave_reasons"
            />
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import ListLeave from "../../components/Leave/ListLeave.vue";
import ManageLeave from "../../components/Leave/ManageLeave.vue";
export default {
  components: { ListLeave, ManageLeave },
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
  mounted() {
    let self = this;
    self.$root.$on("edit-leave", function(val) {
      self.add = true;
      (self.list = false), (self.addText = "Edit");
    });
    self.getReviewers()
  },
  data() {
    return {
      add: false,
      list: true,
      addText: "Add",
      permissions: [],
      reviewers: [],
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
    getReviewers() {
      this.$axios
        .get("/leaves/reviewers/lists")
        .then((res) => {
          this.reviewers = res.data.data;
        })
        .catch((err) => {});
    },
  },
};
</script>
