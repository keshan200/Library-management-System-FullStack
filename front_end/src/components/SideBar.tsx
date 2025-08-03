import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  BookOpen, 
  Users, 
  BookMarked, 
  History
} from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { booksData, readerData, LendingTableData } from '../data/data';
import { getAllBooks } from '../service/bookService';
import { getAllLendings } from '../service/LendingService';
import { getAllReaders } from '../service/readerService';
import type { Book } from '../types/Book';
import type { LendingTable } from '../types/Lending';
import type { Reader } from '../types/Reader';



const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();


   

  const [bookcount, setBookcount] = useState<Book[]>(booksData);
  const [readercount, setreadercount] = useState<Reader[]>(readerData);
   const [lendingcount, setLendingcount] = useState<LendingTable[]>(LendingTableData)
   const [dueLenCount ,setDueLenCount] = useState<LendingTable[]>(LendingTableData)



  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3, color: 'text-blue-400' },
    { name: 'Books', path: '/books', icon: BookOpen, color: 'text-green-400' },
    { name: 'Members', path: '/members', icon: Users, color: 'text-purple-400' },
    { name: 'Lending', path: '/lending', icon: BookMarked, color: 'text-blue-500' },
    { name: 'History', path: '/history', icon: History, color: 'text-gray-400' },
  
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  }
  

 const countSet = async () => {
    try{
     
      const books =  await getAllBooks()
      const readers =  await getAllReaders()
      const lending =  await getAllLendings()
      
       
      if(books){
       setBookcount(books)
      }

      if(readers){
        setreadercount(readers)
      }

      if(lending){

        const DueLen = lending.filter((l) => l.isOverdue === true );
        setDueLenCount(DueLen)
        setLendingcount(lending)
      }


    

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
     countSet()
  },[])



  return (
    <main className="bg-white w-80 h-screen flex flex-col  overflow-hidden">
      {/* Header */}
      <div className="p-6 ">
        <div>
          <h1 className="text-normal  text-blue-400 mb-1"></h1>
          <p className=" text-black"></p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.name}
                onClick={() => handleItemClick(item.path)}
                className={`flex items-center space-x-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600  border-l-4 border-purple-400 text-white shadow-md shadow-blue-500/30'
                    : 'hover:bg-indigo-900/40 text-black hover:text-black hover:translate-x-2'
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-slate-700 group-hover:bg-slate-600'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-purple-400' : item.color
                    } transition-colors`}
                  />
                </div>

                <span
                  className={`font-normal text-normal transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}
                >
                  {item.name}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-12 p-4 bg-slate-800 rounded-xl border border-slate-700">
          <h3 className="text-lg font-medium text-slate-300 mb-3">
            Quick Stats
          </h3>
          <div className="space-y-2">

            {bookcount.map((b)=>(
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-400">Total Books</span>
              <span className=" font-medium text-blue-400 font-medium">{b.totalBooks}</span>
            </div>
            ))}
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-400">Active Members</span>
              <span className="font-medium text-purple-400 font-medium">3,421</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-400">Books Borrowed</span>
              <span className="font-medium text-green-400 font-medium">847</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
