import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { reviewSchema } from "./review.validation";

const router = Router();

router.post('/',
  validateRequest(reviewSchema),
  auth(Role.Customer), reviewController.createReview
)

export const reviewRoutes = router; 