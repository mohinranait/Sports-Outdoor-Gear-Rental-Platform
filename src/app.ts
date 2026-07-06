import express , { Application } from "express"
const app:Application  = express();


app.get('/api', (req,res) => {
  res.send({message:"Success"})
})


export default app;