import React from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Edit,
  History,
  AlertTriangle,
  Phone,
  MapPin,
  CreditCard,
  Star,
  Award,
  TrendingUp,
  Shield,
  Filter,
  Search,
  Download,
  MoreVertical
} from 'lucide-react';

const ReaderDetailsView = () => {
  // Static data for display
  const reader = {
    id: 'R-2024-001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '456 Oak Avenue, Springfield, IL 62701',
    status: 'Active',
    joinDate: '2023-03-15',
    membershipType: 'Premium',
    avatar: 'SJ',
    rating: 4.8,
    totalBooksRead: 127,
    currentLoans: 3,
    overdueBooks: 1,
    favoriteGenre: 'Science Fiction'
  };

  const currentLoans = [
    {
      id: 1,
      title: 'The Quantum Paradox',
      author: 'Dr. Elena Rodriguez',
      isbn: '978-1-234-56789-0',
      coverColor: 'from-purple-400 to-pink-400',
      borrowDate: '2024-07-20',
      dueDate: '2024-08-20',
      daysLeft: 12,
      isOverdue: false,
      category: 'Science Fiction'
    },
    {
      id: 2,
      title: 'Digital Ethics in AI',
      author: 'Marcus Thompson',
      isbn: '978-0-987-65432-1',
      coverColor: 'from-blue-400 to-cyan-400',
      borrowDate: '2024-07-15',
      dueDate: '2024-08-15',
      daysLeft: 7,
      isOverdue: false,
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Ancient Civilizations',
      author: 'Prof. Amanda Clarke',
      isbn: '978-2-345-67890-1',
      coverColor: 'from-orange-400 to-red-400',
      borrowDate: '2024-06-25',
      dueDate: '2024-07-25',
      daysLeft: -13,
      isOverdue: true,
      category: 'History'
    }
  ];

  const recentHistory = [
    {
      id: 1,
      title: 'Machine Learning Basics',
      author: 'Dr. James Wilson',
      borrowDate: '2024-06-01',
      returnDate: '2024-06-20',
      rating: 5,
      category: 'Technology'
    },
    {
      id: 2,
      title: 'The Art of Fiction',
      author: 'Virginia Woolf',
      borrowDate: '2024-05-15',
      returnDate: '2024-06-10',
      rating: 4,
      category: 'Literature'
    },
    {
      id: 3,
      title: 'Sustainable Energy',
      author: 'Dr. Michael Green',
      borrowDate: '2024-05-01',
      returnDate: '2024-05-28',
      rating: 5,
      category: 'Science'
    }
  ];

  const stats = [
    { label: 'Books Read', value: reader.totalBooksRead, trend: '+12%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Current Loans', value: reader.currentLoans, trend: 'Normal', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Avg Rating', value: reader.rating, trend: '+0.2', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Days Active', value: 365, trend: 'Daily', color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Reader Profile</h1>
                <p className="text-slate-600">Member ID: {reader.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center space-x-2 font-medium">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center space-x-2 font-medium">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Section - Profile Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
          
          {/* Profile Card */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Profile Header */}
              <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white">
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    reader.status === 'Active' 
                      ? 'bg-emerald-400/20 text-emerald-100 border border-emerald-400/30' 
                      : 'bg-red-400/20 text-red-100 border border-red-400/30'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      reader.status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'
                    }`}></div>
                    {reader.status}
                  </span>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 border border-white/30">
                    {reader.avatar}
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{reader.firstName} {reader.lastName}</h2>
                  <p className="text-white/80 text-sm mb-4">{reader.email}</p>
                  
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(reader.rating) ? 'text-yellow-300 fill-current' : 'text-white/40'}`} 
                      />
                    ))}
                    <span className="text-white/90 text-sm ml-2">{reader.rating}</span>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3 text-slate-600">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{reader.phone}</span>
                </div>
                <div className="flex items-start space-x-3 text-slate-600">
                  <MapPin className="w-5 h-5 mt-0.5" />
                  <span className="text-sm">{reader.address}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Joined {new Date(reader.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <CreditCard className="w-5 h-5" />
                  <span className={`text-sm px-3 py-1 rounded-lg font-medium ${
                    reader.membershipType === 'Premium' 
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {reader.membershipType} Member
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm">Favorite: <span className="font-medium text-slate-900">{reader.favoriteGenre}</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <TrendingUp className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Alert for Overdue Books */}
            {reader.overdueBooks > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-red-900 mb-2">Attention Required</h3>
                    <p className="text-red-800 mb-4">
                      This member has <span className="font-semibold">{reader.overdueBooks} overdue book(s)</span>. 
                      Please follow up to ensure timely return and avoid additional fees.
                    </p>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                        Send Reminder
                      </button>
                      <button className="px-4 py-2 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Current Loans */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Current Loans</h3>
                    <p className="text-slate-600 text-sm">{currentLoans.length} books currently borrowed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {currentLoans.map((book) => (
                  <div key={book.id} className={`relative overflow-hidden rounded-2xl border-2 transition-all hover:shadow-md ${
                    book.isOverdue 
                      ? 'bg-red-50 border-red-200 hover:border-red-300' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}>
                    <div className="p-6">
                      <div className="flex items-start space-x-6">
                        {/* Book Cover */}
                        <div className={`w-16 h-20 bg-gradient-to-br ${book.coverColor} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                          {book.title.substring(0, 2)}
                        </div>
                        
                        {/* Book Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-slate-900 text-lg mb-1">{book.title}</h4>
                              <p className="text-slate-600 mb-1">by {book.author}</p>
                              <p className="text-slate-500 text-sm">ISBN: {book.isbn}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              book.isOverdue 
                                ? 'bg-red-100 text-red-700' 
                                : book.daysLeft <= 7 
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'
                            }`}>
                              {book.isOverdue ? `${Math.abs(book.daysLeft)} days overdue` : `${book.daysLeft} days left`}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-slate-500 font-medium">Borrowed</p>
                              <p className="text-slate-900">{new Date(book.borrowDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 font-medium">Due Date</p>
                              <p className={book.isOverdue ? 'text-red-600 font-semibold' : 'text-slate-900'}>
                                {new Date(book.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-500 font-medium">Category</p>
                              <p className="text-slate-900">{book.category}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reading History & Stats */}
          <div className="xl:col-span-1 space-y-8">
            
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <History className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Recent Returns</h3>
                    <p className="text-slate-600 text-sm">Last 3 books</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {recentHistory.map((book) => (
                  <div key={book.id} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                      {book.title.substring(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">{book.title}</h4>
                      <p className="text-slate-600 text-xs mb-2">by {book.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs">
                          Returned {new Date(book.returnDate).toLocaleDateString()}
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(book.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Achievements */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Achievements</h3>
                    <p className="text-slate-600 text-sm">Member milestones</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Speed Reader</h4>
                    <p className="text-slate-600 text-sm">Read 100+ books this year</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Reliable Member</h4>
                    <p className="text-slate-600 text-sm">No overdue books in 6 months</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Genre Explorer</h4>
                    <p className="text-slate-600 text-sm">Read from 10+ categories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReaderDetailsView;