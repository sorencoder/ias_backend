import ClassModel from "./class.model.js";
export const ClassService = {
  async create(data) {
    return await ClassModel.create(data);
  },
  async list() {
    return await ClassModel.find();
  },
  async get(id) {
    return await ClassModel.findById(id).populate("classTeacher");
  },
};
