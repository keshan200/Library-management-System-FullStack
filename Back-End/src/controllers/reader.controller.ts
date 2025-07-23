import { Request,Response,NextFunction } from "express"
import { readerModel } from "../models/readerModel"
import { APIError } from "../errors/ApiErrors"



export const createReader = async(req:Request,res:Response,next:NextFunction) =>{
     
    try{
         const {firstName,lastName,email,phone,address} =  req.body
         const coverImg =  req.file? req.file.path : ""

         const Reader =  new readerModel({
            firstName,
            lastName,
            email,
            phone,
            address,
            coverImg
         });

         await Reader.save()
         res.status(201).json(Reader)
    }catch(error:any){
        next(error)
    }
 }


 export const getReaders =async (req:Request,res:Response,next:NextFunction) => {
    
    try{
        const readers =  await readerModel.find()
        res.status(200).json(readers)

    }catch(error){
       next(error)

    }

 }


 {/*try {
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
   } */}


 export const updateReader = async  (req:Request,res:Response,next:NextFunction) =>{

     try{
        const reader =  await readerModel.findById(req.params.id)

        if(!reader){
            return res.status(404).json({ message: "reader not found" }); 
        }

        reader.firstName = req.body.firstName || reader.firstName
        reader.lastName  = req.body.lastName || reader.lastName
        reader.email     = req.body.email || reader.email
        reader.phone     = req.body.phone || reader.phone
        reader.address   = req.body.address || reader.address

        if(req.file){
            reader.coverImg =  req.file.path
        }

        await reader.save()
        res.status(201).json(reader)

     }catch(error:any){
          next(error)
     }

 }


 export const deleteReader = async (req:Request,res:Response,next:NextFunction) => {

     try{
       
       const deleteReader =  await readerModel.findByIdAndDelete(req.params.id)
       
       if(!deleteReader){
        throw new APIError(404,"Reader not Found!")
       }

       res.status(200).json({message : "Customer Delete"})
     }catch(error:any){
       next(error)
     }

 }