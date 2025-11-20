import mongoose from "mongoose";
const { Schema, model } = mongoose;

// A single counter for all sequences to avoid multiple documents.
const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = model("Counter", CounterSchema);

const StudentSchema = new Schema(
  {
    // --- Personal Information ---
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    aadharNo: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      match: [/^\d{12}$/, "Aadhar number must be 12 digits"],
    },
    photoUrl: { type: String, trim: true },

    // --- Academic Information ---
    academic: {
      enrollNo: { type: String, unique: true },
      class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
      admissionNo: { type: String, unique: true, sparse: true },
      admissionYear: { type: Number },
      dateOfAdmission: { type: Date, required: true, default: Date.now },
      status: {
        type: String,
        enum: ["Active", "Inactive", "Graduated", "Alumni", "Dropped"],
        default: "Active",
      },
      subjects: [
        {
          type: Schema.Types.ObjectId,
          ref: "Subject",
        },
      ],
    },

    // --- Contact Information ---
    contact: {
      email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "is invalid"],
      },
      studentMobile: {
        type: String,
        trim: true,
        match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
      },
      address: {
        street: { type: String, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        postalCode: { type: String, required: true, trim: true },
        country: { type: String, default: "India", trim: true },
      },
    },

    // --- Parent/Guardian Information ---
    parents: {
      father: {
        name: { type: String, required: true, trim: true },
        aadharNo: {
          type: String,
          required: true,
          unique: true,
          sparse: true,
          trim: true,
          match: [/^\d{12}$/, "Aadhar number must be 12 digits"],
        },
        mobile: {
          type: String,
          required: true,
          trim: true,
          match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
        },
        occupation: { type: String, trim: true },
        email: {
          type: String,
          trim: true,
          lowercase: true,
          match: [/\S+@\S+\.\S+/, "is invalid"],
        },
      },
      mother: {
        name: { type: String, required: true, trim: true },
        mobile: {
          type: String,
          trim: true,
          match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
        },
        occupation: { type: String, trim: true },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual property for fullName
StudentSchema.virtual("fullName").get(function () {
  return [this.firstName, this.middleName, this.lastName]
    .filter(Boolean)
    .join(" ");
});

// Middleware to generate enrollNo and admissionNo before validation
StudentSchema.pre("validate", async function (next) {
  if (!this.isNew) {
    return next();
  }

  const student = this;
  const currentYear = new Date().getFullYear();

  // Generate enrollNo
  if (!student.academic.enrollNo) {
    const enrollCounterId = `enrollNoCounter`; // Single counter for simplicity
    const counterDoc = await Counter.findOneAndUpdate(
      { _id: enrollCounterId },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const serial = String(counterDoc.seq).padStart(6, "0");
    student.academic.enrollNo = `ENR-${serial}`;
  }

  // Generate admissionNo
  if (!student.academic.admissionNo) {
    const admissionCounterId = `admissionNoCounter-${currentYear}`;
    const counterDoc = await Counter.findOneAndUpdate(
      { _id: admissionCounterId },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const serial = String(counterDoc.seq).padStart(4, "0");
    student.academic.admissionYear = currentYear;
    student.academic.admissionNo = `${currentYear}-${serial}`;
  }

  next();
});

const Student = model("Student", StudentSchema);
export default Student;
