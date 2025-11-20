import mongoose from "mongoose";
import User from "./user_model.js";
import Student from "../students/student_model.js";
import Teacher from "../teachers/teacher_model.js";
// Import other profile models as needed
// import Parent from "../parents/parent_model.js";
// import Accountant from "../accountants/accountant_model.js";

const profileModels = {
  Student,
  Teacher,
  // Parent,
  // Accountant,
};

const createUser = async (userData) => {
  const { role, profileData, ...userFields } = userData;

  // For 'Admin' role, profile is not required.
  if (role === "Admin") {
    return await User.create({ ...userFields, role });
  }

  const ProfileModel = profileModels[role];
  if (!ProfileModel) {
    throw new Error(`Profile model for role '${role}' not found.`);
  }
  if (!profileData) {
    throw new Error(`Profile data is required for role '${role}'.`);
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const profile = new ProfileModel(profileData);
    await profile.save({ session });

    const user = new User({
      ...userFields,
      role,
      profile: profile._id,
    });
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    return user;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getUsers = () => User.find().populate("profile");

const getUserById = (id) => User.findById(id).populate("profile");

const updateUser = (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true });

const deleteUser = async (id) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(id).session(session);
    if (!user) {
      throw new Error("User not found");
    }

    // If there's a linked profile, delete it as well
    if (user.profile) {
      const ProfileModel = profileModels[user.role];
      if (ProfileModel) {
        await ProfileModel.findByIdAndDelete(user.profile).session(session);
      }
    }

    await User.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    session.endSession();

    return { message: "User and associated profile deleted successfully." };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


export const userService = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
