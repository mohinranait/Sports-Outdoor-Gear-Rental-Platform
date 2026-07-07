import { prisma } from "../../lib/prisma";
import { nanoid } from "nanoid";
import { ProviderUpdateOrderStatus, TRentalOrderInput } from "./rentalorder.validation"
import { paymentService } from "../payment/payment.service";

const createOrder = async (payload:TRentalOrderInput,customerId:string) => {
  const {gearId,quantity,} = payload;

  const isExists = await prisma.gear.findUnique({where:{id:gearId}});
  if(!isExists){
    throw new Error("Gear not found")
  }

   const transactionId = `TXN-${nanoid(12)}`;

  const totalAmount = Number(isExists.pricePerDay) * Number(quantity) * Number(payload.totalDays);
  const order = await prisma.rentalOrder.create(
    {
      data: {
        ...payload,
        startDate: new Date(payload.startDate),
        endDate: new Date(payload.endDate),
        customerId,
        providerId: isExists.providerId,
        pricePerDay: isExists.pricePerDay,
        totalAmount: totalAmount,
        payments: {
          create:{
            amount : totalAmount,
            transactionId,
          }
        }
        
      },
      include:{
        customer:true,
        provider: true,
      }
    }
  )


  const payment = await paymentService.sslPayment(order, transactionId )
    

 return {
  paymentUrl: payment.GatewayPageURL,
};

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
        payments:true,
      }
    }
  )

  return order;
}



// get all orders for provider
const getProviderOrders = async (providerId:string) => {
  const orders = await prisma.rentalOrder.findMany(
    {
      where: {providerId},
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
        payments:true,
      }
    }
  )

  return {orders}
}

//get single order provider
const updateOrderStatusByProvider = async (providerId: string, orderId:string, payload: ProviderUpdateOrderStatus) => {
  
  const isExistsOrder = await prisma.rentalOrder.findUniqueOrThrow(
    {
      where: {
        providerId,
        id: orderId
      },
      
    }
  )


  const {status} = payload;

  const order = await prisma.rentalOrder.update(
    {
      where: {
        id: orderId,
      },
      data: {
        ...isExistsOrder,
        status
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

  return order
}


// admin ordrs 
const getAllOrdersForAdmin = async () => {
  const orders = await prisma.rentalOrder.findMany();
  return {orders}
}

export const rentalOrderService = {
  createOrder,
  getOrders,
  orderDetails,
  getProviderOrders,
  updateOrderStatusByProvider,
  getAllOrdersForAdmin
}