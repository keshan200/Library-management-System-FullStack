import { apiClient, BASE_URL } from "./apiClient";
import type {Book, BookFromData} from "../types/Book"

const BOOK_API_URL = `${BASE_URL}/book`


export const getAllBooks = async () : Promise<Book[]> => {
  const response = await apiClient.get(`${BOOK_API_URL}/get`)
  return response.data
}


export const delete_Books = async(_id:string) : Promise<void> =>{
    await apiClient.delete(`${BOOK_API_URL}/delete/${_id}`)
};


export const add_book = async (booksData: BookFromData) => {
 
  const formData = new FormData();

  formData.append("name", booksData.name);
  formData.append("author", booksData.author);
  formData.append("category", booksData.category);
  formData.append("totalBooks", booksData.totalBooks.toString());
  formData.append("availableBooks", booksData.availableBooks.toString());
  formData.append("coverImg", booksData.coverImg);

  const response = await apiClient.post(`${BOOK_API_URL}/create`, formData,{
      headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
  return response;
};



export const update_book =  async(_id:string ,booksData:Omit<Book,"_id">) =>{
     const response = await apiClient.put(`${BOOK_API_URL}/update/${_id}`,booksData)
      return response
}