import mongoose from "mongoose"

type User = {
    first_name:string
    last_name:string
    img:string
    email:string
    password:string
    mobile:string
    createAt : Date
    role : "admin" | "staff"
    status : "Active" | "Inactive"
}



const userSchema =  new mongoose.Schema<User>({
    
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
    },

    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
    },

    img: {
      type: String,
      default: "", 
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
     
    },
    
    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
    },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",   
  },
  },

  {
    timestamps: true, 

})


export const userModel = mongoose.model<User>("User",userSchema)