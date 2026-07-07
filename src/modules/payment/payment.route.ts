import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post('/payment/success', paymentController.verifyPayment  )
router.post('/payment/cancel', paymentController.verifyPayment  )
router.post('/payment/fail', paymentController.verifyPayment  )

export const paymentRoutes = router;