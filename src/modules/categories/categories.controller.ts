import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { categorieService } from "./categories.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const createNewCategory = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await categorieService.createNewCategory(payload);
  sendResponse(res, {
    message: "Success",
    success: true,
    statusCode: HttpStatus.CREATED,
    data: result
  })
})
const getCategories = catchAsync(async (req: Request, res: Response) => {
  const { categories } = await categorieService.getCategories()
  sendResponse(res, {
    message: "Success",
    success: true,
    statusCode: HttpStatus.OK,
    data: { categories }
  })
})
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const catId = req.params.catId as string;
  const payload = req.body;
  const category = await categorieService.updateCategory(catId, payload)
  sendResponse(res, {
    message: "Success",
    success: true,
    statusCode: HttpStatus.OK,
    data: category
  })
})
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const catId = req.params.catId as string;

  const category = await categorieService.deleteCategory(catId)
  sendResponse(res, {
    message: "Success",
    success: true,
    statusCode: HttpStatus.OK,
    data: category
  })
})

export const categoryController = {
  createNewCategory,
  getCategories,
  updateCategory,
  deleteCategory
}