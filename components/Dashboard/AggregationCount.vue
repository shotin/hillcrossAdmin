<template>
  <div class="row clearfix row-deck">
    <div class="col-6 col-md-4 col-xl-2">
      <div class="card">
        <div class="card-body ribbon">
          <nuxt-link to="/staff/academic" class="my_sort_cut text-muted">
            <h3>{{aggregatorCount.teacher_count}}</h3>
            <span>Academic Staff</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 col-xl-2">
      <div class="card">
        <div class="card-body">
          <nuxt-link to="/staff/non-academic" class="my_sort_cut text-muted">
            <h3>{{aggregatorCount.non_academics}}</h3>
            <span>Non Academic Staff</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 col-xl-2">
      <div class="card">
        <div class="card-body">
          <nuxt-link to="/students/admitted" class="my_sort_cut text-muted">
            <h3>{{aggregatorCount.user_count}}</h3>
            <span>Student</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 col-xl-2">
      <div class="card">
        <div class="card-body ribbon">
          <a href="#" class="my_sort_cut text-muted">
            <h3>{{aggregatorCount.schools}}</h3>
            <span>Schools</span>
          </a>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 col-xl-2">
      <div class="card">
        <div class="card-body">
          <a href="#" class="my_sort_cut text-muted">
            <h3>{{aggregatorCount.qualifications}}</h3>
            <span>Qualifications</span>
          </a>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-4 col-xl-2">
      <div class="card">
        <div class="card-body">
          <nuxt-link to="/modules" class="my_sort_cut text-muted">
            <h3>{{aggregatorCount.modules}}</h3>
            <span>Modules</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aggregatorCount: [],
    };
  },
  mounted() {
    this.getAggregatorData();
  },
  methods: {
    getAggregatorData() {
      this.$axios
        .get(`/admin/dashboard`)
        .then((res) => {
          this.aggregatorCount = res.data.data;
        })
        .catch((err) => {});
    },
  },
};
</script>
