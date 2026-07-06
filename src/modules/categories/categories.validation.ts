import z from "zod";

export const categorieSchema = z.object({
  body: z.object({
    name : z.string().min(2, "Name is required"),
    description: z.string().min(2, "Description is required")
  })
})

export type TCategoryInput = z.infer<typeof categorieSchema>['body'];