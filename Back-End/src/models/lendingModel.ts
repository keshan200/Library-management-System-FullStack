import mongoose from "mongoose";

export interface Lending extends Document{
   
    reader:mongoose.Types.ObjectId
    book:mongoose.Types.ObjectId
    lendDate:Date
    dueDate:Date
    returnDate?:Date
    isReturned:boolean
    isOverdue:boolean
    daysOverDue? :number

    createAt :Date 
    updateAt:Date

}


const lendingSchema = new mongoose.Schema<Lending>({

   reader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reader",
      required: [true, "Reader is required"],
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: [true, "Book is required"],
    },
    lendDate: {
      type: Date,
      required: [true, "Lend date is required"],
      default: Date.now
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: function (this: Lending, value: Date) {
          return value > this.lendDate;
        },
        message: "Due date must be after lend date",
      },
    },
    returnDate: {
      type: Date,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    isOverdue: {
      type: Boolean,
      default: false,
    },
    daysOverDue: {
      type: Number,
      min: [0, "Days overdue cannot be negative"],
    },
  },
  {
    timestamps: true,
  })


  export const LendingModel = mongoose.model("Lending",lendingSchema)