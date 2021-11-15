<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Applicants</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Dashboard</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Applicants
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
            <list-all-student
              v-if="list"
              :status="`Registered`"
              :pageType="`applicant_students`"
              :emitTo="`applicant_students`"
              :emitDetailsTo="`applicant_student_details`"
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
import ListAllStudent from "../../components/Student/ListAllStudent.vue";

export default {
  components: { ListAllStudent },
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
  mounted() {
    let self = this;
    self.$root.$on("applicant_student_details", function(val) {
      self.switchTab("add");
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
    },
  },
};
</script>
