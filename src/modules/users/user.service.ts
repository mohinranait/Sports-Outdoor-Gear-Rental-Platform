import { prisma } from "../../lib/prisma"
import { AdminUserUpdateInput } from "./user.validation";

const getAllUsers = async() => {
  const users = await prisma.user.findMany(
    {
      omit: {
        password: true,
      }
    }
  );

  return {users}
}


// update user
const updateUser = async (id:string, payload:AdminUserUpdateInput, isAdmin:boolean) => {

  const isExists  = await prisma.user.findUnique(
    {
      where:{id}
    }
  )

  if(!isExists){
    throw new Error("User not found")
  }

  if(!isAdmin){
    throw new Error("You can not Update user status")
  }

  const status =  payload.status;

  const user = await prisma.user.update(
    {
      where: {id: isExists.id},
      data:{
        ...isExists,
        status
      },
      omit:{
        password: true,
      }
    }
  )

  return user;
}


export const userService = {
  getAllUsers,
  updateUser,
}