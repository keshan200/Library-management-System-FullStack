import {Request, Response, NextFunction } from "express";
import { userModel } from "../models/userModel";
import { APIError } from "../errors/ApiErrors";
import bcrypt from "bcrypt"








export const signUp =  async (req:Request,res:Response,next:NextFunction) =>{

      try{
       
         const { first_name, last_name, email, password, mobile, role } = req.body;

         const img = req.file ? req.file.path : ""; 

         const existingUser = await userModel.findOne({ email });
        
        if (existingUser) {
            throw new APIError(400, "A user with this email already exists.");
        }

         const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            first_name,
            last_name,
            img,
            email,
            password: hashedPassword,
            mobile,
            role,
        });

     
        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                id: newUser._id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                img : newUser.img,
                email: newUser.email,
                mobile: newUser.mobile,
                role: newUser.role,
                createdAt: newUser.createAt,
            },
        });
       

      }catch(error:any){
        next(error)
      }
    

    }


