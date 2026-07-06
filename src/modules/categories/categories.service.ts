import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { TCategoryInput } from "./categories.validation"

// create categories
const createNewCategory = async (payload: TCategoryInput) => {
  const { name } = payload;
  const isExists = await prisma.category.findFirst(
    {
      where: { name }
    }
  )

  if (isExists) {
    throw new Error("This category already exists");
  }

  const category = await prisma.category.create(
    {
      data: {
        name,
        description: payload.description,
      }
    }
  )

  return category


}

const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return { categories }
}
const updateCategory = async (catId: string, payload: TCategoryInput) => {

  const category = await prisma.category.update(
    {
      where: { id: catId },
      data: {
        ...payload,
      }
    }
  )

  return category;
}
const deleteCategory = async (catId: string) => {
  const category = await prisma.category.delete(
    {
      where: { id: catId }
    }
  )
  return category
}


export const categorieService = {
  createNewCategory,
  getCategories,
  updateCategory,
  deleteCategory
}