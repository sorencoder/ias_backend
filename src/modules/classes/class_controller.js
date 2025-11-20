import { classService } from "./class_service.js";
import asyncHandler from "../../utils/async_handler.js";

// @desc    Create a new class
// @route   POST /api/classes
// @access  Admin
export const createClass = asyncHandler(async (req, res) => {
  const newClass = await classService.createClass(req.body);
  res.status(201).json({ success: true, data: newClass });
});

// @desc    Get all classes
// @route   GET /api/classes
// @access  Admin, Teacher
export const getAllClasses = asyncHandler(async (req, res) => {
  const classes = await classService.getAllClasses(req.query);
  res.status(200).json({ success: true, data: classes });
});

// @desc    Get a single class by ID
// @route   GET /api/classes/:id
// @access  Admin, Teacher
export const getClassById = asyncHandler(async (req, res) => {
  const singleClass = await classService.getClassById(req.params.id);
  if (!singleClass) {
    res.status(404);
    throw new Error("Class not found");
  }
  res.status(200).json({ success: true, data: singleClass });
});

// @desc    Update a class
// @route   PUT /api/classes/:id
// @access  Admin
export const updateClass = asyncHandler(async (req, res) => {
  const updatedClass = await classService.updateClass(req.params.id, req.body);
  if (!updatedClass) {
    res.status(404);
    throw new Error("Class not found");
  }
  res.status(200).json({ success: true, data: updatedClass });
});

// @desc    Delete a class
// @route   DELETE /api/classes/:id
// @access  Admin
export const deleteClass = asyncHandler(async (req, res) => {
  const deletedClass = await classService.deleteClass(req.params.id);
  if (!deletedClass) {
    res.status(404);
    throw new Error("Class not found");
  }
  res.status(200).json({ success: true, message: "Class deleted" });
});

