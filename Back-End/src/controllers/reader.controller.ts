import { Request,Response,NextFunction } from "express"
import { readerModel } from "../models/readerModel"
import { APIError } from "../errors/ApiErrors"


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


 export const getReaders =async (req:Request,res:Response,next:NextFunction) => {
    
    try{
        const readers =  await readerModel.find()
        res.status(200).json(readers)

    }catch(error){
       next(error)

    }

 }



 export const updateReader = async  (req:Request,res:Response,next:NextFunction) =>{

     try{
        const updateReader =await readerModel.findByIdAndUpdate(req.params.id,req.body,{
             new:true,
             runValidators:true
        })

        if(!updateReader){
            throw new APIError(404,"Reader not found")
        }
        
        res.status(200).json(updateReader)
     }catch(error:any){
          next(error)
     }

 }


 export const deleteReader = async (req:Request,res:Response,next:NextFunction) => {

     try{
       
       const deleteReader =  await readerModel.findByIdAndDelete(req.params.id)
       
       if(!deleteReader){
        throw new APIError(404,"Reader not Found!")
       }

       res.status(200).json({message : "Customer Delete"})
     }catch(error:any){
       next(error)
     }

 }