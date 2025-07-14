import { Request, Response, NextFunction } from "express";
import { BookModel } from "../models/bookModel";
import { APIError } from "../errors/ApiErrors";

export const createBook =  async(req: Request, res: Response, next: NextFunction) =>{
   
    try{

      const { name, author, category, totalBooks, availableBooks } = req.body;
      
      const coverImg = req.file ? req.file.path : ""; 

      
    const book = new BookModel({
      name,
      author,
      category,
      totalBooks,
      availableBooks,
      coverImg
    });

      await book.save()
      res.status(201).json(book)
    }catch(error:any){
       next(error)
    }

}



export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

   
    book.name = req.body.name || book.name;
    book.author = req.body.author || book.author;
    book.category = req.body.category || book.category;
    book.totalBooks = req.body.totalBooks || book.totalBooks;
    book.availableBooks = req.body.availableBooks || book.availableBooks;

   
    if (req.file) {
      book.coverImg = req.file.path;
    }

    await book.save(); 
    res.status(200).json(book);
  } catch (error: any) {
    next(error);
  }
};
