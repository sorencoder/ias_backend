import User from "./user_model.js";

export default {
  createUser: (data) => User.create(data),
  getUsers: () => User.find(),
  getUserById: (id) => User.findById(id),
  updateUser: (id, data) => User.findByIdAndUpdate(id, data, { new: true }),
  deleteUser: (id) => User.findByIdAndDelete(id),
};
