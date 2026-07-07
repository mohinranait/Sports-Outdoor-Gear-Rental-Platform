import z from "zod";

export const reviewSchema = z.object({
  body: z.object({
    orderId: z.string().uuid("Invalid order id"),
    comment: z.string().optional().nullable(),
    rating: z.coerce
      .number()
      .int()
      .positive("Rating must be greater than 0"),
 
  })
}) 

export type TReviewInput = z.infer<typeof reviewSchema>['body']; 