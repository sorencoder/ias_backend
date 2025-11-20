import { body, validationResult } from "express-validator";
import Class from "./class_model.js";

const validateClass = [
  body("name").trim().notEmpty().withMessage("Class name is required."),
  body("section").optional().trim(),
  body("classTeacher")
    .optional()
    .isMongoId()
    .withMessage("Invalid Class Teacher ID."),
  body("subjects")
    .optional()
    .isArray()
    .withMessage("Subjects must be an array of Subject IDs."),
  body("subjects.*").optional().isMongoId().withMessage("Invalid Subject ID."),
  body("capacity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Capacity must be a non-negative integer."),
  body("academicYear")
    .optional()
    .matches(/^\d{4}-\d{4}$/)
    .withMessage('Academic year must be in "YYYY-YYYY" format.'),

  // Custom validation to check for uniqueness of name, section, and academicYear
  body("name").custom(async (value, { req }) => {
    const { section, academicYear } = req.body;
    const query = {
      name: value,
      section: section || null, // Handle case where section is not provided
      academicYear:
        academicYear ||
        (() => {
          const year = new Date().getFullYear();
          return `${year}-${year + 1}`;
        })(),
    };

    // For updates, exclude the current document from the search
    if (req.params.id) {
      query._id = { $ne: req.params.id };
    }

    const existingClass = await Class.findOne(query);
    if (existingClass) {
      return Promise.reject(
        "A class with this name and section already exists for the academic year."
      );
    }
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateClass };
