import { body, param } from "express-validator";

export const createNoteValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ max: 100 }).withMessage("Title too long"),

  body("content")
    .notEmpty().withMessage("Content is required"),

  body("tags")
    .optional()
    .isArray().withMessage("Tags must be an array"),
];

export const noteIdValidation = [
  param("id")
    .isMongoId().withMessage("Invalid note id"),
];
