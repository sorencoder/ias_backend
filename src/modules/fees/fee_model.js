import mongoose from "mongoose";
const { Schema, model } = mongoose;

const InvoiceSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    invoiceNo: { type: String, required: true, unique: true },
    items: [{ description: String, amount: Number }],
    totalAmount: { type: Number, required: true },
    dueDate: { type: Date },
    paid: { type: Boolean, default: false },
    payments: [
      {
        amount: Number,
        date: Date,
        method: String,
        transactionId: String,
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Invoice", InvoiceSchema);
