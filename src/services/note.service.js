import { Note } from "../models/note.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createNoteService = async (userId, data) => {
  return await Note.create({
    userId,
    title: data.title,
    content: data.content,
    tags: data.tags || [],
  });
};

export const getNotesService = async (userId) => {
  return await Note.find({ userId }).sort({ createdAt: -1 });
};

export const getNoteByIdService = async (userId, noteId) => {
  const note = await Note.findOne({ _id: noteId, userId });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return note;
};

export const updateNoteService = async (userId, noteId, data) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId },
    data,
    { new: true }
  );

  if (!note) {
    throw new ApiError(404, "Note not found or unauthorized");
  }

  return note;
};

export const deleteNoteService = async (userId, noteId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, userId });

  if (!note) {
    throw new ApiError(404, "Note not found or unauthorized");
  }

  return note;
};
