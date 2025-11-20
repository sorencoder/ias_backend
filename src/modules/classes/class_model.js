import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClassSchema = new Schema(
  {
    name: { type: String, required: true }, // e.g., Grade 10
    section: { type: String }, // A, B, C
    classTeacher: { type: Schema.Types.ObjectId, ref: "Teacher" },
    capacity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model("Class", ClassSchema);
