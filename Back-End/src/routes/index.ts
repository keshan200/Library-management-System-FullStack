import { Router } from "express";
import userRouter from "./user.routes";
import readerRouter from "./reader.routes";

const rootRouter =  Router();
rootRouter.use("/auth",userRouter)
rootRouter.use("/reader",readerRouter)


export default rootRouter;