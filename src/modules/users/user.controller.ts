import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";
import HttpStatus from "http-status";
import { Role } from "../../../generated/prisma/enums";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { users } = await userService.getAllUsers()

  sendResponse(res, {
    message: "Get Successfull",
    statusCode: HttpStatus.OK,
    success: true,
    data: { users },
  })
})


// update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const isAdmin = req.user?.role === Role.Admin;
  const body = req.body;
  const userId = req.params.id as string;

  const result = await userService.updateUser(userId, body, isAdmin);

  sendResponse(res, {
    message: "Update Successfull",
    statusCode: HttpStatus.OK,
    success: true,
    data: result,
  })
})


export const userController = {
  getAllUsers,
  updateUser
}