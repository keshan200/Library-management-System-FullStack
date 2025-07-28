import { Request,Response,NextFunction } from "express";
import { readerModel } from "../models/readerModel";
import { BookModel } from "../models/bookModel";
import { APIError } from "../errors/ApiErrors";
import { LendingModel } from "../models/lendingModel";



export const lendBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reader, book, lendDate, dueDate } = req.body;

   
    const selectedBook = await BookModel.findById(book);
    if (!selectedBook) {
      throw new APIError(404, "Book not found");
    }

    if (selectedBook.availableBooks <= 0) {
      throw new APIError(400, "No available books to lend");
    }

    
    selectedBook.availableBooks -= 1;
    await selectedBook.save();
    

    const selectedReader = await readerModel.findById(reader)
    if(!selectedReader){
        throw new APIError(400,"Reader not found")
    }
   
    const lending = new LendingModel({
      reader,
      book,
      lendDate,
      dueDate,
      isReturned: false,
      isOverdue: false,
      daysOverDue: 0,
    });

    await lending.save();
    res.status(201).json(lending);
  } catch (error: any) {
    next(error);
  }
}


export const getAllLendings = async (req: Request, res: Response) => {
  try {
    const lendings = await LendingModel.find()
      .populate('reader') 
      .populate('book')                
      .sort({ createdAt: -1 });                      

    res.status(200).json(lendings);
  } catch (error) {
    console.error('Error fetching lendings:', error);
    res.status(500).json({ message: 'Failed to fetch lendings' });
  }
};


