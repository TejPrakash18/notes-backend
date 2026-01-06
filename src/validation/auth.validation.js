import { body } from "express-validator";

export const registerValidation = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("username")
    .notEmpty().withMessage("Username is required"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];
