import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { gearService } from "./gear.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const createGear = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const userId = req.user?.id as string;
  const result = await gearService.createGear(payload, userId)
  sendResponse(res, {
    message: "Create successfull",
    statusCode: HttpStatus.CREATED,
    success: true,
    data: result,
  })
})
const updateGear = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const providerId = req.user?.id as string;
  const gearId = req.params.gearId as string;
  const result = await gearService.updateGear(gearId, payload, providerId)
  sendResponse(res, {
    message: "Update successfull",
    statusCode: HttpStatus.OK,
    success: true,
    data: result,
  })
})
const deleteGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = req.user?.id as string;
  const gearId = req.params.gearId as string;
  const result = await gearService.deleteGear(gearId, providerId)
  sendResponse(res, {
    message: "Delete successfull",
    statusCode: HttpStatus.OK,
    success: true,
    data: result,
  })
})


export const gearController = {
  createGear,
  updateGear,
  deleteGear,
}