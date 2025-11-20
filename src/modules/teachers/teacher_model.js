import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TeacherSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    mobile: {
      type: String,
      required: true,
      match: [
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit Indian mobile number",
      ],
    },
    aadharNo: {
      type: String,
      unique: true,
      required: true,
      match: [/^\d{12}$/, "Aadhar number must be exactly 12 digits"],
    },
    address: { type: String, required: true },
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    hireDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Format Aadhar for output
        if (ret.aadharNo) {
          ret.aadharNo = ret.aadharNo.replace(/(\d{4})(?=\d)/g, "$1 ");
        }

        // Format mobile number for output as +91 91234 56789
        if (ret.mobile) {
          const digits = ret.mobile.replace(/\D/g, "");
          ret.mobile = `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
        }

        return ret;
      },
    },
  }
);

// Pre-save hook
TeacherSchema.pre("save", function () {
  // Set full name
  this.fullName = [this.firstName, this.lastName].filter(Boolean).join(" ");
});

export default model("Teacher", TeacherSchema);
