import { Router } from "express";
import { getAllLendings, lendBooks } from "../controllers/lend.controller";

const lendingRoute = Router()
lendingRoute.post("/create",lendBooks)
lendingRoute.get("/get",getAllLendings)

export default lendingRoute