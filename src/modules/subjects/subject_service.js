import mongoose from "mongoose";
import Subject from "./subject_model.js";

const createSubject = async (data) => {
  try {
    return await Subject.create(data);
  } catch (error) {
    throw new Error(`Subject creation failed: ${error.message}`);
  }
};

const getAllSubjects = async () => {
  try {
    return await Subject.find()
      .populate("teachers", "firstName lastName email")
      .lean(); // boosts performance
  } catch (error) {
    throw new Error(`Unable to fetch subjects: ${error.message}`);
  }
};

const getSubjectById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid subject ID");
    }

    return await Subject.findById(id)
      .populate("teachers", "firstName lastName email")
      .lean();
  } catch (error) {
    throw new Error(`Error fetching subject: ${error.message}`);
  }
};

const updateSubject = async (id, data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid subject ID");
    }

    return await Subject.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(`Error updating subject: ${error.message}`);
  }
};

const deleteSubject = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid subject ID");
    }

    return await Subject.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Error deleting subject: ${error.message}`);
  }
};

export const subjectService = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
