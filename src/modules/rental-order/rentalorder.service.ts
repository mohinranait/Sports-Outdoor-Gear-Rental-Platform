import { prisma } from "../../lib/prisma";
import { TRentalOrderInput } from "./rentalorder.validation"

const createOrder = async (payload:TRentalOrderInput,customerId:string) => {
  const {gearId,quantity,} = payload;
  console.log({payload});
  
  const isExists = await prisma.gear.findUnique({where:{id:gearId}});
  if(!isExists){
    throw new Error("Gear not found")
  }

  const order = await prisma.rentalOrder.create(
    {
      data: {
        ...payload,
        startDate: new Date(payload.startDate),
        endDate: new Date(payload.endDate),
        customerId,
        providerId: isExists.providerId,
        pricePerDay: isExists.pricePerDay,
        totalAmount: isExists.pricePerDay * quantity
      }
    }
  )

  return order

}

// get orders for customers
const getOrders = async (customerId:string) => {

  const ordrs = await prisma.rentalOrder.findMany(
    {
      where: {customerId},
      include: {
        gear: true,
        customer: {
          omit: {
            password: true,
          }
        },
        provider: {
          omit: {
            password: true,
          }
        },
      }
    }
  );
  return {ordrs}
}

// single order
const orderDetails = async (orderId:string, customerId:string) => {
  const order = await prisma.rentalOrder.findUniqueOrThrow(
    {
      where: {
        id: orderId,
        customerId
      },
       include: {
        gear: true,
        customer: {
          omit: {
            password: true,
          }
        },
        provider: {
          omit: {
            password: true,
          }
        },
      }
    }
  )

  return order;
}


export const rentalOrderService = {
  createOrder,
  getOrders,
  orderDetails
}