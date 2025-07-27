import type { User } from "../types/User"
import apiClient, { BASE_URL } from "./apiClient"




const AUTH_URL = `${BASE_URL}/auth`



export interface SignUpResponse{
    name:string
    coverImg : string
    email : string
    _id : string
}





export const getAllUsers = async():Promise<User[]> => {
    const response =  await apiClient.get(`${AUTH_URL}/get`,{
        withCredentials:true
    })
    return response.data

}


export const signup =  async (userData :User):Promise<SignUpResponse> => {

  const formData = new FormData();

  formData.append("img", userData.img); 
  formData.append("first_name", userData.first_name);
  formData.append("last_name", userData.last_name);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("phone", userData.phone);
  formData.append("role", userData.role);



  const response = await apiClient.post(`${AUTH_URL}/signup`,formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}


export const update_User =  async(_id:string ,userData:Omit<User,"_id">) =>{
     const response = await apiClient.put(`${AUTH_URL}/update/${_id}`,userData)
      return response
}