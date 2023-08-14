const {body, validationResult} = require("express-validator")

const loginValidator = [
    body("email").notEmpty().withMessage("Email cannot be empty")
    .isEmail().withMessage("Invalid email address format"),
    body("password").notEmpty().withMessage("Password cannot be empty")
    .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
    .withMessage("Password must contain 8 character, one uppercase, one number, and one special case character"),
]

const registValidatorEmployee = [
    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("roleId").notEmpty().withMessage("Role is required"),
  body("baseSalary")
    .notEmpty()
    .withMessage("Base salary is required")
    .matches(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/)
    .withMessage("Must contains only digits"),
  body("daySalary")
    .notEmpty()
    .withMessage("Day salary is required")
    .matches(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/)
    .withMessage("Must contains only digits"),
];
const formValidatorEmployee = [
    body("password").notEmpty().withMessage("Password cannot be empty")
    .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
    .withMessage("Password must contain 8 character, one uppercase, one number, and one special case character"),
    body("fullName").notEmpty().withMessage("Fullname is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("birthday").notEmpty().withMessage("Birthday is required"),
]
const validateRegist = (req, res, next) => {
    const errors = validationResult(req);
  //   validationResult memiliki method isEmpty untuk mengembalikan nilai true/false
    if (errors.isEmpty() === false) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

  module.exports = {
    validateRegist, loginValidator, formValidatorEmployee, registValidatorEmployee
  }