import type { Reader, ReaderFormData } from "../types/Reader"
import { apiClient, BASE_URL } from "./apiClient"

const READER_URL = `${BASE_URL}/reader`


export  const  getAllReaders = async () =>{
    const response =  await apiClient.get(`${READER_URL}/get`)
    return response.data

}




export const add_readers =  async (reader:ReaderFormData) => {


        const formData = new FormData();

        formData.append("coverImg",reader.coverImg)
        formData.append("firstName",reader.firstName)
        formData.append("lastName",reader.lastName)
        formData.append("email",reader.email)
        formData.append("phone",reader.phone)
        formData.append("address",reader.address)

   const response  = await apiClient.post(`${READER_URL}/save`,formData,{
       headers: {
      "Content-Type": "multipart/form-data", 
    },
   })
   return response
}



export const update_reader =  async (_id:string,readerData:Omit<Reader,"_id">) =>{
    const Response = await apiClient.put(`${READER_URL}/update`,readerData)
    return Response

}