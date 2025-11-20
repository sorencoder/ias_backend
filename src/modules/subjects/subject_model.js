import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Subject = model("Subject", subjectSchema);

export default Subject;
