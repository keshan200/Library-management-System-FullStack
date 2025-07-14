import { Router } from "express";
import { lendBooks } from "../controllers/lend.controller";

const lendingRoute = Router()
lendingRoute.post("/create",lendBooks)

export default lendingRoute