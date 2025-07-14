import { Router } from "express";
import userRouter from "./user.routes";
import readerRouter from "./reader.routes";
import bookRoute from "./book.routes";
import lendingRoute from "./lending.routes";

const rootRouter =  Router();
rootRouter.use("/auth",userRouter)
rootRouter.use("/reader",readerRouter)
rootRouter.use("/book",bookRoute)
rootRouter.use("/lend",lendingRoute)


export default rootRouter;