import z from "zod";


export const rentalOrderSchema = z.object({
  body: z.object({
    gearId: z.string().uuid("Invalid gear id"),
   
    startDate: z.coerce.date({
      required_error: "Start date is required",
    }),

    endDate: z.coerce.date({
      required_error: "End date is required",
    }),

    totalDays: z.coerce.number().positive(),

    quantity: z.coerce.number().positive(), // quantity
  })
})

export type TRentalOrderInput = z.infer<typeof rentalOrderSchema>['body'];





export const updateOrderStatus = z.object({
  body: z.object({
    status: z.enum(['PLACED',"CONFIRMED","PAID","PICKED_UP","RETURNED","CANCELLED"])
  })
}) 

export type ProviderUpdateOrderStatus = z.infer<typeof updateOrderStatus>['body'];


