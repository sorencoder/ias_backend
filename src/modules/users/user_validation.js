import { body, validationResult } from "express-validator";
import User from "./user_model.js";

const createUserValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required."),
  body("lastName").trim().notEmpty().withMessage("Last name is required."),
  body("email")
    .isEmail()
    .withMessage("Invalid email address.")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("Email already in use.");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  body("role")
    .isIn(["Admin", "Teacher", "Student", "Parent", "Accountant"])
    .withMessage("Invalid role."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const updateUserValidation = [
  body("firstName").optional().trim().notEmpty().withMessage("First name cannot be empty."),
  body("lastName").optional().trim().notEmpty().withMessage("Last name cannot be empty."),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address.")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user && user._id.toString() !== req.params.id) {
        return Promise.reject("Email already in use by another user.");
      }
    }),
  body("role")
    .optional()
    .isIn(["Admin", "Teacher", "Student", "Parent", "Accountant"])
    .withMessage("Invalid role."),
  body("status")
    .optional()
    .isIn(["active", "inactive", "suspended"])
    .withMessage("Invalid status."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { createUserValidation, updateUserValidation };
