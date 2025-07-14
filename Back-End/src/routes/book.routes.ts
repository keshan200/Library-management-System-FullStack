
import { Router } from "express";
import { createBook, deleteBook, getAllBooks, updateBook } from "../controllers/book.controller";
import { upload } from "../middlewares/uploads";

const bookRoute = Router()
bookRoute.post("/create", upload.single("coverImg"),createBook)
bookRoute.put("/update/:id", upload.single("coverImg"), updateBook);
bookRoute.get("/get",getAllBooks)
bookRoute.delete("/delete/:id",deleteBook)

export default bookRoute
