import { Router } from "express";
import {createReader, deleteReader, getReaders, updateReader } from "../controllers/reader.controller";


const readerRouter = Router()
readerRouter.post("/save",createReader)
readerRouter.get("/get",getReaders)
readerRouter.put("/update/:id",updateReader)
readerRouter.delete("/delete/:id",deleteReader)

export default readerRouter