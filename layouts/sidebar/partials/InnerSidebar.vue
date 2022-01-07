<template>
  <div id="left-sidebar" class="sidebar custom-color" style="background: linear-gradient(45deg, #b5002a, #dc3535);">
    <h5 class="brand-name">
      Hillcross College
    </h5>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#menu-uni">Menu</a>
      </li>
      <!-- <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#menu-admin">Admin</a>
      </li> -->
    </ul>
    <div class="tab-content mt-3">
      <div class="tab-pane fade show active" id="menu-uni" role="tabpanel">
        <nav class="sidebar-nav">
          <ul class="metismenu">
            <li class="active">
              <nuxt-link to="/"
                ><i class="fa fa-tachometer-alt"></i
                ><span>Dashboard</span></nuxt-link
              >
            </li>
            <li class="active">
              <nuxt-link to="/roles"
                ><i class="fa fa-user-tag"></i
                ><span>Roles/Users Mgt</span></nuxt-link
              >
            </li>
            <li>
              <a class="nav-link">
                <i class="fa fa-user"></i><span>HR Management</span
                ><i class="fa fa-angle-down custom-caret"></i>
              </a>
              <ul class="submenu collapse">
                <li>
                  <nuxt-link class="nav-link" to="/staff/academic"
                    ><i class="fa fa-user-graduate"></i>Academic Staff
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/staff/non-academic"
                    ><i class="fa fa-user"></i>Non-academic Staff
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/staff/archived"
                    ><i class="fa fa-user-times"></i>Archived Staff
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/leaves"
                    ><i class="fa fa-house-user"></i>Leave Management
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/staff/attendances"
                    ><i class="fa fa-book"></i>Attendance
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/payrolls"
                    ><i class="fa fa-money-bill"></i>Payroll
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li>
              <a class="nav-link">
                <i class="fa fa-book"></i><span>Academics</span>
                <i class="fa fa-angle-down custom-caret"></i>
              </a>
              <ul class="submenu collapse">
                <li>
                  <nuxt-link class="nav-link" to="/academic-calendars"
                    ><i class="fa fa-calendar"></i>Academic Calendar
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/modules"
                    ><i class="fa fa-graduation-cap"></i> Module List
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/assignments"
                    ><i class="fa fa-home"></i> Assignments
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/assessments"
                    ><i class="fa fa-keyboard"></i> Assessments
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/examinations"
                    ><i class="fa fa-pen-square"></i> Examination
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/academic-results"
                    ><i class="fa fa-poll-h"></i>Results
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/academic-results"
                    ><i class="fa fa-certificate"></i>Certificates
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li>
              <a class="nav-link">
                <i class="fa fa-user-graduate"></i><span>Student Mgt</span>
                <i class="fa fa-angle-down custom-caret"></i>
              </a>
              <ul class="submenu collapse">
                <li>
                  <nuxt-link class="nav-link" to="/staff/academic"
                    ><i class="fa fa-calculator"></i>Account Statement
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/students/academic-records"
                    ><i class="fa fa-book"></i>Academic Record
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/students/applicant/new"
                    ><i class="fa fa-user-plus"></i>New Applicant
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/students/applicant"
                    ><i class="fa fa-house-user"></i>Applicant List
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/students/admitted">
                    <i class="fa fa-user-check"></i>Admitted List
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/students"
                    ><i class="fa fa-user"></i> Students List
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/students/current">
                    <i class="fa fa-chalkboard-teacher"></i>Current
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/students/dropped-out"
                    ><i class="fa fa-users-slash"></i>Dropped Out
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/students/graduated"
                    ><i class="fa fa-user-graduate"></i>Graduated
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li>
              <a class="nav-link">
                <i class="fa fa-money-bill"></i
                ><span
                  >Accounts & Finance
                  <i class="fa fa-angle-down custom-caret"></i
                ></span>
              </a>
              <ul class="submenu collapse">
                <li>
                  <nuxt-link class="nav-link" to="/staff/academic"
                    ><i class="fa fa-file-invoice"></i>Invoicing
                  </nuxt-link>
                </li>
                <li>
                  <a class="nav-link">
                    <span
                      ><i class="fa fa-user-circle"></i>Students Accounts<i
                        class="fa fa-angle-down custom-caret"
                      ></i
                    ></span>
                  </a>
                  <ul class="submenu collapse">
                    <li>
                      <nuxt-link class="nav-link" to="/staff/academic"
                        ><i class="fa fa-money-check-alt"></i>Fees Layout
                      </nuxt-link>
                    </li>
                    <!-- <li>
                      <nuxt-link class="nav-link" to="/staff/academic"
                        ><i class="fa fa-house-user"></i>Accomodation
                      </nuxt-link>
                    </li> -->
                  </ul>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/accounts/income"
                    ><i class="fa fa-hand-holding-usd"></i>Income
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" to="/quotes"
                    ><i class="fa fa-credit-card"></i>Quotes
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li>
              <a class="nav-link">
                <i class="fa fa-bullhorn"></i><span>Marketing</span>
              </a>
              <ul class="submenu collapse">
                <!-- <li>
                  <nuxt-link class="nav-link" to="/staff/academic"
                    >Reports
                  </nuxt-link>
                </li> -->
                <li>
                  <nuxt-link class="nav-link" to="/marketing/databases"
                    ><i class="fa fa-database"></i>Database
                  </nuxt-link>
                </li>
              </ul>
            </li>

            <li class="g_heading">Extra</li>
            <li>
              <nuxt-link to="/activity-logs"
                ><i class="fa fa-comments"></i
                ><span>Activity Log</span></nuxt-link
              >
            </li>
            <!-- <li>
              <a href="gallery.html"
                ><i class="fa fa-camera-retro"></i><span>Report</span></a
              >
            </li> -->
          </ul>
        </nav>
      </div>
      <!-- <div class="tab-pane fade" id="menu-admin" role="tabpanel">
        <nav class="sidebar-nav">
          <ul class="metismenu">
            <li>
              <a href="payments.html"
                ><i class="fa fa-credit-card"></i><span>Payments</span></a
              >
            </li>
            <li>
              <a href="noticeboard.html"
                ><i class="fa fa-chalkboard-teacher"></i
                ><span>Noticeboard</span></a
              >
            </li>
            <li>
              <a href="taskboard.html"
                ><i class="fa fa-list-ul"></i><span>Taskboard</span></a
              >
            </li>
            <li>
              <a href="hostel.html"
                ><i class="fa fa-bed"></i><span>Hostel</span></a
              >
            </li>
            <li>
              <a href="transport.html"
                ><i class="fa fa-truck"></i><span>Transport</span></a
              >
            </li>
            <li>
              <a href="attendance.html"
                ><i class="fa fa-calendar-check-o"></i
                ><span>Attendance</span></a
              >
            </li>
            <li>
              <a href="leave.html"
                ><i class="fa fa-flag"></i><span>Leave</span></a
              >
            </li>
            <li>
              <a href="setting.html"
                ><i class="fa fa-gear"></i><span>Settings</span></a
              >
            </li>
          </ul>
        </nav>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    document.addEventListener("DOMContentLoaded", function() {
      document.querySelectorAll(".nav-link").forEach(function(element) {
        element.addEventListener("click", function(e) {
          let nextEl = element.nextElementSibling;
          let parentEl = element.parentElement;

          if (nextEl) {
            e.preventDefault();
            let mycollapse = new bootstrap.Collapse(nextEl);

            if (nextEl.classList.contains("show")) {
              mycollapse.hide();
            } else {
              mycollapse.show();
              // find other submenus with class=show
              var opened_submenu = parentEl.parentElement.querySelector(
                ".submenu.show"
              );
              // if it exists, then close all of them
              if (opened_submenu) {
                new bootstrap.Collapse(opened_submenu);
              }
            }
          }
        }); // addEventListener
      }); // forEach
    });
  },
};
</script>
<style>
.dropdown-text {
  color: black !important;
}
.custom-caret {
  padding-left: 10px;
}
.metismenu ul ul a {
  padding: 2px 3px 4px 40px;
}
.custom-color {
  background: linear-gradient(145deg,  #b5002a,  #dc3535) !important;
}
</style>
