import express from "express";
import controller from "./user_controller.js";
import auth from "../../middlewares/auth_middleware.js";
import role from "../../middlewares/role_middleware.js";

const router = express.Router();

router.post("/", auth, role(["admin"]), controller.create);
router.get("/", auth, controller.getAll);

export default router;
