import { ClassService } from "./class.service.js";
export const createClass = async (req, res) => {
  try {
    const c = await ClassService.create(req.body);
    res.status(201).json(c);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export const listClasses = async (req, res) => {
  try {
    const data = await ClassService.list();
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
