import { Router } from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { noteIdValidation, createNoteValidation } from "../validation/note.validation.js";
const router = Router();

router.use(authenticate); // protect all routes

router.post("/", validate(createNoteValidation), createNote);
/**
 * @swagger
 * /api/notes:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all notes
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getNotes);
router.get("/:id",validate(noteIdValidation), getNoteById);
router.put("/:id", validate([...noteIdValidation, ...createNoteValidation]), updateNote);
router.delete("/:id", validate(noteIdValidation), deleteNote);

export default router;
