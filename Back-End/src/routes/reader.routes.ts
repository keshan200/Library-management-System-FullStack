import { Router } from "express";
import {createReader, getReaders } from "../controllers/reader.controller";


const readerRouter = Router()
readerRouter.post("/save",createReader)
readerRouter.get("/get",getReaders)
export default readerRouter