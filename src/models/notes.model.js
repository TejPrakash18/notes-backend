import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: Number, // PostgreSQL user ID
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    content: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model("Notes", noteSchema);
