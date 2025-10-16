import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register",
    //  validateRequest(createUserZodValidation), 
     authController.registerUser);
router.post("/login", authController.loginUser);
export const authRouter = router;