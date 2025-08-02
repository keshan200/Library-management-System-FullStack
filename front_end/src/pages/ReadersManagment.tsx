import  { useEffect, useState } from 'react';
import { Search, Filter, Plus, User, UserCheck, Trash2, Activity, Crown, Shield, Users } from 'lucide-react';



import { add_readers, getAllReaders, update_reader } from '../service/readerService';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReaderTable from '../components/tables/ReaderTable';
import type { Reader } from '../types/Reader';
import { readerData } from '../data/data';
import Dialog from '../components/Dialog';
import  ReaderForm  from '../components/forms/ReaderForm';
import LibraryLoading from '../components/LoadingAnime';


export const ModernReaderPage : React.FC = () => {

   const[readers,setReaders] =  useState<Reader[]>(readerData);
  const [searchTerms, setSearchTerms] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

  const[isReadersLoading,setIsReadersLoading] =  useState<boolean>(false)
  const[isAddDialogOpen , setIsAddDialogOpen] = useState(false)
  const[isEditDialogOpen , setIsEditDialogOpen] = useState(false)
  const [selectedReader ,setSelectedReader] = useState<Reader | null>(null)
 



  const [searchTerm, setSearchTerm] = useState('');
  
  
  const fecthAllReaders = async()=>{
       
       try{
        
         setIsReadersLoading(true)
         const result =  await getAllReaders()
         setReaders(result)
       }catch(error){
          
           if(axios.isAxiosError(error)){
            toast.error(error.message)
           }else{
            toast.error("Somthing went worng")
           }
         
       }finally{
          setIsReadersLoading(false)
       }
  }


const handleFormSubmit = async (readerData: Omit<Reader, "_id" | "status">) => {
  try {
    if (selectedReader) {
      const response = await update_reader(selectedReader._id,  {
        ...readerData,
        status: selectedReader.status, 
      });
      const updatedReader = response.data;
      toast.success("updated successfully!");

      setReaders((prev) =>
        prev.map((reader) =>
          reader._id === selectedReader._id ? updatedReader : reader
        )
      );
      setIsEditDialogOpen(false);
    } else {
      const response = await add_readers(readerData);
      const newReader = response.data; 
      setReaders((prev) => [...prev, newReader]);
      toast.success("Created successfully!");
      setIsAddDialogOpen(false);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
  }

  setSelectedReader(null);
};

  useEffect(()=>{
    fecthAllReaders()
  },[])

  const handleEditReader = (reader:Reader) =>{
      setSelectedReader(reader)
      setIsEditDialogOpen(true)
  }





  function cancelDialog(): void {
    throw new Error('Function not implemented.');
  }


  if(isReadersLoading){
   return <LibraryLoading />
     
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
      <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
               <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                 Readers Management
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
          
          
           <Dialog
              isOpen={isAddDialogOpen}
              onCancel={cancelDialog}
              onConfirm={() => {
                const form = document.querySelector("form") as HTMLFormElement;
                if (form) {
                  form.requestSubmit();
                }

              } }
              title='Add New Book'>
            
            <ReaderForm onSubmit={handleFormSubmit}/>
            </Dialog>
           
          {/*edit dialog */}
            <Dialog
             isOpen={isEditDialogOpen}
             onCancel={cancelDialog}
             onConfirm={() => {
              const form = document.querySelector("form") as HTMLFormElement
              if(form){
                form.requestSubmit()
              }
             }}

            >
               <ReaderForm reader={selectedReader} onSubmit={handleFormSubmit} />
            </Dialog>
       

          </div>
        </div>




           {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{22}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{}</p>
                <p className="text-sm text-gray-600">Administrators</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-900">{}</p>
                <p className="text-sm text-gray-600">Staff Members</p>
              </div>
            </div>
          </div>
        </div>




        {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            <input
                type="text"
                placeholder="Search readers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                  
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white min-w-[120px]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              
              
                <button
               
                  className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete ({})
                </button>
              
            </div>
          </div>
        </div>

       
       <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-2xl border border-white/30 overflow-y-auto mt-10">

      {/* Table container with fixed height */}
       
            <ReaderTable 
            readers={readers}
            searchTerm={searchTerm} 
            statusFilter={statusFilter}
            onEdit={handleEditReader}
            />
            
         
   
       
    </div>

     
      </div>
    </div>
  );
}