import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const result = await authService.createUser(payload)

  sendResponse(res, {
    message: "Register successfull",
    success: true,
    statusCode: HttpStatus.CREATED,
    data: { result }
  })
})

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const accessToken = await authService.loginUser(payload);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 // 24 hours or 1 day
  })

 
  sendResponse(res, {
    message: "Login success",
    success: true,
    statusCode: HttpStatus.OK,
    data:  {accessToken}, 
  })
})


const userProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;

  const result = await authService.userProfile(userId)


sendResponse(res, {
    message: "Login success",
    success: true,
    statusCode: HttpStatus.OK,
    data:  result
  })
})


export const authController = {
  createUser,
  loginUser,
  userProfile,
} 