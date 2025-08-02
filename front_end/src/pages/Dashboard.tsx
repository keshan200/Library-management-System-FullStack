import React, { use, useEffect, useState } from 'react';
import { 
  Search, 
  Book as bIcon, 
  Users, 
  BookOpen, 
  AlertCircle, 
  Calendar, 
  Mail, 
  LogOut,
  BarChart3,
  Clock,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Bell,
 
  MoreHorizontal
} from 'lucide-react';
import LibraryLoading from '../components/LoadingAnime';
import toast from 'react-hot-toast';
import { getAllLendings } from '../service/LendingService';
import { getAllBooks } from '../service/bookService';
import type { Book } from '../types/Book';
import axios from 'axios';
import { booksData, LendingData, LendingTableData, readerData } from '../data/data';
import type { Reader } from '../types/Reader';
import type { Lending, LendingTable } from '../types/Lending';
import { getAllReaders } from '../service/readerService';
import { LendingsTable } from '../components/tables/Lending';
import { sendOverdueNotifications } from '../service/EmailService';


interface OverdueBook {
  readerName: string
  bookTitle: string
  daysOverdue: number
  avatar: string
}



const Dashboard = () => {
  const [bookcount, setBookcount] = useState<Book[]>(booksData);
  const [readercount, setreadercount] = useState<Reader[]>(readerData);
   const [lendingcount, setLendingcount] = useState<LendingTable[]>(LendingTableData)
   const [dueLenCount ,setDueLenCount] = useState<LendingTable[]>(LendingTableData)

  const [isLoading ,setIsLoading]=useState(false) 
  const [overdueBooks, setOverdueBooks] = useState<OverdueBook[]>([])

 


 const countSet = async () => {
    try{
      setIsLoading(true)
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
      setIsLoading(false)
    }
  }

  useEffect(()=>{
     countSet()
  },[])


  
  // Mock data
  const stats = {
    totalBooks: bookcount.length,
    totalReaders: readercount.length,
    activeLoans: lendingcount.length,
    overdueBooks: dueLenCount.length,
    booksAddedThisMonth: 67,
    newReadersThisMonth: 24,
    returnedThisWeek: 89,
    overdueRate: 16.2
  };

  const recentLoans = [
    { id: 1, bookTitle: 'The Midnight Library', readerName: 'Amara Silva', loanDate: '2024-07-21', dueDate: '2024-08-04', status: 'Active', avatar: 'AS' },
    { id: 2, bookTitle: 'Atomic Habits', readerName: 'Kasun Perera', loanDate: '2024-07-20', dueDate: '2024-08-03', status: 'Active', avatar: 'KP' },
    { id: 3, bookTitle: 'The Seven Husbands', readerName: 'Nisha Fernando', loanDate: '2024-07-19', dueDate: '2024-08-02', status: 'Active', avatar: 'NF' },
    { id: 4, bookTitle: 'Educated', readerName: 'Rajesh Kumar', loanDate: '2024-07-18', dueDate: '2024-08-01', status: 'Due Soon', avatar: 'RK' }
  ];


 

  const topBooks = [
    { title: 'Atomic Habits', author: 'James Clear', timesLoaned: 24, category: 'Self-Help' },
    { title: 'The Midnight Library', author: 'Matt Haig', timesLoaned: 19, category: 'Fiction' },
    { title: 'Educated', author: 'Tara Westover', timesLoaned: 16, category: 'Biography' },
    { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', timesLoaned: 15, category: 'Fiction' }
  ];

  type StatCardProps = {
    icon: React.ElementType;
    title: string;
    value: string | number;
    trend?: 'up' | 'down';
    trendValue?: string | number;
    color: string;
    bgColor: string;
  };

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, trend, trendValue, color, bgColor }) => (
    <div className={`${bgColor} p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-white/20`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color === 'text-blue-600' ? 'bg-blue-100' : 
                                        color === 'text-green-600' ? 'bg-green-100' : 
                                        color === 'text-orange-600' ? 'bg-orange-100' : 'bg-red-100'}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="ml-1 text-sm font-medium">{trendValue}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  type AvatarProps = {
    initials: string;
    color?: string;
  };

  const Avatar: React.FC<AvatarProps> = ({ initials, color = "bg-blue-500" }) => (
    <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
      {initials}
    </div>
  );

  
  if(isLoading){
    return <LibraryLoading />
  }





const SendMailButton =async () => {
 
    try {
      await sendOverdueNotifications();
      toast.success("Emails sent successfully!");
    } catch (error) {
      toast.error("Failed to send emails.");
      console.error("Mail error:", error);
    }
  
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
     

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back! 📚</h2>
          <p className="text-gray-600">Here's what's happening at your library today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={bIcon}
            title="Total Books"
            value={stats.totalBooks.toLocaleString()}
            trend="up"
            trendValue="5.4"
            color="text-blue-600"
            bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
          />
          <StatCard
            icon={Users}
            title="Total Readers"
            value={stats.totalReaders.toLocaleString()}
            trend="up"
            trendValue="12.3"
            color="text-green-600"
            bgColor="bg-gradient-to-br from-green-50 to-green-100"
          />
          <StatCard
            icon={BookOpen}
            title="Active Loans"
            value={stats.activeLoans.toLocaleString()}
            trend="up"
            trendValue="8.7"
            color="text-orange-600"
            bgColor="bg-gradient-to-br from-orange-50 to-orange-100"
          />
          <StatCard
            icon={AlertCircle}
            title="Overdue Books"
            value={stats.overdueBooks.toLocaleString()}
            trend="down"
            trendValue="2.1"
            color="text-red-600"
            bgColor="bg-gradient-to-br from-red-50 to-red-100"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Loans */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Recent Lendings
              </h3>
              <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {lendingcount.map((lend) => (
                <div key={lend._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar initials={lend.reader.address} color="bg-gradient-to-r from-blue-500 to-indigo-500" />
                    <div>
                      <p className="font-semibold text-gray-800">{lend.book.name}</p>
                      <p className="text-sm text-gray-600">by {`${lend.reader.firstName , lend.reader.lastName}`}</p>
                      <p className="text-xs text-gray-500">Due: {new Date(lend.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      lend.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {lend.status === 'Active' ? <CheckCircle className="w-4 h-4 mr-1" /> : <Clock className="w-4 h-4 mr-1" />}
                      {lend.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overdue Books */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                Overdue Books
              </h3>
              <button
              onClick={SendMailButton}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                Send Reminders
              </button>
            </div>
            <div className="space-y-4">
              {dueLenCount.map((due, index) => (
                <div key={index} className="p-4 border border-red-100 bg-red-50 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar color="bg-red-500" initials={`http://localhost:3000/${due.book.coverImg}`} />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{due.reader.firstName}</p>
                        <p className="text-sm text-gray-600">{due.book.name}</p>
                        <p className="text-xs text-red-600 font-medium">{due.daysOverDue} days overdue</p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-red-100 rounded-lg">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Top Books */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                Most Popular Books
              </h3>
              <button className="text-purple-600 hover:bg-purple-50 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                View Analytics
              </button>
            </div>
            <div className="space-y-4">
              {topBooks.map((book, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{book.title}</p>
                      <p className="text-sm text-gray-600">{book.author}</p>
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mt-1">
                        {book.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">{book.timesLoaned}</p>
                    <p className="text-xs text-gray-500">times loaned</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Monthly Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                <p className="text-blue-600 text-sm font-medium">Books Added</p>
                <p className="text-2xl font-bold text-blue-800">{stats.booksAddedThisMonth}</p>
                <p className="text-xs text-blue-600">This month</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                <p className="text-green-600 text-sm font-medium">New Readers</p>
                <p className="text-2xl font-bold text-green-800">{stats.newReadersThisMonth}</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                <p className="text-purple-600 text-sm font-medium">Books Returned</p>
                <p className="text-2xl font-bold text-purple-800">{stats.returnedThisWeek}</p>
                <p className="text-xs text-purple-600">This week</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                <p className="text-orange-600 text-sm font-medium">Overdue Rate</p>
                <p className="text-2xl font-bold text-orange-800">{stats.overdueRate}%</p>
                <p className="text-xs text-orange-600">Current</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard

