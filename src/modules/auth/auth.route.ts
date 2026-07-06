import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { loginSchema, registerSchema } from "./auth.validation";

const router = Router();

router.post('/register',
    validateRequest(registerSchema),
  authController.createUser
)

router.post('/login',
  validateRequest(loginSchema),
authController.loginUser)

export const authRouter = router;