import userService from "./user_service.js";

export default {
  create: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
};
