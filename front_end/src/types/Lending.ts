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





export type LendingAddForm = {
    reader: string 
   book: string
   dueDate: string   
   
}