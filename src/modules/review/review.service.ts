import { prisma } from "../../lib/prisma";
import { TReviewInput } from "./review.validation"

const createReview = async (payload:TReviewInput, customerId:string) => {
  const {orderId,rating,comment} = payload;
  const isOrder = await prisma.rentalOrder.findUnique(
    {
      where: {id: orderId,customerId}
    }
  )

  if(!isOrder){
    throw new Error("Invalid request")
  }


  if(isOrder.status !== "RETURNED"){
    throw new Error('Reviews can only be submitted after the rented gear has been successfully returned.')
  }


  const review = await prisma.review.create(
    {
      data: {
        customerId,
        gearId: isOrder.gearId,
        rating,
        comment
      },
      include:{
        customer: {
          omit: {
            password: true,
          }
        },
        gearItem:true,
      }
    }
  )
  return review;
}

export const reviewService = {
  createReview
}