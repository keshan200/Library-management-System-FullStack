import type { Book } from "./Book"
import type { Reader } from "./Reader"

export interface Lending {
  _id: string
  reader: string 
  book: string
  lendDate: string
  dueDate: string
  returnDate?: string
  isReturned: boolean
  isOverdue: boolean
  daysOverDue?: number
}



export interface LendingTable {
  _id: string
  reader: Reader 
  book: Book
  lendDate: string
  dueDate: string
  returnDate?: string
  isReturned: boolean
  isOverdue: boolean
  daysOverDue?: number
  status :string
}


export type LendingAddForm = {
    reader: string 
   book: string
   dueDate: string   
   
}