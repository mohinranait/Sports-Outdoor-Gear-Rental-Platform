import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { RegisterInput, TLoginInput } from "./auth.validation"
import bcrypt from "bcryptjs"

// Create user
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

// login user
const loginUser = async (payload: TLoginInput) => {
  const { email, password } = payload;

  const user = await prisma.user.findFirstOrThrow(
    {
      where: { email }
    }
  )

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Password is incorrect")
  }

  const tokenPayload = {
    id: user.id,
    email: user?.email,
    role: user.role,
    status: user.status,
  }

  const accessToken = jwtUtils.createToken(
    tokenPayload,
    config.jwt_access_secret,
    { expiresIn: "1d" }
  )
  
  return  accessToken
}


const userProfile = async (userId:string) => {
  const user = await prisma.user.findUniqueOrThrow(
    {
      where: {id:userId},
      omit:{
        password : true,
      }
    }
  )

  return user;
}


export const authService = {
  createUser,
  loginUser,
  userProfile,
}