<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Incomes</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Incomes
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
                >{{incomeText}}</a
              >
            </li>
            <li class="nav-item" v-if="manage">
              <a
                class="nav-link"
                :class="[manage ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('manage')"
                href="#pro-details"
                >Manage</a
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
            <list-income
              v-if="list"
              :status="`All`"
              :pageType="`accounts`"
              :emitTo="`accounts`"
              :emitDetailsTo="`income_details`"
              :show="true"
              :edit="true"
            />
          </div>
          <div
            class="tab-pane"
            v-if="add"
            :class="[add ? 'active' : '']"
            id="pro-add"
          >
            <div class="card">
              <div class="table-responsive">
                <manage-income v-if="add"/>
              </div>
            </div>
          </div>
          <div
            class="tab-pane"
            v-if="manage"
            :class="[manage ? 'active' : '']"
            id="pro-details"
          >
            <div class="card">
              <div class="table-responsive"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import ListIncome from "../../components/Account/ListIncome.vue";
import ManageIncome from "../../components/Account/ManageIncome.vue";

export default {
  components: { ListIncome, ManageIncome },
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
  mounted() {
    let self = this;
    self.$root.$on("income_details", function(val) {
      self.switchTab("manage");
    });
    self.$root.$on("edit-account", function(val) {
      self.incomeText = "Edit Income";
      self.switchTab("add");
    });
    self.$root.$on("clone-account", function(val) {
      self.incomeText = "Clone Income";
      self.switchTab("add");
    });
  },
  data() {
    return {
      add: false,
      list: true,
      manage: false,
      addText: "Manage",
      incomeText: "New income",
      roles: [],
    };
  },
  methods: {
    switchTab(key) {
      switch (key) {
        case "list":
          this.list = true;
          this.add = false;
          this.manage = false;
          break;
        case "add":
          this.list = false;
          this.add = true;
          this.manage = false;
          break;
        case "manage":
          this.list = false;
          this.add = false;
          this.manage = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>
