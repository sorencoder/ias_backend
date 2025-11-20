import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClassSchema = new Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g., "Grade 10"
    section: { type: String, trim: true }, // e.g., "A", "B", "C"
    classTeacher: { type: Schema.Types.ObjectId, ref: "Teacher" },
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    capacity: { type: Number, default: 0, min: 0 },
    academicYear: {
      type: String,
      required: true,
      default: () => {
        const year = new Date().getFullYear();
        return `${year}-${year + 1}`; // e.g., "2024-2025"
      },
    },
  },
  { timestamps: true }
);

// Compound index to ensure that the combination of name and section is unique for a given academic year.
ClassSchema.index({ name: 1, section: 1, academicYear: 1 }, { unique: true });

const Class = model("Class", ClassSchema);

export default Class;

