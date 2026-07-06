import express , { Application } from "express"
import cookieParser from "cookie-parser";
import cors from 'cors'
import config from "./config";
import { authRouter } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { categoriesRoutes } from "./modules/categories/categories.route";
import { userRoutes } from "./modules/users/user.route";
import { gearRoutes } from "./modules/gear/gear.routes";

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
app.use('/api/auth', userRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/provider/gear', gearRoutes)



app.use(globalErrorHandler)

export default app;