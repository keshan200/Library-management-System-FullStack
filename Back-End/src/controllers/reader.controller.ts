import { Request,Response,NextFunction } from "express"
import { readerModel } from "../models/readerModel"


export const createReader = async(req:Request,res:Response,next:NextFunction) =>{
     
    try{
        const reader = new readerModel(req.body)

        console.log("readers",reader)
        await reader.save()
        res.status(201).json(reader)
    }catch(error:any){
        next(error)
    }
 }