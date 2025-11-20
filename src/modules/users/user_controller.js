import { userService } from "./user_service.js";
import asyncHandler from "../../utils/async_handler.js";

// @desc    Create a new user
// @route   POST /api/users
// @access  Admin
export const createUser = asyncHandler(async (req, res) => {
  // The service layer should handle the complex logic of creating a user and
  // their associated profile (Student, Teacher, etc.) in a transaction.
  const user = await userService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({ success: true, data: users });
});

// @desc    Get a single user by ID
// @route   GET /api/users/:id
// @access  Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ success: true, data: user });
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ success: true, data: user });
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ success: true, message: "User deleted" });
});
