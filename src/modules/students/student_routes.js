import express from "express";
import {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "./student_controller.js";
import {
  createStudentValidation,
  updateStudentValidation,
} from "./student_validation.js";
import auth from "../../middlewares/auth_middleware.js";
import role from "../../middlewares/role_middleware.js";

const router = express.Router();

router.post("/", auth, role(["admin"]), createStudentValidation, createStudent);
router.get("/", auth, role(["admin", "teacher"]), getStudents);
router.get("/:id", auth, role(["admin", "teacher", "student"]), getStudent);
router.put(
  "/:id",
  auth,
  role(["admin"]),
  updateStudentValidation,
  updateStudent
);
router.delete("/:id", auth, role(["admin"]), deleteStudent);

export default router;
