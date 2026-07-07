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
import { notFound } from "./middleware/notfound";
import { paymentRoutes } from "./modules/payment/payment.route";

const app:Application  = express();

app.use(cors({
  origin: config.app_url,
  credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req,res) => {
  res.send({message:"Gear Up Server is running"})
})

app.use('/api/auth', authRouter)
app.use('/api', userRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api', gearRoutes)
app.use('/api', rentalOrders)
app.use('/api/reviews', reviewRoutes)
app.use('/api', paymentRoutes)


app.use(notFound)
app.use(globalErrorHandler)

export default app;