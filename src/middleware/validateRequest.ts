
import { RequestHandler } from "express";
import { ZodTypeAny } from "zod/v3";

export const validateRequest =
  (schema: ZodTypeAny): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      next(error);
    }
  };