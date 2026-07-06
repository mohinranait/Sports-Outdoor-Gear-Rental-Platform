import z from "zod";

export const gearSchema = z.object({
  body: z.object({
    categoryId: z.string().uuid("Invalid category id"),
    title: z.string()
      .trim()
      .min(2, "Title is required")
      .max(200),
    brand: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    pricePerDay: z.coerce
      .number()
      .int()
      .positive("Price must be greater than 0"),
    stock: z.coerce
      .number()
      .int()
      .min(0),
    images: z.array(z.string()).min(1, "Minimum a image provide"),
  })
}) 

export type TGearInputs = z.infer<typeof gearSchema>['body']; 