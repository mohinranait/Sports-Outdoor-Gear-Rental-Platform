import { Router } from "express";
import { gearController } from "./gear.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { gearSchema } from "./gear.validation";

const router = Router();


router.post('/provider/gear',
  validateRequest(gearSchema),
  auth(Role.Provider, Role.Admin),
  gearController.createGear
)
router.put('/provider/gear/:gearId',
  validateRequest(gearSchema),
  auth(Role.Provider, Role.Admin),
  auth(Role.Provider, Role.Admin), gearController.updateGear
)
router.delete('/provider/gear/:gearId', auth(Role.Provider, Role.Admin), gearController.deleteGear)

// Public route
router.get('/gear',  gearController.getAllGears)
router.get('/gear/:gearId', gearController.getSingleGear)


export const gearRoutes = router;