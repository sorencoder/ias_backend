import express from "express";
import { authController } from "./auth_controller.js";

const router = express.Router();

router.post("/login", authController.login);

export default router;
