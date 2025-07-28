import { Router } from "express";
import { sendOverdueNotifications } from "../controllers/notification.Controller";


const NotifyRoutes = Router()
NotifyRoutes.post("/overdue", sendOverdueNotifications);
export default NotifyRoutes