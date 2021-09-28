<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Archived Staff</h1>
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
              <a class="nav-link active" data-toggle="tab" href="#pro-all"
                >List View</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section-body mt-4">
      <div class="container-fluid">
        <div class="tab-content">
          <div class="tab-pane active" id="pro-all">
            <div class="table-responsive">
              <list-archive />
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import ListArchive from "../../components/Staff/ListArchive.vue";
export default {
  components: { ListArchive },
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
