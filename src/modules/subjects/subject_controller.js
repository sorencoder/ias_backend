import { subjectService } from "./subject_service.js";
import asyncHandler from "../../utils/async_handler.js";
import Teacher from "../teachers/teacher_model.js";

// @desc    Create a new subject
// @route   POST /api/subjects
// @access  Admin
export const createSubject = asyncHandler(async (req, res) => {
  const subject = await subjectService.createSubject(req.body);
  res.status(201).json({ success: true, data: subject });
});

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Admin, Teacher
export const getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await subjectService.getAllSubjects().populate("teachers");
  res.status(200).json({ success: true, data: subjects });
});

// @desc    Get a single subject by ID
// @route   GET /api/subjects/:id
// @access  Admin, Teacher
export const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.params.id);
  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }
  res.status(200).json({ success: true, data: subject });
});

// @desc    Update a subject
// @route   PUT /api/subjects/:id
// @access  Admin
export const updateSubject = asyncHandler(async (req, res) => {
  const subject = await subjectService.updateSubject(req.params.id, req.body);
  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }
  res.status(200).json({ success: true, data: subject });
});

// @desc    Delete a subject
// @route   DELETE /api/subjects/:id
// @access  Admin
export const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await subjectService.deleteSubject(req.params.id);
  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }
  res.status(200).json({ success: true, message: "Subject deleted" });
});
