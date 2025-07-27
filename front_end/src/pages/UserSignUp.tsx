import { 
  Mail, 
  Phone, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Crown, 
  Users, 
  Eye,
  UserPlus,
  Download,
  Grid,
  List,
  Shield,
  Badge,
  Calendar,
  Activity
} from 'lucide-react';
import { useEffect, useState } from 'react';
import UserTable from '../components/tables/UserTable';
import type { User } from '../types/User';
import LibraryLoading from '../components/LoadingAnime';
import { getAllUsers } from '../service/UserService';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function ViewAllUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [viewMode, setViewMode] = useState("grid"); 
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers ,setIsLoadingUsers] =  useState(false)




  const fetchUsers = async()=>{

     try{
      setIsLoadingUsers(true)
      const result = await getAllUsers()
      setUsers(result)

     }catch(erro:any){
          if(axios .isAxiosError(erro)){
        toast.error(erro.message)
       }else{
         toast.error("somthing went wrong")
       }
     }finally{
         setIsLoadingUsers(false)
     }

  }

  useEffect(()=>{
    fetchUsers()
  },[])











   if(isLoadingUsers){
    return <LibraryLoading /> 
   }



  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Team Members Directory
              </h1>
              <p className="text-gray-600">
                Manage and view all registered users in your organization
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white/80 transition-all duration-200 flex items-center gap-2 text-gray-700">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg">
                <UserPlus className="w-4 h-4" />
                Add New User
              </button>
            </div>
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
                <p className="text-2xl font-bold text-gray-900">{}</p>
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

        {/* Search and Filter Bar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 appearance-none"
                >
                  <option value="ALL">All Roles</option>
                  <option value="ADMIN">Administrators</option>
                  <option value="STAFF">Staff Members</option>
                </select>
              </div>

              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid" ? "bg-white shadow-sm text-purple-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list" ? "bg-white shadow-sm text-purple-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Users Display */}
        {viewMode === "grid" ? (
          // Grid View
         <div>{/** <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div key={user.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.img}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.first_name} {user.last_name}
                      </h3>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "ADMIN" 
                          ? "bg-purple-100 text-purple-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {user.role === "ADMIN" ? <Crown className="w-3 h-3" /> : <Badge className="w-3 h-3" />}
                        {user.role}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Joined {user.created_at}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === "active" ? "bg-green-500" : "bg-gray-400"
                    }`}></div>
                    <span className="text-xs text-gray-600">
                      {user.status === "active" ? `Active • ${user.last_active}` : "Inactive"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors group/btn">
                      <Eye className="w-4 h-4 text-gray-400 group-hover/btn:text-blue-600" />
                    </button>
                    <button className="p-1.5 hover:bg-green-100 rounded-lg transition-colors group/btn">
                      <Edit className="w-4 h-4 text-gray-400 group-hover/btn:text-green-600" />
                    </button>
                    <button className="p-1.5 hover:bg-red-100 rounded-lg transition-colors group/btn">
                      <Trash2 className="w-4 h-4 text-gray-400 group-hover/btn:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}</div>
        ) : (
          // List View
         <UserTable user={users} />

        )}

     {/**gilter */}
      </div>
    </div>
  );
}