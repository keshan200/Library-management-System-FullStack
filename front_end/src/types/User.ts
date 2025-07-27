export interface User{
 
  
  _id:string
  img : string  
  first_name:string
  last_name:string
  email:string
  password:string
  mobile:string
  status: "Active" | "Inactive"
  role: "admin" | "staff"

}


export type UserFormData={
  img : string  
  first_name:string
  last_name:string
  email:string
  password:string
  mobile:string
  role: "admin" | "staff"
  status: "Active" | "Inactive"

}