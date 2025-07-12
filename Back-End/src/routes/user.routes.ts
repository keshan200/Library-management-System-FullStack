import { Router } from "express";
import { signUp } from "../controllers/auth.controller";


const userRouter = Router()
userRouter.post("/signup",signUp)

export default userRouter