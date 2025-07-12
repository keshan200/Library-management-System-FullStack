import { Router } from "express";
import { signUp } from "../controllers/auth.controller";
import { upload } from "../middlewares/uploads";


const userRouter = Router()
userRouter.post("/signup",upload.single("img"),signUp)

export default userRouter