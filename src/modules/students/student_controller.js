import { StudentService } from "./student_service.js";
import asyncHandler from "../../utils/async_handler.js";

// Create Student
export const createStudent = asyncHandler(async (req, res) => {
  const student = await StudentService.create(req.body);
  res.status(201).json({ success: true, data: student });
});

// Get All Students (with search and pagination)
export const getStudents = asyncHandler(async (req, res) => {
  const { page, limit, ...query } = req.query;
  const result = await StudentService.searchStudents({ page, limit, query });
  res.json({ success: true, ...result });
});

// Get Single Student
export const getStudent = asyncHandler(async (req, res) => {
  const student = await StudentService.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  res.json({ success: true, data: student });
});

// Update Student
export const updateStudent = asyncHandler(async (req, res) => {
  const student = await StudentService.update(req.params.id, req.body);

  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  res.json({ success: true, data: student });
});

// Delete Student
export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await StudentService.delete(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  res.json({ success: true, message: "Student deleted" });
});
