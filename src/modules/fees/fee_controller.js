import { feeService } from "./fee_service.js";
import asyncHandler from "../../utils/async_handler.js";

// @desc    Create a new invoice
// @route   POST /api/fees
// @access  Admin, Accountant
export const createInvoice = asyncHandler(async (req, res) => {
  const invoice = await feeService.createInvoice(req.body, req.user.id);
  res.status(201).json({ success: true, data: invoice });
});

// @desc    Get all invoices
// @route   GET /api/fees
// @access  Admin, Accountant
export const getAllInvoices = asyncHandler(async (req, res) => {
  const invoices = await feeService.getAllInvoices(req.query);
  res.status(200).json({ success: true, data: invoices });
});

// @desc    Get a single invoice by ID
// @route   GET /api/fees/:id
// @access  Admin, Accountant, Parent (own child)
export const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await feeService.getInvoiceById(req.params.id);
  if (!invoice) {
    res.status(404);
    throw new Error("Invoice not found");
  }
  // Add authorization logic here to check if a parent can view this
  res.status(200).json({ success: true, data: invoice });
});

// @desc    Update an invoice
// @route   PUT /api/fees/:id
// @access  Admin, Accountant
export const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await feeService.updateInvoice(req.params.id, req.body);
  if (!invoice) {
    res.status(404);
    throw new Error("Invoice not found");
  }
  res.status(200).json({ success: true, data: invoice });
});

// @desc    Delete an invoice
// @route   DELETE /api/fees/:id
// @access  Admin, Accountant
export const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await feeService.deleteInvoice(req.params.id);
  if (!invoice) {
    res.status(404);
    throw new Error("Invoice not found");
  }
  res.status(200).json({ success: true, message: "Invoice deleted" });
});


// @desc    Make a payment on an invoice
// @route   POST /api/fees/:id/pay
// @access  Admin, Accountant, Parent
export const payInvoice = asyncHandler(async (req, res) => {
  const invoice = await feeService.payInvoice(req.params.id, req.body.payment);
  res.status(200).json({ success: true, data: invoice });
});

// @desc    Get all due invoices for a student
// @route   GET /api/fees/dues/:studentId
// @access  Admin, Accountant, Parent (own child)
export const getDues = asyncHandler(async (req, res) => {
  const dues = await feeService.getDuesByStudent(req.params.studentId);
  // Add authorization logic here to check if a parent can view this
  res.status(200).json({ success: true, data: dues });
});

