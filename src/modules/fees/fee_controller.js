import { FeeService } from "./fee.service.js";

export const createInvoice = async (req, res) => {
  try {
    const inv = await FeeService.createInvoice(req.body);
    res.status(201).json({ success: true, data: inv });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const payInvoice = async (req, res) => {
  try {
    const inv = await FeeService.payInvoice(req.params.id, req.body.payment);
    res.json({ success: true, data: inv });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDues = async (req, res) => {
  try {
    const dues = await FeeService.getDuesByStudent(req.params.studentId);
    res.json({ success: true, data: dues });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
