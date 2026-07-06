import { Router } from "express";
import { gearController } from "./gear.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { gearSchema } from "./gear.validation";

const router = Router();


router.post('/',
  validateRequest(gearSchema),
  auth(Role.Provider, Role.Admin),
  gearController.createGear
)
router.put('/:gearId',
  validateRequest(gearSchema),
  auth(Role.Provider, Role.Admin),
  auth(Role.Provider, Role.Admin), gearController.updateGear
)
router.delete('/:gearId', auth(Role.Provider, Role.Admin), gearController.deleteGear)


export const gearRoutes = router;