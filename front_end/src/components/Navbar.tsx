import axios from "axios";
import { Bell, Book, ChevronDown, Crown, LogOut, Search, Settings, User, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";
import { logout } from "../service/authService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
   const [isProfileOpen, setIsProfileOpen] = useState(false);
  const {isLoggedIn ,logout:unauthenticate,user} = useAuth()
  const[isLoading ,setIsLoading] =useState(false)
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
  name: "",
  email: "",
  role: "",
  avatar: ""
});



useEffect(() => {
   console.log("User in useEffect:", user);
  if (user) {
    setCurrentUser({
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role,
      avatar: user.img ? `http://localhost:3000/${user.img}` : ""
    })  
  }
}, [user]);

  



  // Mock data for overdue books count
  const overdueBooks = [
    { readerName: 'Priya Jayawardena', bookTitle: 'To Kill a Mockingbird', daysOverdue: 12, email: 'priya.j@email.com', avatar: 'PJ' },
    { readerName: 'Saman Wickramasinghe', bookTitle: '1984', daysOverdue: 8, email: 'saman.w@email.com', avatar: 'SW' },
    { readerName: 'Thilini Perera', bookTitle: 'Pride and Prejudice', daysOverdue: 5, email: 'thilini.p@email.com', avatar: 'TP' },
    { readerName: 'Dinesh Silva', bookTitle: 'The Great Gatsby', daysOverdue: 3, email: 'dinesh.s@email.com', avatar: 'DS' }
  ];


const handleLogout = async() => {
    setIsLoading(true)

    try{
      await logout()
      toast.success("Logout Successfull!")
      unauthenticate()
      navigate("/login")
    }catch(error:any){
      if(axios .isAxiosError(error)){
        toast.error(error.message)
      }else{
        toast.error("somthing went wrong")
      }
    }finally{
        setIsLoading(false)
    }

  }



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

                {currentUser.role === "admin" && (
                 <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Crown className="w-4 h-4" />
                  <span>Admin Access</span>
                 </div>
                 )}
                  {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div className="text-left hidden md:block">
                      <p className="text-normal font-medium text-gray-800">{currentUser.name}</p>
                     <span
                          className={`inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1 
                          ${currentUser.role === "admin" ? "bg-blue-100 text-blue-800" : ""}



                          ${currentUser.role === "staff" ? "bg-green-100 text-green-800" : ""}`}
                         >
                      {currentUser.role}
                     </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{currentUser.name}</p>
                            <p className="text-sm text-gray-600">{currentUser.email}</p>
                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                              {currentUser.role}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2 ">
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700">
                          <User className="w-4 h-4" />
                          <span>View Profile</span>
                        </button>
                        <button
                        onClick={() => navigate("/setting")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                    {currentUser.role === "admin" && (
                         <button
                        onClick={() => navigate("/users")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-yellow-500">
                          <UserCog  className="w-4 h-4" />
                          <span>User Managment</span>
                        </button>
                      )}
                      </div>
                   
                      {/* Logout */}

                     
                      <div className="border-t border-gray-100 pt-2">
                         {isLoggedIn && (
                        <button 
                         disabled={isLoading}
                         onClick={handleLogout}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-red-600">
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                         )}
                      </div>
                    </div>
                  )}
              </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;


