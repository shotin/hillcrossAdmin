module.exports = [
  {
    name: "login",
    path: "/auth/login",
    component: "./pages/auth/login.vue",
  },
  {
    name: "forgotpassword",
    path: "/auth/forgot-password",
    component: "./pages/auth/forgot_password.vue",
  },
  {
    name: "resetpassword",
    path: "/auth/change-password",
    component: "./pages/auth/reset_password.vue",
  },
  {
    name: "dashboard",
    path: "/",
    component: "./pages/dashboard/index.vue",
  },
  {
    name: "academic_staff",
    path: "/staff/academic",
    component: "./pages/staff/academic.vue",
  },
  {
    name: "non_academic_staff",
    path: "/staff/non-academic",
    component: "./pages/staff/non_academic.vue",
  },
  {
    name: "archived_staff",
    path: "/staff/archived",
    component: "./pages/staff/archived.vue",
  },
  {
    name: "attendance",
    path: "/staff/attendances",
    component: "./pages/staff/attendance.vue",
  },
  {
    name: "roles",
    path: "/roles",
    component: "./pages/role.vue",
  },
  {
    name: "leaves",
    path: "/leaves",
    component: "./pages/leave/leave.vue",
  },
  {
    name: "leave_details",
    path: "/leaves/:id",
    component: "./pages/leave/details.vue",
  },
  {
    name: "payrolls",
    path: "/payrolls",
    component: "./pages/payroll/payroll.vue",
  },
  {
    name: "modules",
    path: "/modules",
    component: "./pages/modules/module.vue",
  },
  {
    name: "assignments",
    path: "/assignments",
    component: "./pages/assignment/assignment.vue",
  },
  {
    name: "assessments",
    path: "/assessments",
    component: "./pages/assessment/assessment.vue",
  },
  {
    name: "examinations",
    path: "/examinations",
    component: "./pages/examination/examination.vue",
  },
  {
    name: "calendars",
    path: "/academic-calendars",
    component: "./pages/calendar/calendar.vue",
  },
  {
    name: "results",
    path: "/academic-results",
    component: "./pages/result/result.vue",
  },
  {
    name: "students",
    path: "/students",
    component: "./pages/student/student.vue",
  },
  {
    name: "admitted-students",
    path: "/students/admitted",
    component: "./pages/student/admitted_student.vue",
  },
  {
    name: "graduated-students",
    path: "/students/graduated",
    component: "./pages/student/graduated_student.vue",
  },
  {
    name: "current-students",
    path: "/students/current",
    component: "./pages/student/admitted_student.vue",
  },
  {
    name: "applicant-students",
    path: "/students/applicant",
    component: "./pages/student/applicant_student.vue",
  },
  {
    name: "dropped-out--students",
    path: "/students/dropped-out",
    component: "./pages/student/dropped_out_student.vue",
  },
  {
    name: "academic-records",
    path: "/students/academic-records",
    component: "./pages/student/academic_record.vue",
  },
  {
    name: "income",
    path: "/accounts/income",
    component: "./pages/account/income.vue",
  },
  {
    name: "database",
    path: "/marketing/databases",
    component: "./pages/marketing/database.vue",
  },
  {
    name: "quote",
    path: "/quotes",
    component: "./pages/quote/quote.vue",
  },
  {
    name: "activities",
    path: "/activity-logs",
    component: "./pages/activity/logs.vue",
  },
  {
    name: "profile",
    path: "/profile",
    component: "./pages/profile.vue",
  },
];
