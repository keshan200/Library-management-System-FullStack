import { Router } from "express";
import userRouter from "./user.routes";
import readerRouter from "./reader.routes";
import bookRoute from "./book.routes";
import lendingRoute from "./lending.routes";
import { sendOverdueNotifications } from "../controllers/notification.Controller";
import { authenticateToken } from "../middlewares/authenticateToken";
import NotifyRoutes from "./notify.routes";

const rootRouter =  Router();
rootRouter.use("/auth",userRouter)
rootRouter.use("/reader",readerRouter)
rootRouter.use("/book",bookRoute)
rootRouter.use("/lend",lendingRoute)
rootRouter.use("/notification",NotifyRoutes)


export default rootRouter;