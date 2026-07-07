import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { updateUserSchemaAdmin } from "./user.validation";

const router = Router();

router.get('/admin/users', auth(Role.Admin), userController.getAllUsers)

router.patch('/admin/users/:id',
  validateRequest(updateUserSchemaAdmin) ,
  auth(Role.Admin), userController.updateUser
)


export const userRoutes = router;