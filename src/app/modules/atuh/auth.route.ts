import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import { createUserZodValidation } from "../user/user.validation";

const router = Router();

router.post("/register",
     validateRequest(createUserZodValidation), 
     authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logout);
export const authRouter = router;