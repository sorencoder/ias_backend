import express from "express";
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "./subject_controller.js";
import {
  createSubjectValidation,
  updateSubjectValidation,
} from "./subject_validation.js";
import auth from "../../middlewares/auth_middleware.js";
import role from "../../middlewares/role_middleware.js";

const router = express.Router();

router
  .route("/")
  .post(auth, role(["Admin"]), createSubjectValidation, createSubject)
  .get(auth, role(["Admin", "Teacher"]), getAllSubjects);

router
  .route("/:id")
  .get(auth, role(["Admin", "Teacher"]), getSubjectById)
  .put(auth, role(["Admin"]), updateSubjectValidation, updateSubject)
  .delete(auth, role(["Admin"]), deleteSubject);

export default router;
