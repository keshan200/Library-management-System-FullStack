import { Request, Response, NextFunction } from "express";
import { APIError } from "../errors/ApiErrors";
import mongoose from "mongoose";

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction

) =>{


    if(error instanceof APIError){
        res.status(error.status).json({message : "An unexpected error occurred"})
    }

    if(error instanceof mongoose.Error){
        res.status(400).json({message : error.message})
        return
    }

    res.status(500).json({message : "internal Server Error"})
  
}