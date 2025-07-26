import  { useEffect, useState } from 'react';
import { Search, Filter, Plus, User, UserCheck } from 'lucide-react';
import BookTable from '../components/tables/BookTable';
import Dialog from "../components/Dialog"
import { booksData } from '../data/data';
import { add_book, delete_Books, getAllBooks, update_book } from '../service/bookService';
import axios from 'axios';
import  toast  from 'react-hot-toast';
import BookForm from '../components/forms/BookForm';
import type { Book } from '../types/Book';


export const ModernBookPage : React.FC = () => {
   
  const [books ,setBooks] = useState<Book[]>(booksData)
  const [isLoading ,setIsLoading] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

 






  const fetchBookData = async () => {
    try{
      setIsLoading(true)
      const result =  await getAllBooks()
       setBooks(result)
    }catch(erro){
       if(axios .isAxiosError(erro)){
        toast.error(erro.message)
       }else{
         toast.error("somthing went wrong")
       }
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
     fetchBookData()
  },[])



  const cancelDialog = () => {
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsDeleteDialogOpen(false)
    setSelectedBook(null)
  }

  const removeBook = async (id:string) => {
    await delete_Books(id)
  }


  const handleEditBool = (book:Book) => {
    setSelectedBook(book)  
    setIsEditDialogOpen(true)  
  }

  
  const handleDeleteBook = (book:Book) => {
    setSelectedBook(book)
    setIsDeleteDialogOpen(true)
  }

 const handleFormSubmit = async (bookData: Omit<Book, "_id">) => {
  if (selectedBook) {
   
    try {
      const response = await update_book(selectedBook._id, bookData);
      const updatedBook = response.data; 

      setBooks((prev) =>
        prev.map((book) =>
          book._id === selectedBook._id ? updatedBook : book
        )
      );
      setIsEditDialogOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  } else {
   
    try {
      const response = await add_book(bookData);
      const newBook = response.data; 

      setBooks((prev) => [...prev, newBook]);

      toast.success("created successfully!!")
      setIsAddDialogOpen(false);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  setSelectedBook(null);
};


const handleConfirmDelete = async() => {
  
  if(selectedBook){
    
    try{
       await removeBook(selectedBook._id)
       fetchBookData()
       toast.success("Successfully Deleted!!")
    }catch(error){
         
        if(axios.isAxiosError(error)) {
          toast.error(error.message)
        }else{
          toast.error("Something went wrong")
        }
        
    }finally{
         setIsDeleteDialogOpen(false)
         setSelectedBook(null)
    }

  }

}







if(isLoading){
   return (  <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          border: '5px solid #ccc',
          borderTop: '5px solid rgba(30, 17, 221, 1)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
      <p
        style={{
          marginTop: '20px',
          fontSize: '18px',
          color: '5px solid rgba(30, 17, 221, 1)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Loading...
      </p>
      <style>
        {` 
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>);
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
               <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                 Books Management
              </h1>
            <p className="text-gray-600 text-lg">Manage your library members and their preferences</p>
        </div>


             <button
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                 >
              <Plus className="w-5 h-5" />
                  Add New Book
             </button>
          {/*add dialog */}  
           <Dialog
              isOpen={isAddDialogOpen}
              onCancel={cancelDialog}
              onConfirm={ () => {
                 const form = document.querySelector("form") as HTMLFormElement
                 if(form){
                  form.requestSubmit()
                 }

              }}
             title='Add New Book'
            >
              <BookForm onSubmit={handleFormSubmit} />
          </Dialog>


          {/*edit dialog */}  
          <Dialog
            isOpen = {isEditDialogOpen}
            onCancel={cancelDialog}

            onConfirm={() => {
              const form = document.querySelector("form") as HTMLFormElement

              if(form){
                form.requestSubmit()
              }
            }}
          >
             <BookForm book={selectedBook} onSubmit={handleFormSubmit}/>
          </Dialog>

          {/*delte */}
          <Dialog 
             isOpen = {isDeleteDialogOpen}
             onCancel={cancelDialog}
             onConfirm={handleConfirmDelete}
          >
              <p className='text-gray-700'>
                  Are you sure you want to delete <strong>{selectedBook?.name}</strong>?This action cannot be undo
              </p> 
          </Dialog>

          </div>
        </div>

        {/* Filters */}
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-blue-500 focus:bg-white/90 transition-all duration-200 placeholder-slate-400"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex gap-4">
              {/* Author Filter */}
              <div className="relative flex-1">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full pl-12 pr-8 py-3 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-blue-500 focus:bg-white/90 transition-all duration-200 appearance-none cursor-pointer"
                >
                 
                    <option >
                    
                    </option>
                
                </select>
              </div>

              {/* Category Filter */}
              <div className="relative flex-1">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-8 py-3 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-blue-500 focus:bg-white/90 transition-all duration-200 appearance-none cursor-pointer"
                >
                 
                    <option >
                     
                    </option>
                 
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative flex-1">
                <UserCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-12 pr-8 py-3 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-blue-500 focus:bg-white/90 transition-all duration-200 appearance-none cursor-pointer"
                >
                
                    <option >
                   
                    </option>
                 
                </select>
              </div>
            </div>
          </div>
        </div>

       
       <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-2xl border border-white/30 overflow-y-auto">

      {/* Table container with fixed height */}
       
            
             <BookTable books={books} onEdit={handleEditBool} onDelete={handleDeleteBook}/>
         
   
       
    </div>

     
      </div>
    </div>
  );
}