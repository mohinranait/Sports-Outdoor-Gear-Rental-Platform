import { prisma } from "../../lib/prisma"
import { TGearInputs } from "./gear.validation"

// create
const createGear = async (payload: TGearInputs, userId: string) => {
  const gear = await prisma.gear.create({
    data: {
      ...payload,
      providerId: userId,
    },
    include:{
      category: true,
      provider: {
        omit: {
          password: true,
        }
      },
    }
  })
  return gear;
}


// update
const updateGear = async (gearId:string, payload: TGearInputs, providerId: string) => {
  const isExists = await prisma.gear.findUniqueOrThrow(
    {
      where: {
        id: gearId,
        providerId
      }
    }
  )

  const gear =  await prisma.gear.update(
    {
      where: {
        id: gearId,
        providerId
      },
      data:{
        ...payload,
        providerId: isExists.providerId,
      },
      include: {
        category: true,
        provider: true,
      }
    }
  )

  return gear;
}

// delete
const deleteGear = async (gearId: string, providerId: string) => {
  const isGear = await prisma.gear.findUniqueOrThrow(
    {
      where: {
        id: gearId,
        providerId
      }
    }
  )

  if (providerId !== isGear.providerId) {
    throw new Error("You can't delete this post")
  }

  await prisma.gear.delete(
    {
      where: { id: gearId }
    }
  )
}


export const gearService = {
  createGear,
  updateGear,
  deleteGear
}