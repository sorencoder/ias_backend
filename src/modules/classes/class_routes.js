import express from "express";
import { createClass, listClasses } from "./class.controller.js";
import { auth } from "../auth/auth.js";
import { authorize } from "../auth/rbac.js";
const router = express.Router();

router.post("/", auth, authorize("admin"), createClass);
router.get("/", auth, listClasses);

export default router;
