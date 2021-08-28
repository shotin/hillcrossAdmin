<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Module Management</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Module Management
              </li>
            </ol>
          </div>
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="[listSemesters ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('listSemesters')"
                href="#payroll-config"
                >Semester</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="[listStandards ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('listStandards')"
                href="#payroll"
                >Standanrds</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="[listModules ? 'active' : '']"
                data-toggle="tab"
                @click.prevent="switchTab('listModules')"
                href="#payslips"
                >Modules</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section-body mt-4">
      <div class="container-fluid">
        <div class="tab-content">
          <div
            class="tab-pane"
            :class="[listSemesters ? 'active' : '']"
            id="payroll-config"
          >
            <div class="card">
              <div class="table-responsive">
                <list-semester v-if="listSemesters" />
              </div>
            </div>
          </div>
          <div
            class="tab-pane"
            :class="[listStandards ? 'active' : '']"
            id="payroll"
          >
            <list-standard v-if="listStandards" />
          </div>
          <div
            class="tab-pane"
            :class="[listModules ? 'active' : '']"
            id="payslips"
          >
            <list-module v-if="listModules"/>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import ListModule from '../../components/Module/ListModule.vue';
import ListSemester from "../../components/Module/ListSemester.vue";
import ListStandard from "../../components/Module/ListStandard.vue";

export default {
  components: { ListSemester, ListStandard, ListModule },
  mounted() {},
  data() {
    return {
      listSemesters: true,
      listStandards: false,
      listModules: false,
    };
  },
  methods: {
    switchTab(key) {
      this.$store.commit("app/SET_DATA", null);
      this.$store.commit("app/SET_TYPE", "");
      switch (key) {
        case "listSemesters":
          this.listSemesters = true;
          this.listStandards = false;
          this.listModules = false;
          break;
        case "listStandards":
          this.listSemesters = false;
          this.listStandards = true;
          this.listModules = false;
          break;
        case "listModules":
          this.listSemesters = false;
          this.listStandards = false;
          this.listModules = true;
          break;
        default:
          this.listSemesters = true;
          this.listStandards = false;
          this.listModules = false;
          break;
      }
    },
  },
};
</script>
