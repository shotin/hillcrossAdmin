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
    name: "dropped-out--students",
    path: "/students/dropped-out",
    component: "./pages/student/dropped_out_student.vue",
  },
];
