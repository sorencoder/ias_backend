import Invoice from "./fee_model.js";

const createInvoice = async (data, createdBy) => {
  const yearMonth = new Date().toISOString().slice(0, 7).replace("-", "");
  const count = await Invoice.countDocuments({
    invoiceNo: new RegExp(`^${yearMonth}`),
  });
  const invoiceNo = `${yearMonth}-${String(count + 1).padStart(4, "0")}`;

  return await Invoice.create({ ...data, invoiceNo, createdBy });
};

const getAllInvoices = async (query) => {
  const filter = {};
  if (query.studentId) filter.studentId = query.studentId;
  if (query.status) filter.status = query.status;

  return await Invoice.find(filter)
    .populate("studentId", "firstName lastName academic.enrollNo")
    .populate("createdBy", "firstName lastName email");
};

const getInvoiceById = async (id) => {
  return await Invoice.findById(id)
    .populate("studentId", "firstName lastName academic.enrollNo")
    .populate("createdBy", "firstName lastName email");
};

const updateInvoice = async (id, data) => {
  return await Invoice.findByIdAndUpdate(id, data, { new: true });
};

const deleteInvoice = async (id) => {
  return await Invoice.findByIdAndDelete(id);
};

const payInvoice = async (id, payment) => {
  const invoice = await Invoice.findById(id);
  if (!invoice) {
    throw new Error("Invoice not found");
  }
  if (invoice.status === 'paid' || invoice.status === 'void') {
    throw new Error(`Cannot make payment on a '${invoice.status}' invoice.`);
  }

  invoice.payments.push(payment);
  const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);

  if (totalPaid >= invoice.totalAmount) {
    invoice.status = "paid";
    invoice.paid = true;
  }

  await invoice.save();
  return invoice;
};

const getDuesByStudent = async (studentId) => {
  return await Invoice.find({
    studentId,
    status: { $in: ["sent", "overdue"] },
  });
};

export const feeService = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  payInvoice,
  getDuesByStudent,
};
