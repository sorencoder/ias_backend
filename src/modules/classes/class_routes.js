import express from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "./class_controller.js";
import { validateClass } from "./class_validation.js";
import auth from "../../middlewares/auth_middleware.js";
import role from "../../middlewares/role_middleware.js";

const router = express.Router();

router
  .route("/")
  .post(auth, role(["Admin"]), validateClass, createClass)
  .get(auth, role(["Admin", "Teacher"]), getAllClasses);

router
  .route("/:id")
  .get(auth, role(["Admin", "Teacher"]), getClassById)
  .put(auth, role(["Admin"]), validateClass, updateClass)
  .delete(auth, role(["Admin"]), deleteClass);

export default router;
