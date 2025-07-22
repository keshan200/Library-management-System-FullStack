export interface Book {
  _id: string;          
  name: string;          
  coverImg: string;     
  author: string;       
  category: string;     
  totalBooks: number;   
  availableBooks: number;
    
}

export type BookFromData = {
     name: string;          
  coverImg: string;     
  author: string;       
  category: string;     
  totalBooks: number;   
  availableBooks: number;
 
}