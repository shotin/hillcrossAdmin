<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <div class="header-action">
            <h1 class="page-title">My Profile</h1>
            <ol class="breadcrumb page-breadcrumb">
              <li class="breadcrumb-item"><a href="#">Pages</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                My Profile
              </li>
            </ol>
          </div>
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="pills-calendar-tab"
                data-toggle="pill"
                href="#user-info"
                role="tab"
                aria-controls="pills-calendar"
                aria-selected="false"
                >User Information</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-timeline-tab"
                data-toggle="pill"
                href="#password-mngt"
                role="tab"
                aria-controls="pills-timeline"
                aria-selected="true"
                >Password Management</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section-body mt-4">
      <div class="container-fluid">
        <div class="row clearfix">
          <div class="col-md-12">
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane active"
                id="user-info"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <manage-profile />
              </div>
              <div
                class="tab-pane fade"
                id="password-mngt"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <manage-password />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import ManagePassword from '../components/Profile/ManagePassword.vue';
import ManageProfile from '../components/Profile/ManageProfile.vue';
export default {
  components: { ManageProfile, ManagePassword },};
</script>
