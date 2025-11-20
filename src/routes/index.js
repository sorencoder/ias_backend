import express from "express";
// import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user_routes.js";
import studentRoutes from "../modules/students/student_routes.js";
// import teacherRoutes from "../modules/teachers/teacher.routes.js";
// import classRoutes from "../modules/classes/class.routes.js";
// import subjectRoutes from "../modules/subjects/subject.routes.js";
// import attendanceRoutes from "../modules/attendance/attendance.routes.js";
// import examRoutes from "../modules/exams/exam.routes.js";
// import resultRoutes from "../modules/results/result.routes.js";
// import feeRoutes from "../modules/fees/fee.routes.js";
// import notificationRoutes from "../modules/notifications/notification.routes.js";
// import settingRoutes from "../modules/settings/setting.routes.js";

const router = express.Router();

router.get("/", function (req, res) {
  res.status(200).json({ message: "API is running..." });
});
// router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/students", studentRoutes);
// router.use("/teachers", teacherRoutes);
// router.use("/classes", classRoutes);
// router.use("/subjects", subjectRoutes);
// router.use("/attendance", attendanceRoutes);
// router.use("/exams", examRoutes);
// router.use("/results", resultRoutes);
// router.use("/fees", feeRoutes);
// router.use("/notifications", notificationRoutes);
// router.use("/settings", settingRoutes);

export default router;
