import { Bell, Book, LogOut, Search } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for overdue books count
  const overdueBooks = [
    { readerName: 'Priya Jayawardena', bookTitle: 'To Kill a Mockingbird', daysOverdue: 12, email: 'priya.j@email.com', avatar: 'PJ' },
    { readerName: 'Saman Wickramasinghe', bookTitle: '1984', daysOverdue: 8, email: 'saman.w@email.com', avatar: 'SW' },
    { readerName: 'Thilini Perera', bookTitle: 'Pride and Prejudice', daysOverdue: 5, email: 'thilini.p@email.com', avatar: 'TP' },
    { readerName: 'Dinesh Silva', bookTitle: 'The Great Gatsby', daysOverdue: 3, email: 'dinesh.s@email.com', avatar: 'DS' }
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl w-screen">
      <div className="w-screen mx-auto">
        <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10">
          <div className="w-screen mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Title */}
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Book Club Library</h1>
                  <p className="text-gray-600">Management Dashboard</p>
                </div>
              </div>
              
              {/* Search and Actions */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books, readers..."
                    className="pl-10 pr-4 py-2 w-64 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {overdueBooks.length}
                  </span>
                </button>
                
                {/* Logout */}
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;