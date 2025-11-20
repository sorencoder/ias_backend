import { body, param, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createInvoiceValidation = [
  body("studentId").isMongoId().withMessage("Invalid student ID."),
  body("dueDate").isISO8601().toDate().withMessage("Invalid due date."),
  body("items")
    .isArray({ min: 1 })
    .withMessage("Invoice must have at least one item."),
  body("items.*.description")
    .trim()
    .notEmpty()
    .withMessage("Item description is required."),
  body("items.*.amount")
    .isFloat({ gt: 0 })
    .withMessage("Item amount must be a positive number."),
  body("totalAmount")
    .isFloat({ gt: 0 })
    .withMessage("Total amount must be a positive number.")
    .custom((value, { req }) => {
      const itemsTotal = req.body.items.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      if (Math.abs(itemsTotal - value) > 0.01) {
        // Use a small epsilon for float comparison
        throw new Error(
          "Total amount does not match the sum of item amounts."
        );
      }
      return true;
    }),
  handleValidationErrors,
];

const updateInvoiceValidation = [
  param("id").isMongoId().withMessage("Invalid invoice ID."),
  body("dueDate").optional().isISO8601().toDate().withMessage("Invalid due date."),
  body("status")
    .optional()
    .isIn(["draft", "sent", "overdue", "void"])
    .withMessage("Invalid status."),
  body("items")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Invoice must have at least one item."),
  body("items.*.description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Item description is required."),
  body("items.*.amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Item amount must be a positive number."),
  handleValidationErrors,
];

const payInvoiceValidation = [
  param("id").isMongoId().withMessage("Invalid invoice ID."),
  body("payment").exists().withMessage("Payment object is required."),
  body("payment.amount")
    .isFloat({ gt: 0 })
    .withMessage("Payment amount must be a positive number."),
  body("payment.method").trim().notEmpty().withMessage("Payment method is required."),
  body("payment.date")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid payment date."),
  body("payment.transactionId").optional().trim(),
  handleValidationErrors,
];

export {
  createInvoiceValidation,
  updateInvoiceValidation,
  payInvoiceValidation,
};
