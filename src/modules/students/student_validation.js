import { body, validationResult } from "express-validator";
import Student from "./student_model.js";

const createStudentValidation = [
  // Personal Information
  body("firstName").trim().notEmpty().withMessage("First name is required."),
  body("lastName").trim().notEmpty().withMessage("Last name is required."),
  body("dateOfBirth")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date of birth."),
  body("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender."),
  body("bloodGroup")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood group."),
  body("aadharNo")
    .isLength({ min: 12, max: 12 })
    .withMessage("Aadhar number must be 12 digits.")
    .custom(async (value) => {
      const student = await Student.findOne({ aadharNo: value });
      if (student) {
        return Promise.reject("Aadhar number already in use.");
      }
    }),
  body("photoUrl").optional().isURL().withMessage("Invalid photo URL."),

  // Academic Information
  body("academic.class").isMongoId().withMessage("Invalid class ID."),
  body("academic.dateOfAdmission")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid date of admission."),

  // Contact Information
  body("contact.email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email address.")
    .custom(async (value) => {
      if (value) {
        const student = await Student.findOne({ "contact.email": value });
        if (student) {
          return Promise.reject("Email already in use.");
        }
      }
    }),
  body("contact.studentMobile")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Invalid mobile number."),
  body("contact.address.street").optional().trim(),
  body("contact.address.city")
    .trim()
    .notEmpty()
    .withMessage("City is required."),
  body("contact.address.state")
    .trim()
    .notEmpty()
    .withMessage("State is required."),
  body("contact.address.postalCode")
    .trim()
    .notEmpty()
    .withMessage("Postal code is required."),
  body("contact.address.country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country is required."),

  // Parent/Guardian Information
  body("parents.father.name")
    .trim()
    .notEmpty()
    .withMessage("Father's name is required."),
  body("parents.father.aadharNo")
    .isLength({ min: 12, max: 12 })
    .withMessage("Father's Aadhar number must be 12 digits."),
  body("parents.father.mobile")
    .isMobilePhone("en-IN")
    .withMessage("Invalid father's mobile number."),
  body("parents.father.occupation").optional().trim(),
  body("parents.father.email")
    .optional()
    .isEmail()
    .withMessage("Invalid father's email."),
  body("parents.mother.name")
    .trim()
    .notEmpty()
    .withMessage("Mother's name is required."),
  body("parents.mother.mobile")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Invalid mother's mobile number."),
  body("parents.mother.occupation").optional().trim(),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const updateStudentValidation = [
  // Personal Information (all optional)
  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty."),
  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty."),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid date of birth."),
  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender."),
  body("bloodGroup")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood group."),
  body("aadharNo")
    .optional()
    .isLength({ min: 12, max: 12 })
    .withMessage("Aadhar number must be 12 digits.")
    .custom(async (value, { req }) => {
      const student = await Student.findOne({ aadharNo: value });
      if (student && student._id.toString() !== req.params.id) {
        return Promise.reject(
          "Aadhar number already in use by another student."
        );
      }
    }),
  body("photoUrl").optional().isURL().withMessage("Invalid photo URL."),

  // Academic Information (all optional)
  body("academic.class")
    .optional()
    .isMongoId()
    .withMessage("Invalid class ID."),
  body("academic.dateOfAdmission")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid date of admission."),

  // Contact Information (all optional)
  body("contact.email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email address.")
    .custom(async (value, { req }) => {
      if (value) {
        const student = await Student.findOne({ "contact.email": value });
        if (student && student._id.toString() !== req.params.id) {
          return Promise.reject("Email already in use by another student.");
        }
      }
    }),
  body("contact.studentMobile")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Invalid mobile number."),
  body("contact.address.street").optional().trim(),
  body("contact.address.city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty."),
  body("contact.address.state")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("State cannot be empty."),
  body("contact.address.postalCode")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Postal code cannot be empty."),
  body("contact.address.country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country cannot be empty."),

  // Parent/Guardian Information (all optional)
  body("parents.father.name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Father's name cannot be empty."),
  body("parents.father.aadharNo")
    .optional()
    .isLength({ min: 12, max: 12 })
    .withMessage("Father's Aadhar number must be 12 digits.")
    .custom(async (value, { req }) => {
      const student = await Student.findOne({
        "parents.father.aadharNo": value,
      });
      if (student && student._id.toString() !== req.params.id) {
        return Promise.reject(
          "Father's Aadhar number already in use by another student."
        );
      }
    }),
  body("parents.father.mobile")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Invalid father's mobile number."),
  body("parents.father.occupation").optional().trim(),
  body("parents.father.email")
    .optional()
    .isEmail()
    .withMessage("Invalid father's email."),
  body("parents.mother.name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Mother's name cannot be empty."),
  body("parents.mother.mobile")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Invalid mother's mobile number."),
  body("parents.mother.occupation").optional().trim(),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { createStudentValidation, updateStudentValidation };
