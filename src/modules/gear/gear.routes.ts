import { Router } from "express";
import { gearController } from "./gear.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { gearSchema } from "./gear.validation";

const router = Router();


router.post('/provider/gear',
  validateRequest(gearSchema),
  auth(Role.Provider),
  gearController.createGear
)
router.put('/provider/gear/:gearId',
  validateRequest(gearSchema),
  auth(Role.Provider),
   gearController.updateGear
)
router.delete('/provider/gear/:gearId', auth(Role.Provider), gearController.deleteGear)

// Public route
router.get('/gear',  gearController.getAllGears)
router.get('/gear/:id', gearController.getSingleGear)


export const gearRoutes = router;