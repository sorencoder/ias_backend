import Invoice from "./fee.model.js";

export const FeeService = {
  async createInvoice(data) {
    // generate invoiceNo: YYYYMM-XXXX
    const yearMonth = new Date().toISOString().slice(0, 7).replace("-", "");
    const count = await Invoice.countDocuments({
      invoiceNo: new RegExp(`^${yearMonth}`),
    });
    data.invoiceNo = `${yearMonth}-${String(count + 1).padStart(4, "0")}`;
    return await Invoice.create(data);
  },

  async payInvoice(id, payment) {
    const inv = await Invoice.findById(id);
    if (!inv) throw new Error("Invoice not found");
    inv.payments.push(payment);
    const paidSum = inv.payments.reduce((s, p) => s + p.amount, 0);
    if (paidSum >= inv.totalAmount) inv.paid = true;
    await inv.save();
    return inv;
  },

  async getDuesByStudent(studentId) {
    return await Invoice.find({ studentId, paid: false });
  },
};
