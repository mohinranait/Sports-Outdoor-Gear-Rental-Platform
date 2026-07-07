import config from "../../config"
import { Prisma } from "../../../generated/prisma/client";
import { verifyPayment } from "./payment.utils";
import { prisma } from "../../lib/prisma";




export type RentalOrderWithCustomer = Prisma.RentalOrderGetPayload<{
  include: {
    customer: true
  };
}>;

const sslPayment = async (order: RentalOrderWithCustomer ) => {

  const transactionId = order.transactionId;

  const paymentPayload = {
    store_id: config.ssl_store_id,
    store_passwd: config.ssl_store_password,
    total_amount: order?.totalAmount,
    currency: "BDT",
    tran_id: transactionId,
    success_url: `${config.api_url}/api/payment/success`,
    fail_url: `${config.api_url}/api/payment/fail`,
    cancel_url: `${config.api_url}/api/payment/cancel`,
    cus_name: order?.customer.name,
    cus_email: order?.customer.email || 'N/A',
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: 1000,
    cus_country: "Bangladesh",
    cus_phone: order?.customer?.phone,

    multi_card_name: "mastercard,visacard,amexcard",

  }

  const body = new URLSearchParams();

  Object.entries(paymentPayload).forEach(([key, value]) => {
    body.append(key, String(value));
  });

  const res = await fetch(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  const data = await res.json();

  return data;
}



// success payment 
const verifySSLPayment = async(valId:string) => {
  const payment = await verifyPayment(valId)
  const transactionId = payment.tran_id;
  const paymentStatus = payment.status;
  const tran_date = payment.tran_date;
  if(paymentStatus === "VALID"){

    await prisma.rentalOrder.update(
      {
        where:{
          transactionId: transactionId
        },
        data: {
          status: "PAID",
          tran_date: new Date(tran_date),
        }
      }
    )


  }else if(paymentStatus === 'FAILED'){

  }else if(paymentStatus === 'CANCELLED'){

  }

  return paymentStatus;
}

export const paymentService = {
  sslPayment,
  verifySSLPayment,
}