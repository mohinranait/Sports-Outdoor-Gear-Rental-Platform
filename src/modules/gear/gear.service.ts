import { GearWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma"
import { IGearQuery } from "./gear.interface";
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
        id: gearId
      }
    }
  )


  if(providerId !== isExists.providerId){
    throw new Error("You can't owner this gear")
  }

  const gear =  await prisma.gear.update(
    {
      where: {
        id: gearId
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
    throw new Error("You can't delete this gear")
  }

  await prisma.gear.delete(
    {
      where: { id: gearId }
    }
  )
}

// get single gear
const getSingleGear = async  (gearId: string) => {
  const gear = await prisma.gear.findUniqueOrThrow(
    {
      where: {id: gearId},
      include: {
        category: true,
        provider: {
          omit: {
            password: true,
          }
        }
      }
    }
  )
  return gear;
}

// get all gears
const getAllGears = async (query: IGearQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : 'createdAt';
  const sortOrder = query.sortOrder ? query.sortOrder : "desc"

  const andConditions: GearWhereInput[] = []

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: 'insensitive'
          },
        },
        {
          description: {
            contains: query.searchTerm,
            mode: 'insensitive'
          }
        },
         
      ]
    })
  }

  if (query.title) {
    andConditions.push({
      title: query.title,
    })
  }
  if (query.description) {
    andConditions.push({
      description: query.description,
    })
  }

  if (query.brand) {
    andConditions.push({
      brand: query.brand,
    })
  }

  if (query.providerId) {
    andConditions.push({
      providerId: query.providerId
    })
  }


  if (query.categoryId) {
    andConditions.push({
      categoryId: query.categoryId
    })
  }


if (query.minPrice || query.maxPrice) {
  andConditions.push({
    pricePerDay: {
      gte: query.minPrice ? Number(query.minPrice) : undefined,
      lte: query.maxPrice ? Number(query.maxPrice) : undefined,
    },
  });
}


  if (query.status) {
    andConditions.push({
      status: query.status
    })
  }



  const gears = await prisma.gear.findMany(
    {

      where: {
        AND: andConditions,
      },


      include: {
        provider: {
          omit: {
            password: true
          }
        },
        category: true,
      },
      take: limit,
      skip: skip,
      orderBy: {
        [sortBy]: sortOrder,
      }
    }
  );

  const totalGearCount = await prisma.gear.count(
    {
      where: {
        AND: andConditions
      }
    }
  )
  return {
    data:gears,
    meta: {
      page,
      limit,
      total: totalGearCount,
      totalPages: Math.ceil(totalGearCount/ limit)
    }
  }
}


export const gearService = {
  createGear,
  updateGear,
  deleteGear,
  getSingleGear,
  getAllGears
}