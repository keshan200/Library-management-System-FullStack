import express ,{Request,Response}from "express"
import dotenv from "dotenv"
import {connectDB} from "./db/mongo"




dotenv.config()
const app =  express()



const PORT = process.env.PORT
app.use(express.json())





app.get("/",(req:Request,res:Response)=>{
 res.send("redd")
})

connectDB().then(()=>{
 app.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`)
 })
})