import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const result = await authService.createUser(payload)

  sendResponse(res, {
    message: "user register successfull",
    success: true,
    statusCode: HttpStatus.CREATED,
    data: { result }
  })
})

const loginUser = () => {

}


export const authController = {
  createUser,
  loginUser
} 