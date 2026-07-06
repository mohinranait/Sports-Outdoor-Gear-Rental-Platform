import express , { Application } from "express"
import cookieParser from "cookie-parser";
import cors from 'cors'
import config from "./config";
import { authRouter } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

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



app.use(globalErrorHandler)

export default app;