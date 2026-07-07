import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { reviewService } from "./review.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const createReview = catchAsync(async (req: Request , res: Response) => {
  const payload = req.body;
  const customerId = req.user?.id as string;
  const result = await reviewService.createReview(payload, customerId)
   sendResponse(res, {
    message: "Successfull",
    statusCode: HttpStatus.CREATED,
    success: true,
    data: result,
  })
})

export const reviewController = {
  createReview
}