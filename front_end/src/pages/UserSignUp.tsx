import { 


  Search, 
  Filter, 
  Crown, 
  Users, 
  UserPlus,
  Download,
  Grid,
  List,
  Shield,
  Activity,
  Trash2,
  Eye,
  Edit,
  Calendar,
  Mail,
  Phone,
  MoreVertical,
  Badge
} from 'lucide-react';
import { useEffect, useState } from 'react';
import UserTable from '../components/tables/UserTable';
import type { User, UserFormData } from '../types/User';
import LibraryLoading from '../components/LoadingAnime';
import { getAllUsers, signup, update_User } from '../service/UserService';
import toast from 'react-hot-toast';
import axios from 'axios';
import UserForm from '../components/forms/UserForm';
import Dialog from '../components/Dialog';
import UserCardList from '../components/userCards';


export default function ViewAllUsersPage() {
 
  const [viewMode, setViewMode] = useState("grid"); 
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers ,setIsLoadingUsers] =  useState(false)
  const [searchTerms, setSearchTerms] = useState('');
  type Role = "All" | "admin" | "staff";
  const [RoleFilter, setRoleFilter] = useState<Role>("All");
  const [selectedUser ,setSelectedUser] = useState<User | null>(null)
  const[isAddDialogOpen , setIsAddDialogOpen] = useState(false)
  const[isEditDialogOpen , setIsEditDialogOpen] = useState(false)





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


 function cancelDialog(): void {
    throw new Error('Function not implemented.');
  }


 


const handleAddUser = async (userData: UserFormData) => {
  try {
    const newUser = await signup(userData);



    setUsers((prev) => [...prev,newUser ])
    toast.success("User added successfully!");
    setIsAddDialogOpen(false);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};





const handleUpdateUser = async (userData: Omit<User, "_id" >) => {
  if (!selectedUser) return;

  try {
    const response = await update_User(selectedUser._id, {
      ...userData,
      status: selectedUser.status, 
    });

    const updatedUser = response.data;

    setUsers((prev) =>
      prev.map((user) =>
        user._id === selectedUser._id ? updatedUser : user
      )
    );

    toast.success("User updated successfully!");
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};





   if(isLoadingUsers){
    return <LibraryLoading /> 
   }

   
   const totalUsers = users.length;
   const activeUsers = users.filter(user => user.status === "Active").length;
   const adminUsers = users.filter(user => user.role === "admin").length;
   const staffUsers = users.filter(user => user.role === "staff").length;


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
              <button 
              onClick={() => setIsAddDialogOpen(true)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg">
                <UserPlus className="w-4 h-4" />
                Add New User
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
               >
               <UserForm 
                  onSubmit={handleAddUser}
               />
               </Dialog>


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
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
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
                <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
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
                <p className="text-2xl font-bold text-gray-900">{adminUsers}</p>
                <p className="text-sm text-gray-600">Administrators</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{staffUsers}</p>
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
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={RoleFilter}
                   onChange={(e) => setRoleFilter(e.target.value as Role)}
                  className="pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 appearance-none"
                >
                  <option value="ALL">All Roles</option>
                  <option value="admin">Administrators</option>
                  <option value="staff">Staff Members</option>
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
          <UserCardList 
            user={users} 
            searchTerms={searchTerms}
            roleFilter={RoleFilter}
          
          />

        ) : (
          // List View
         <UserTable
          user={users}
          searchTerm={searchTerms}
          roleFilter={RoleFilter} 
         
          />

        )}

     {/**gilter */}
      </div>
    </div>
  );
}