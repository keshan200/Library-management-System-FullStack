import { Router } from "express";
import { getAllLendings, lendBooks, updateLendStatus } from "../controllers/lend.controller";

const lendingRoute = Router()
lendingRoute.post("/create",lendBooks)
lendingRoute.get("/get",getAllLendings)
lendingRoute.put("/return/:id",updateLendStatus)

export default lendingRoute