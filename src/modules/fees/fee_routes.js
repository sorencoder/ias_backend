import express from "express";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  payInvoice,
  getDues,
} from "./fee_controller.js";
import {
  createInvoiceValidation,
  updateInvoiceValidation,
  payInvoiceValidation,
} from "./fee_validation.js";
import auth from "../../middlewares/auth_middleware.js";
import role from "../../middlewares/role_middleware.js";

const router = express.Router();

// Full CRUD on Invoices
router
  .route("/")
  .post(auth, role(["Admin", "Accountant"]), createInvoiceValidation, createInvoice)
  .get(auth, role(["Admin", "Accountant"]), getAllInvoices);

router
  .route("/:id")
  .get(auth, role(["Admin", "Accountant", "Parent"]), getInvoiceById) // Add logic in controller for Parent role
  .put(auth, role(["Admin", "Accountant"]), updateInvoiceValidation, updateInvoice)
  .delete(auth, role(["Admin", "Accountant"]), deleteInvoice);

// Special Actions
router.post(
  "/:id/pay",
  auth,
  role(["Admin", "Accountant", "Parent"]),
  payInvoiceValidation,
  payInvoice
);
router.get(
  "/dues/:studentId",
  auth,
  role(["Admin", "Accountant", "Parent"]),
  getDues
);

export default router;

