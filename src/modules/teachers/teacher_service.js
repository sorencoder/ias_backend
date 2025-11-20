import Teacher from "./teacher.model.js";
export const TeacherService = {
  create: (d) => Teacher.create(d),
  list: () => Teacher.find(),
  get: (id) => Teacher.findById(id).populate("subjects"),
};
