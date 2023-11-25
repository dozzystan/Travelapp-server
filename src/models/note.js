import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    visitedDate: { type: Date },
    tags: { type: Array, default: [{ type: String }], required: true },
  },
  {
    timestamps: true,
  }
);
export default model("Note", noteSchema);
