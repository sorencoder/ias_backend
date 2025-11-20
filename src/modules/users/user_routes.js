import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user_controller.js";
import {
  createUserValidation,
  updateUserValidation,
} from "./user_validation.js";
import auth from "../../middlewares/auth_middleware.js";
import role from "../../middlewares/role_middleware.js";

const router = express.Router();

router
  .route("/")
  .post(auth, role(["Admin"]), createUserValidation, createUser)
  .get(auth, role(["Admin"]), getAllUsers);

router
  .route("/:id")
  .get(auth, role(["Admin", "Accountant", "Student", "Teacher"]), getUserById)
  .put(auth, role(["Admin"]), updateUserValidation, updateUser)
  .delete(auth, role(["Admin"]), deleteUser);

export default router;
