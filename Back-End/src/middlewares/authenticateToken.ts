import { NextFunction } from "express";
import { Request,Response } from "express";
import { APIError } from "../errors/ApiErrors";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import { error } from "console";
import { decode } from "punycode";

export const authenticateToken = (req:Request,res:Response,next:NextFunction) =>{

    try{
       const authHeader =  req.headers["authorization"]
       const token = authHeader && authHeader.split(" ")[1]

       if(!token){
          throw new APIError(401,"Access Token out")
       }

       jwt.verify(
         token,
         process.env.ACCESS_SECRET_TOKEN!,

         (error,decoded) =>{

              if(error){
                if(error instanceof TokenExpiredError){
                    throw new APIError(401,"Access Token Expired")
                }else if (error instanceof JsonWebTokenError){
                    throw new APIError(401,"Invalid Access Token")
                }else{
                    throw new APIError(401,"Error Verifying Access Token")
                }
              }

              if(!decoded || typeof decoded === "string"){
                throw new APIError(401,"Error Access Token Payload Error")
              }

              next()

         } 
       )

    }catch(error){
        next(error)
    }

}