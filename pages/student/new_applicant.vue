<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a
                class="nav-link active"
                data-toggle="tab"
                href="#personal-details"
                @click.prevent="switchTab('personal_details')"
                >New Application</a
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
            class="tab-pane active"
            id="personal-details"
          >
            <registration />
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from "vuex";
import Registration from '../../components/Student/Edit/Registration.vue';

export default {
  components: { Registration },
  computed: {
    ...mapGetters({
      select: "select/select",
    }),
  },
};
</script>
