import { TeacherService } from "./teacher.service.js";
export const createTeacher = async (req, res) => {
  try {
    const t = await TeacherService.create(req.body);
    res.status(201).json(t);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export const listTeachers = async (req, res) => {
  try {
    const data = await TeacherService.list();
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
