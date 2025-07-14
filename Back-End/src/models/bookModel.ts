import mongoose from "mongoose";

export interface Book extends Document {

    name:string,
    coverImg:string,
    author:string,
    category:string,
    totalBooks:number,
    availableBooks:number,
    createdAt:Date,
    updatedAt:Date,
    
}


const bookSchema = new mongoose.Schema<Book>({
     
      name: {
      type: String,
      required: [true, "Book name is required"],
      minlength: [2, "Book name must be at least 2 characters"],
      maxlength: [100, "Book name must be less than 100 characters"],
      trim: true,
    },
    coverImg: {
      type: String,
      required: [true, "Cover image URL is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      minlength: [2, "Author name must be at least 2 characters"],
      maxlength: [50, "Author name must be less than 50 characters"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      minlength: [3, "Category must be at least 3 characters"],
      maxlength: [30, "Category must be less than 30 characters"],
      trim: true,
    },
    totalBooks: {
      type: Number,
      required: [true, "Total books count is required"],
      min: [1, "There must be at least 1 book"],
    },
    availableBooks: {
      type: Number,
      required: [true, "Available books count is required"],
      min: [0, "Available books cannot be negative"],
      validate: {
        validator: function (this: Book, value: number) {
          return value <= this.totalBooks;
        },
        message: "Available books cannot exceed total books",
      },
    },
  },
  {
    timestamps: true, 
  })



  export const BookModel = mongoose.model("Books",bookSchema)