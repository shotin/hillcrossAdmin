<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Assessment</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Assessment
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
            <li class="nav-item" v-if="add">
              <a
                class="nav-link"
                :class="[add ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('add')"
                href="#pro-add"
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
            <list-assessment v-if="list"/>
          </div>
          <div class="tab-pane" v-if="add" :class="[add ? 'active' : '']" id="pro-add">
            <manage-assessment v-if="add"/>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import ListAssessment from '../../components/Assessment/ListAssessment.vue';
import ManageAssessment from '../../components/Assessment/ManageAssessment.vue';

export default {
  components: {ListAssessment, ManageAssessment },
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
  mounted() {
    let self = this;
    self.$root.$on("assessment-details", function(val) {
      self.switchTab('add')
    });
  },
  data() {
    return {
      add: false,
      list: true,
      addText: "Manage",
      roles: [],
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
    }
  },
};
</script>
