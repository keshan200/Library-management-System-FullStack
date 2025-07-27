export interface User{
 
  
  id:string
  img : string  
  first_name:string
  last_name:string
  email:string
  password:string
  phone:string
  status: "Active" | "Inactive"
  role: "admin" | "staff"

}


export type UserFormData={
  img : string  
  first_name:string
  last_name:string
  email:string
  password:string
  phone:string
  role: "admin" | "staff"
  status: "Active" | "Inactive"

}