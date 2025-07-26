export interface Reader{
  _id:string
  coverImg:string | File
  firstName:string
  lastName:string
  email:string
  phone:string
  address:string
  status : "Active" | "Inactive"
}


export type ReaderFormData = {
    coverImg:string | File
    firstName:string
    lastName:string
    email:string
    phone:string
    address:string
    
}