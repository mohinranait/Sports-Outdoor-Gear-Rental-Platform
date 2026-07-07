import z from "zod";

export const updateUserSchemaAdmin = z.object({
  body: z.object({
    status: z.enum(['suspend',"activate"])
  })
}) 

export type AdminUserUpdateInput = z.infer<typeof updateUserSchemaAdmin>['body'];