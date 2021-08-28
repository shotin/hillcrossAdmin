<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">Leave Details</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/leaves">Leaves</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Details
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="section-body mt-4 chat_app" v-if="leave_details">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="card">
              <div class="card-header bline">
                <h5 class="">
                  {{ leave_details.description }} |
                  {{ leave_details.start_date }} to {{ leave_details.end_date }}
                </h5>
              </div>
              <compose-comment :leave="leave_details" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-else />
  </span>
</template>
<script>
import Loader from "@/components/Loader.vue";
import ComposeComment from "../../components/Leave/ComposeComment.vue";
export default {
  data() {
    return {
      leave_details: null,
    };
  },
  components: {
    Loader,
    ComposeComment,
  },
  mounted() {
    this.getLeaveDetails();
  },
  methods: {
    getLeaveDetails() {
      this.$axios
        .get(`/leaves/${this.$route.params.id}`)
        .then((res) => {
          this.leave_details = res.data.data;
        })
        .catch((err) => {});
    },
  },
};
</script>
