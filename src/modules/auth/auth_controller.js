import { authService } from "./auth_service.js";
import asyncHandler from "../../utils/async_handler.js";

const login = asyncHandler(async (req, res) => {
  const { loginIdentifier, password } = req.body;

  if (!loginIdentifier || !password) {
    res.status(400);
    throw new Error("Please provide email/Aadhar and password");
  }

  const result = await authService.login({ loginIdentifier, password });

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: result,
  });
});

export const authController = {
  login,
};
