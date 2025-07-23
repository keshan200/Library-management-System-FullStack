
import mongoose from "mongoose"


export interface Reader extends Document{
  coverImg :string
  firstName:string,
  lastName:string
  email:string
  phone:string
  address:string

  createAt : Date
  updateAt :Date
  status : "Active" | "Inactive"
 
}


const readerSchema =  new mongoose.Schema<Reader>({
 coverImg: {
      type: String,
      required: [true, "Cover image URL is required"],
    },

firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
   
  },
  
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
   
  },

  email: {
    type: String,
    required: true,
    unique: true,
  
  },

  phone: {
    type: String,
    required: true,
    
  },

  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },


  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true,
    default:"Active"
  },


},
{
    timestamps: true, 

})


export const readerModel =  mongoose.model("Reader",readerSchema)