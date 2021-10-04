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
                >{{ incomeText }}</a
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
            <list-quote
              v-if="list"
              :status="`All`"
              :pageType="`quotes`"
              :emitTo="`quotes`"
              :emitDetailsTo="`quote-details`"
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
                <manage-quote v-if="add"/>
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
import ListQuote from "../../components/Quote/ListQuote.vue";
import ManageQuote from "../../components/Quote/ManageQuote.vue";

export default {
  components: { ListQuote, ManageQuote },
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
  mounted() {
    let self = this;
    self.$root.$on("quote-details", function(val) {
      self.switchTab("manage");
    });
  },
  data() {
    return {
      add: false,
      list: true,
      manage: false,
      addText: "Manage",
      incomeText: "New Quote",
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
