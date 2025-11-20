import { body, validationResult } from "express-validator";
import Subject from "./subject_model.js";

const createSubjectValidation = [
  body("name").trim().notEmpty().withMessage("Subject name is required."),
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Subject code is required.")
    .custom(async (value) => {
      const subject = await Subject.findOne({ code: value.toUpperCase() });
      if (subject) {
        return Promise.reject("Subject code already exists.");
      }
    }),
  body("description").optional().trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const updateSubjectValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Subject name cannot be empty."),
  body("code")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Subject code cannot be empty.")
    .custom(async (value, { req }) => {
      const subject = await Subject.findOne({ code: value.toUpperCase() });
      if (subject && subject._id.toString() !== req.params.id) {
        return Promise.reject("Subject code already exists.");
      }
    }),
  body("description").optional().trim(),
  body("teachers")
    .optional()
    .isArray()
    .withMessage("Teachers must be an array of IDs."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { createSubjectValidation, updateSubjectValidation };
