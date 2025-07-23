import express ,{Request,Response}from "express"
import dotenv from "dotenv"
import {connectDB} from "./db/mongo"
import rootRouter from "./routes"
import { errorHandler } from "./middlewares/errorHandler"
import cookieParser from "cookie-parser"
import cors from "cors";




dotenv.config()
const app =  express()

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
  methods: "GET,PUT,PATCH,DELETE,POST,HEAD",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT


app.use("/api",rootRouter)

app.use(errorHandler)
app.use("/uploads", express.static("uploads"));




connectDB().then(()=>{
 app.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`)
 })
})


