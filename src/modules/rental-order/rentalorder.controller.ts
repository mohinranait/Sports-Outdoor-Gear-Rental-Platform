import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { rentalOrderService } from "./rentalorder.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const customerId = req.user?.id as string;
  const result = await rentalOrderService.createOrder(payload, customerId)
  sendResponse(res, {
    message: "Place successfull",
    statusCode: HttpStatus.CREATED,
    success: true,
    data: result,
  })
})
const getOrders = catchAsync(async (req: Request, res: Response) => {
   const customerId = req.user?.id as string;
    const {ordrs} = await rentalOrderService.getOrders(customerId);
    sendResponse(res, {
    message: "Successfull",
    statusCode: HttpStatus.OK,
    success: true,
    data: {ordrs},
  })
 })

// get order details
const orderDetails = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.id as string;
  const customerId = req.user?.id as string;
  const result = await rentalOrderService.orderDetails(orderId, customerId);
  sendResponse(res, {
    message: "Successfull",
    statusCode: HttpStatus.OK,
    success: true,
    data: result,
  })
})


export const rentalOrderController = {
  createOrder,
  getOrders,
  orderDetails
}