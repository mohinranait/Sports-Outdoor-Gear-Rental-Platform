import { prisma } from "../../lib/prisma";
import { TRentalOrderInput } from "./rentalorder.validation"

const createOrder = async (payload:TRentalOrderInput,customerId:string) => {
  const {gearId,quantity} = payload;
  const isExists = await prisma.gear.findUnique({where:{id:gearId}});
  if(!isExists){
    throw new Error("Gear not found")
  }

  const order = await prisma.rentalOrder.create(
    {
      data: {
        ...payload,
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
      where: {customerId}
    }
  );
  return {ordrs}
}

// single order
const orderDetails = async (orderId:string, customerId:string) => {
  const order = await prisma.rentalOrder.findUnique(
    {
      where: {
        id: orderId,
        customerId
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