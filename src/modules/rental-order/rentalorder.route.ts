import { Router } from "express";
import { rentalOrderController } from "./rentalorder.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { rentalOrderSchema } from "./rentalorder.validation";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post('/rentals',
  auth(Role.Admin, Role.Customer, Role.Provider),
  validateRequest(rentalOrderSchema),
  rentalOrderController.createOrder

)
router.get('/rentals', rentalOrderController.getOrders)
router.post('/rentals/:id', rentalOrderController.orderDetails)

export const rentalOrders = router;