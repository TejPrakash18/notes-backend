import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  createNoteService,
  getNotesService,
  getNoteByIdService,
  updateNoteService,
  deleteNoteService,
} from "../services/note.service.js";
import  logger  from "../config/logger.js";

export const createNote = asyncHandler(async (req, res) => {
  const note = await createNoteService(req.user.userId, req.body);

  //log event
  logger.info("Notes created",{
    userId : req.user.userId,
    noteId: note.noteId,
    title: req.body.title 
  })

  res.status(201).json(
    new ApiResponse(201, "Note created successfully", note)
  );
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await getNotesService(req.user.userId);

  res.status(200).json(
    new ApiResponse(200, "Notes fetched successfully", notes)
  );
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await getNoteByIdService(
    req.user.userId,
    req.params.id
  );

  res.status(200).json(
    new ApiResponse(200, "Note fetched successfully", note)
  );
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await updateNoteService(
    req.user.userId,
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(200, "Note updated successfully", note)
  );
});

export const deleteNote = asyncHandler(async (req, res) => {
  await deleteNoteService(req.user.userId, req.params.id);

  res.status(200).json(
    new ApiResponse(200, "Note deleted successfully")
  );
});
