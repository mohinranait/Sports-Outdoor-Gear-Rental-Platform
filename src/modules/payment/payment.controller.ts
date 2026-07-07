import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { paymentService } from "./payment.service";

const verifyPayment = catchAsync(async(req:Request , res:Response ,) => {
    const body = req.body;
    // console.log({body});

    const result = await paymentService.verifySSLPayment(body.val_id)
    
     sendResponse(res, {
      message: `Payment ${result}`,
      success: true,
      statusCode: HttpStatus.OK,
      data: result
    })
})



export const paymentController = {
  verifyPayment,
}