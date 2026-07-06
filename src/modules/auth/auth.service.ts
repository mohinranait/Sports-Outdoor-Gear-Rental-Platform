import config from "../../config";
import { prisma } from "../../lib/prisma";
import { RegisterInput } from "./auth.validation"
import bcrypt from "bcryptjs"

const createUser = async (payload: RegisterInput) => {
  const { email, password } = payload;
  const isExistsUser = await prisma.user.findUnique(
    { where: { email } }
  )

  if (isExistsUser) {
    throw new Error("User already exists")
  }

  const hasPass = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

  const newUser = await prisma.user.create(
    {
      data: {
        ...payload,
        password: hasPass
      }
    }
  )

  const user = await prisma.user.findUnique(
    {
      where: { id: newUser.id },
      omit: {
        password: true,
      }
    },

  )

  return user;
}


const loginUser = async () => {

}


export const authService = {
  createUser,
  loginUser,
}