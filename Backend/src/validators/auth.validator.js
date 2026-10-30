import { body, validationResult } from "express-validator";

const validateRegister = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const registerValidationRules = [
  body("username")
    .trim()
    .isLength({ min: 4, max: 12 })
    .withMessage("Username must be between 6 and 12 characters")
    .bail()
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email address is required"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validateRegister,
];

export const LoginValidationRules = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email address is required"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validateRegister,
];
