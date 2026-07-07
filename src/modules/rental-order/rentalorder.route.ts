import { Router } from "express";
import { rentalOrderController } from "./rentalorder.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import { rentalOrderSchema, updateOrderStatus } from "./rentalorder.validation";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post('/rentals',
  auth(Role.Admin, Role.Customer, Role.Provider),
  validateRequest(rentalOrderSchema),
  rentalOrderController.createOrder

)

router.get('/rentals', auth( Role.Customer), rentalOrderController.getOrders)
router.get('/rentals/:id',auth( Role.Customer), rentalOrderController.orderDetails)

// PRovider
router.get('/provider/orders',auth( Role.Provider), rentalOrderController.getOrdersForProvider)
router.patch('/provider/orders/:id', validateRequest(updateOrderStatus), auth( Role.Provider), rentalOrderController.updateOrderStatusByProvider)

export const rentalOrders = router;