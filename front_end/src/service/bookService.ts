import { apiClient, BASE_URL } from "./apiClient";
import type {Book} from "../types/Book"

const BOOK_API_URL = `${BASE_URL}/book`


export const getAllBooks = async () : Promise<Book[]> => {
  const response = await apiClient.get(`${BOOK_API_URL}/get`)
  return response.data
}


export const delete_Books = async(_id:string) : Promise<void> =>{
    await apiClient.delete(`${BOOK_API_URL}/${_id}`,{
        headers:{
            "Content-Type":"application/json"
        }
    });
};


export const add_book = async(booksData:Omit<Book,"_id">) => {

    const response = await apiClient.post<Book>(BOOK_API_URL,booksData,{
        headers:{
            "Content-Type":"application/json"
        }
    })
 return response
}


export const update_book =  async(_id:string ,booksData:Omit<Book,"_id">) =>{
     const response = await apiClient.put<Book>(BOOK_API_URL,booksData,{
        headers:{
            "Content-Type":"application/json"
        }
    })
 return response
}