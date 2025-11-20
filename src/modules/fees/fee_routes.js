import express from "express";
import { createInvoice, payInvoice, getDues } from "./fee.controller.js";
import { auth } from "../auth/auth.js";
import { authorize } from "../auth/rbac.js";
const router = express.Router();

router.post("/", auth, authorize("accountant", "admin"), createInvoice);
router.post(
  "/:id/pay",
  auth,
  authorize("accountant", "admin", "parent"),
  payInvoice
);
router.get(
  "/dues/:studentId",
  auth,
  authorize("accountant", "admin", "parent"),
  getDues
);

export default router;
