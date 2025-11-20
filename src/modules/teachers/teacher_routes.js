import express from "express";
import { createTeacher, listTeachers } from "./teacher.controller.js";
import { auth } from "../auth/auth.js";
import { authorize } from "../auth/rbac.js";
const router = express.Router();

router.post("/", auth, authorize("admin"), createTeacher);
router.get("/", auth, listTeachers);

export default router;
