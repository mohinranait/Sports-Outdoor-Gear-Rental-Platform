import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { registerSchema } from "./auth.validation";

const router = Router();

router.post('/register',
    validateRequest(registerSchema),
  authController.createUser
)

router.post('/login', authController.loginUser)

export const authRouter = router;