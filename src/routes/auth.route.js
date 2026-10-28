import { Router } from "express";
import {
  registerController,
  verifyEmailController,
  loginController,
  getMeController
} from "../controllers/auth.conroller.js";
import {
  registerValidationRules,
  LoginValidationRules,
} from "../validators/auth.validator.js";
import { authMiddleware } from "../middleware/auth.middleware..js";

const authRouter = Router();


authRouter.post("/register", registerValidationRules, registerController);
authRouter.post("/login", LoginValidationRules, loginController);
authRouter.get("/verify-email", verifyEmailController);
authRouter.get("/get-me", authMiddleware, getMeController);

export default authRouter;
