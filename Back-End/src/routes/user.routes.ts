 import { Router } from "express";
import { getAllUsers, login, logout, refreshToken, signUp } from "../controllers/auth.controller";
import { upload } from "../middlewares/uploads";
import { authenticateToken } from "../middlewares/authenticateToken";


const userRouter = Router()
userRouter.post("/signup",upload.single("img"),signUp)
userRouter.post("/login",login)
userRouter.get("/get",authenticateToken,getAllUsers)
userRouter.post("/refresh-token",refreshToken)
userRouter.post("/logout",logout)


export default userRouter