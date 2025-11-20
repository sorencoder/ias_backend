import mongoose from "mongoose";
import User from "../users/user_model.js";
import Student from "../students/student_model.js";
import { generateToken } from "../../utils/jwt.js";

const login = async ({ loginIdentifier, password }) => {
  let user;

  // Check if loginIdentifier is an email
  if (loginIdentifier.includes("@")) {
    user = await User.findOne({ email: loginIdentifier }).select("+password");
  } else if (/^\d{12}$/.test(loginIdentifier)) {
    // Check if loginIdentifier is an Aadhar number
    const student = await Student.findOne({ aadharNo: loginIdentifier });
    if (student) {
      user = await User.findOne({
        profile: student._id,
        role: "Student",
      }).select("+password");
    }
  } else {
    // Fallback to searching by email if it's not clearly an aadhar
    user = await User.findOne({ email: loginIdentifier }).select("+password");
  }


  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  if (user.status !== "active") {
    throw new Error(`User account is ${user.status}. Please contact admin.`);
  }

  const token = generateToken(user);

  // return user and token
  return {
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
      profile: user.profile,
    },
    token,
  };
};

export const authService = {
  login,
};
