import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { loginSchema, registerSchema } from "./auth.validation";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post('/register',
    validateRequest(registerSchema),
  authController.createUser
)

router.post('/login',
  validateRequest(loginSchema),
authController.loginUser)

router.get('/me', auth(Role.Admin,Role.Customer,Role.Provider), authController.userProfile)

export const authRouter = router;