import express , { Application } from "express"
import cookieParser from "cookie-parser";
import cors from 'cors'
import config from "./config";
import { authRouter } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { categoriesRoutes } from "./modules/categories/categories.route";
import { userRoutes } from "./modules/users/user.route";
import { gearRoutes } from "./modules/gear/gear.routes";
import { rentalOrders } from "./modules/rental-order/rentalorder.route";
import { reviewRoutes } from "./modules/review/review.route";

const app:Application  = express();

app.use(cors({
  origin: config.app_url,
  credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api', (req,res) => {
  res.send({message:"Success"})
})

app.use('/api/auth', authRouter)
app.use('/api', userRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api', gearRoutes)
app.use('/api', rentalOrders)
app.use('/api/reviews', reviewRoutes)



app.use(globalErrorHandler)

export default app;