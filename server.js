import express from 'express';
import dotenv from 'dotenv'
import { createConnection } from './db.js';
import productRouter from './Routes/productRoute.js';
import cartRouter from './Routes/cartRoutes.js';
import userRouter from './Routes/userRoute.js'
import logger from './Middlewares/logger.js'
import { jwtAuthMiddleware } from './Middlewares/auth.js';

dotenv.config();

//establish a connection
createConnection();

//Create an app
const app=new express();

/* JSON Middleware */
app.use(express.json())

/*Logger Middleware */
app.use(logger)

const PORT=process.env.PORT || 5000;



app.use("/products",productRouter)
app.use("/cart",jwtAuthMiddleware,cartRouter)
app.use("/user",userRouter)

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`)
})