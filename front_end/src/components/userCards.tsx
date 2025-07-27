import React, { useState } from 'react';
import { 
  Mail, 
  Phone,  
  Crown, 
  Badge, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2 
} from 'lucide-react';
import type { User } from '../types/User';


interface userGridProps {
    user: User[]
    searchTerms   : string
    roleFilter : 'All' | 'admin' | 'staff'
}



const UserCardList : React.FC<userGridProps> = ({user,searchTerms,roleFilter}) =>{


    {/**const filteredUsers = user.filter((u) => {
    const matchesSearch = searchTerm
      ? (
          u.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.mobile?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true

    const matchesRole = roleFilter === 'All' || u.role === roleFilter

    return matchesSearch && matchesRole
  }) */}

  const filteredUser =  user.filter((user)=>{

     const matchesSearch = searchTerms ?
     (

          user.first_name?.toLowerCase().includes(searchTerms.toLowerCase()) ||
          user.last_name?.toLowerCase().includes(searchTerms.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerms.toLowerCase()) ||
          user.mobile?.toLowerCase().includes(searchTerms.toLowerCase())

     ):true

    const matchesRole = roleFilter === 'All' || user.role === roleFilter
    return matchesSearch && matchesRole
  })


  return (
    <div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUser.map((user) => (
              <div key={user._id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`http://localhost:3000/${user.img}`}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.first_name} {user.last_name}
                      </h3>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin" 
                          ? "bg-purple-100 text-purple-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {user.role === "admin" ? <Crown className="w-3 h-3" /> : <Badge className="w-3 h-3" />}
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
                    {user.mobile}
                  </div>
                  
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === "Active" ? "bg-green-500" : "bg-gray-400"
                    }`}></div>
                    <span className="text-xs text-gray-600">
                      {user.status === "Active" ? `Active • ${user}` : "Inactive"}
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
          </div> </div>
  );
};

export default UserCardList;