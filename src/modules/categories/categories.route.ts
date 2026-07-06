import { Router } from "express";
import { categoryController } from "./categories.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { categorieSchema } from "./categories.validation";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post('/',
  validateRequest(categorieSchema),
  auth(Role.Admin),
  categoryController.createNewCategory
)

router.get('/', categoryController.getCategories)
router.patch('/:catId', 
  validateRequest(categorieSchema),
   auth(Role.Admin),
  categoryController.updateCategory
)
router.delete('/:catId', auth(Role.Admin), categoryController.deleteCategory)



export const categoriesRoutes = router;