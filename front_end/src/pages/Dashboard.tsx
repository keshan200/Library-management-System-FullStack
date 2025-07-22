import React, { useState } from 'react';
import { 
  Search, 
  Book, 
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

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = {
    totalBooks: 1247,
    totalReaders: 358,
    activeLoans: 142,
    overdueBooks: 23,
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

  const overdueBooks = [
    { readerName: 'Priya Jayawardena', bookTitle: 'To Kill a Mockingbird', daysOverdue: 12, email: 'priya.j@email.com', avatar: 'PJ' },
    { readerName: 'Saman Wickramasinghe', bookTitle: '1984', daysOverdue: 8, email: 'saman.w@email.com', avatar: 'SW' },
    { readerName: 'Thilini Perera', bookTitle: 'Pride and Prejudice', daysOverdue: 5, email: 'thilini.p@email.com', avatar: 'TP' },
    { readerName: 'Dinesh Silva', bookTitle: 'The Great Gatsby', daysOverdue: 3, email: 'dinesh.s@email.com', avatar: 'DS' }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Book Club Library</h1>
                <p className="text-gray-600">Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books, readers..."
                  className="pl-10 pr-4 py-2 w-64 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {overdueBooks.length}
                </span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

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
            icon={Book}
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
                Recent Loans
              </h3>
              <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentLoans.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar initials={loan.avatar} color="bg-gradient-to-r from-blue-500 to-indigo-500" />
                    <div>
                      <p className="font-semibold text-gray-800">{loan.bookTitle}</p>
                      <p className="text-sm text-gray-600">by {loan.readerName}</p>
                      <p className="text-xs text-gray-500">Due: {new Date(loan.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      loan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {loan.status === 'Active' ? <CheckCircle className="w-4 h-4 mr-1" /> : <Clock className="w-4 h-4 mr-1" />}
                      {loan.status}
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
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                Send Reminders
              </button>
            </div>
            <div className="space-y-4">
              {overdueBooks.map((item, index) => (
                <div key={index} className="p-4 border border-red-100 bg-red-50 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar initials={item.avatar} color="bg-red-500" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{item.readerName}</p>
                        <p className="text-sm text-gray-600">{item.bookTitle}</p>
                        <p className="text-xs text-red-600 font-medium">{item.daysOverdue} days overdue</p>
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

export default Dashboard;