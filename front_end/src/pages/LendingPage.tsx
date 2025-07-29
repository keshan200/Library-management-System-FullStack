import  { useEffect, useState } from 'react';
import {  Users, Calendar, Clock, Plus, Search, Filter, Eye, Edit, Trash2, CheckCircle, AlertCircle, XCircle, ArrowUpDown, Download } from 'lucide-react';
import type { Reader } from '../types/Reader';
import Dialog from '../components/Dialog';
import type { Lending, LendingAddForm, LendingTable } from '../types/Lending';
import { booksData, LendingData, LendingTableData, readerData } from '../data/data';
import type { Book } from '../types/Book';
import LendingForm from '../components/forms/LendingForm';
import { add_lending, getAllLendings, update_lending } from '../service/LendingService';
import { toast } from 'react-hot-toast';
import { getAllReaders } from '../service/readerService';
import axios from 'axios';
import { getAllBooks } from '../service/bookService';
import { LendingsTable } from '../components/tables/Lending';
import LendingDialog from '../components/LendingDialod';

const LendingPage: React.FC = () => {

  
  const [book,setBook] = useState<Book[]>(booksData)
  const[reader ,setReader] = useState<Reader[]>(readerData)
  const [lending ,setLending] = useState<Lending[]>(LendingData)

    const [lendingTable ,setLendingTable] = useState<LendingTable[]>(LendingTableData)
   
  const [isAddDialogOpen ,setIsAddDialogOpen] = useState(false)
  const [SelectedLending , setSelectedLending] = useState<Lending | null>(null)
 
   const fecthAllReaders = async()=>{
       
       try{
        
        
         const result =  await getAllReaders()
         setReader(result)
       }catch(error){
          
           if(axios.isAxiosError(error)){
            toast.error(error.message)
           }else{
            toast.error("Somthing went worng")
           }
         
       }finally{
         
       }
  }

    const fetchBookData = async () => {
    try{
     
      const result =  await getAllBooks()
       setBook(result)
    }catch(erro){
       if(axios .isAxiosError(erro)){
        toast.error(erro.message)
       }else{
         toast.error("somthing went wrong")
       }
    } finally{
    }
  }


  const fetchLending = async () => {
      try{
     
      const result =  await getAllLendings()
       setLendingTable(result)

       console.log("res",result)
    }catch(erro){
       if(axios .isAxiosError(erro)){
        toast.error(erro.message)
       }else{
         toast.error("somthing went wrong")
       }
    } finally{
    }
  }



  


useEffect(()=>{
    fecthAllReaders()
    fetchBookData()
    fetchLending()
  },[])



  const getStatusBadge = (lending: { id: string; reader: { name: string; email: string; }; book: { title: string; author: string; }; lendDate: string; dueDate: string; returnDate: null; isReturned: boolean; isOverdue: boolean; daysOverdue: number; } | { id: string; reader: { name: string; email: string; }; book: { title: string; author: string; }; lendDate: string; dueDate: string; returnDate: string; isReturned: boolean; isOverdue: boolean; daysOverdue: number; }) => {
    if (lending.isReturned) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-4 h-4 mr-1" />
          Returned
        </span>
      );
    }
    if (lending.isOverdue) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <XCircle className="w-4 h-4 mr-1" />
          Overdue ({lending.daysOverdue} days)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
        <Clock className="w-4 h-4 mr-1" />
        Active
      </span>
    );
  };

  const cancelDialog = () => {
    setIsAddDialogOpen(false)
  }
  

  const handleAddLending = () => {
    setSelectedLending(null)
    setIsAddDialogOpen(true)
  }



const handleFormSubmit = async (lendingData: LendingAddForm | Lending) => {
  try {
    if (SelectedLending) {
      const fullLendingData = lendingData as Lending;

      const dataToSendUpdate: Omit<Lending, "_id" | "lendDate"> = {
        reader: fullLendingData.reader,
        book: fullLendingData.book,
        dueDate: fullLendingData.dueDate,
        isReturned: fullLendingData.isReturned,
        isOverdue: fullLendingData.isOverdue,
        daysOverDue: fullLendingData.daysOverDue,
      };

      const response = await update_lending(SelectedLending._id, dataToSendUpdate);
      const updatedLending = response.data;

      setLending((prevLendings) =>
        prevLendings.map((lending) =>
          lending._id === SelectedLending._id ? updatedLending : lending
        )
      );
    } else {
      const response = await add_lending(lendingData);
      const newLending = response.data;
      setLending((prevLendings) => [...prevLendings, newLending]);
       toast.success("Lending Successfull");
    }

    setIsAddDialogOpen(false);
    setSelectedLending(null);
  } catch (error) {
    console.error("Failed to submit form", error);
    toast.error("Failed to submit form");
  }
};







  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl shadow-lg">
                
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Book Lending Management</h1>
                <p className="text-gray-600 mt-2 text-lg">Track and manage all book lending activities</p>
              </div>
            </div>
            
            <button
            onClick={handleAddLending}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Plus className="w-6 h-6" />
              <span className="text-lg font-semibold">Add New Lending</span>
            </button>

            <Dialog 
             
             isOpen = {isAddDialogOpen}
             onCancel={cancelDialog}
             onConfirm={() => {
                const form = document.querySelector("form") as HTMLFormElement
                if(form){
                    form.requestSubmit()
                }
             }}
            
            title='create new lending'
            >
               <LendingForm 
                    books={book}
                    readers={reader} 
                    onSubmit={handleFormSubmit }                            
               />
                            

            </Dialog>

    
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Lendings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Active Lendings</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Overdue Books</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Returned Books</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by reader, book title, or author..."
                className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by Status:</span>
                <select className="px-4 py-2 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="overdue">Overdue</option>
                  <option value="returned">Returned</option>
                </select>
              </div>

              {/* Export Button */}
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
         
        <LendingsTable lending={lendingTable}        
        
        />

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{lending.length}</span> of{' '}
            <span className="font-medium">{lending.length}</span> results
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 hidden">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Plus className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Add New Lending</h2>
              </div>
              <button className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reader Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Select Reader</span>
                </label>
                <select className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 bg-white">
                  <option value="">Choose a reader...</option>
                  {reader.map((reader) => (
                    <option key={reader._id} value={reader._id}>
                      {reader.firstName} - {reader.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Book Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                 
                  <span>Select Book</span>
                </label>
                <select className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 bg-white">
                  <option value="">Choose a book...</option>
                  {book.map((book) => (
                    <option key={book._id} value={book._id}>
                      {book.name} - {book.author}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lend Date */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Lend Date</span>
                </label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Due Date</span>
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                Cancel
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg">
                Create Lending
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> 


  );
};

export default LendingPage