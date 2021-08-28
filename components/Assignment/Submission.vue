<template>
  <span>
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center ">
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#submitted"
                >Submitted</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#not_submitted"
                >Not Submitted</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section-body mt-4">
      <div class="container-fluid">
        <div class="tab-content">
          <div class="tab-pane active" id="submitted">
            <div class="card">
              <div class="table-responsive">
                <table
                  class="table table-hover table-vcenter text-nowrap table-striped mb-0"
                >
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student name</th>
                      <th>Score</th>
                      <th>File Type</th>
                      <th>Submitted On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="submission in submittedAssignments"
                      :key="submission.id"
                    >
                      <td>
                        <span>{{ submission.student_id }}</span>
                      </td>
                      <td>
                        <div class="font-15">{{ submission.student_name }}</div>
                      </td>
                      <td>
                        <span class="text-muted">{{ submission.score }}</span>
                      </td>
                      <td>
                        <strong>{{ submission.file_type }}</strong>
                      </td>
                      <td>
                        <strong>{{ submission.submitted_on }}</strong>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-icon btn-sm"
                          title="View"
                        >
                          <i class="fa fa-eye"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-icon btn-sm"
                          title="Edit"
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-icon btn-sm js-sweetalert"
                          title="Delete"
                          data-type="confirm"
                        >
                          <i class="fa fa-trash-o text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="not_submitted">
            <div class="card">
              <div class="table-responsive">
                <table
                  class="table table-hover table-vcenter text-nowrap table-striped mb-0"
                >
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="not_submitted in notSubmittedAssignments"
                      :key="not_submitted.id"
                    >
                      <td>
                        <span>{{ not_submitted.student_id }}</span>
                      </td>
                      <td>
                        <div class="font-15">{{ not_submitted.name }}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
export default {
  props: {
    submittedAssignments: {
      required: true,
      type: Array,
    },
    notSubmittedAssignments: {
      required: true,
      type: Array,
    },
  },
};
</script>
