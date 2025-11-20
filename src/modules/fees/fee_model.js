import mongoose from "mongoose";
const { Schema, model } = mongoose;

const InvoiceSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    invoiceNo: { type: String, required: true, unique: true },
    items: [
      {
        description: { type: String, required: true },
        amount: { type: Number, required: true, min: 0 },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["draft", "sent", "paid", "overdue", "void"],
      default: "draft",
    },
    paid: { type: Boolean, default: false }, // Kept for simplicity, could be a virtual.
    payments: [
      {
        amount: { type: Number, required: true },
        date: { type: Date, required: true, default: Date.now },
        method: { type: String, required: true }, // e.g., 'cash', 'card', 'online'
        transactionId: { type: String },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Invoice = model("Invoice", InvoiceSchema);

export default Invoice;

