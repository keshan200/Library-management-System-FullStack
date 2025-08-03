export interface Book {
  _id: string;          
  name: string;          
  coverImg: string | File;     
  author: string;       
  category: string;     
  totalBooks: number;   
  availableBooks: number;
    
  createdAt ? :Date
}

export type BookFromData = {
  name: string;          
  coverImg: string | File;     
  author: string;       
  category: string;     
  totalBooks: number;   
  availableBooks: number;
 
}