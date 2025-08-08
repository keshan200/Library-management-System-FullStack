import {Request, Response, NextFunction } from "express";
import { userModel } from "../models/userModel";
import { APIError } from "../errors/ApiErrors";
import bcrypt from "bcrypt"
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError }  from "jsonwebtoken"
import { error } from "console";


const create_access_token = (userId: string, role: string) => {
  return jwt.sign(
    {
      id: userId,   
      role: role,   
    },
    process.env.ACCESS_SECRET_TOKEN!,
    { expiresIn: "1m" }
  );
};




const create_refresh_token = (userId:string) =>{
  return jwt.sign(
    {userId},
    process.env.REFRESH_SECRET_TOKEN!,
    {expiresIn:"3d"}
  )

}




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


export const login  = async(req:Request,res:Response,next:NextFunction) => {

     try{

       const {email,password} = req.body
       const user =  await userModel.findOne({email})
       
       if(!user){
        throw new APIError(404,"user not found")
       }

       const isMatch = await bcrypt.compare(password,user.password)

       if(!isMatch){
         throw new APIError(401,"Invalid Credentials")
       }

       const AccessToken =  create_access_token(user._id.toString(),user.role.toString())
       const RefreshToken =  create_refresh_token(user._id.toString())

       console.log(RefreshToken)

       const isProd =  process.env.NODE_ENV === "production"

       res.cookie("refreshToken",RefreshToken,{
          httpOnly:true,
          secure:isProd,
          sameSite:isProd ? "strict":"lax" ,
          maxAge:7 * 24 * 60 * 60 * 1000,
          path:"/api/auth/refresh-token"
       })



     res.cookie("User", JSON.stringify({
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          img: user.img,
          role: user.role,
          mobile: user.mobile
      }), {
         httpOnly: false,  
         secure: isProd,
         sameSite: isProd ? "strict" : "lax",
         maxAge: 7 * 24 * 60 * 60 * 1000,
         path: "/"
      });



       const userWithoutPass = {
           id:user.id,
           first_name:user.first_name,
           last_name:user.last_name,
           img:user.img,
           email:user.email,
           role:user.role,
           mobile:user.mobile,
           AccessToken
        
       }

      

       res.status(201).json(userWithoutPass)

     }catch(error){
          next(error)
     }

}



export const refreshToken = async (req:Request,res:Response,next:NextFunction) =>{
   
   try{

     const token  =  req.cookies?.refreshToken

     console.log("tokenddd",token)

     if(!token){
      throw new APIError(401,"Refresh Token missing")
     }

     jwt.verify(

       token,
       process.env.REFRESH_SECRET_TOKEN!,
       async (error:Error | null,decoded:string | JwtPayload |undefined)=>{       
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

          const userID = decoded.userId as string;

          console.log("ifsdf",userID)
          const user =  await userModel.findById(userID)

          if(!user){
            throw new APIError(401,"user not found")
          }

          const newAcessToken = create_access_token(user._id.toString(),user.role.toString())
          res.status(200).json({accessToken : newAcessToken,


             user: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            img: user.img,
            role: user.role,
            mobile: user.mobile,
            createdAt: user.createAt,
          },
          })

       }
     )
    
   }catch(error){
         console.log(error)
          next(error)
   }
} 


export const getAllUsers =  async(req:Request,res:Response,next:NextFunction) =>{

    try{
       const users = await userModel.find().select("-password")
       res.status(201).json(users) 
    }catch(error:any){
       res.status(500).json({message:"internal server error"})
    } 

}


export const logout = (req:Request,res:Response,next:NextFunction) =>{
    
   try{

    const isProd = process.env.NODE_ENV === "production"

    res.cookie("refreshToken","",{

      httpOnly:true,
      secure:isProd,
      expires:new Date(0),
      path:"/api/auth/refresh-token"
    })
    
    res.status(200).json({message:"Logout successful"})

   }catch(error:any){
     next(error)
   }

}