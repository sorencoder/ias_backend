import Class from "./class_model.js";

const createClass = async (data) => {
  return await Class.create(data);
};

const getAllClasses = async (query) => {
  // Basic filtering can be added here, e.g., by academicYear
  const filter = {};
  if (query.academicYear) {
    filter.academicYear = query.academicYear;
  }
  if (query.teacherId) {
    filter.classTeacher = query.teacherId;
  }

  return await Class.find(filter)
    .populate("classTeacher", "firstName lastName email")
    .populate("subjects", "name code");
};

const getClassById = async (id) => {
  return await Class.findById(id)
    .populate("classTeacher", "firstName lastName email")
    .populate("subjects", "name code")
    .populate("students", "firstName lastName academic.enrollNo");
};

const updateClass = async (id, data) => {
  return await Class.findByIdAndUpdate(id, data, { new: true });
};

const deleteClass = async (id) => {
  return await Class.findByIdAndDelete(id);
};


export const classService = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
