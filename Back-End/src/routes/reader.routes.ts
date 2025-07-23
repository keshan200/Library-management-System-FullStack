import { Router } from "express";
import {createReader, deleteReader, getReaders, updateReader } from "../controllers/reader.controller";
import { upload } from "../middlewares/uploads";


const readerRouter = Router()
readerRouter.post("/save", upload.single("coverImg"),createReader)
readerRouter.get("/get",getReaders)
readerRouter.put("/update/:id",upload.single("coverImg"),updateReader)
readerRouter.delete("/delete/:id",deleteReader)

export default readerRouter