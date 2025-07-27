import { Badge, Crown, Edit, Eye, Trash2 } from "lucide-react"
import type { User } from "../../types/User"



interface UserTableProps {
    user : User[]
}

const UserTable : React.FC<UserTableProps> = ({user}) =>{



   return(

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {user.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.img}
                            alt={`${user.first_name} ${user.last_name}`}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">
                              {user.first_name} {user.last_name}
                            </div>
                            <div className="text-sm text-gray-500">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin" 
                            ? "bg-purple-100 text-purple-700" 
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {user.role === "admin" ? <Crown className="w-3 h-3" /> : <Badge className="w-3 h-3" />}
                          {user.role}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            user.status === "Active" ? "bg-green-500" : "bg-gray-400"
                          }`}></div>
                          <span className="text-sm text-gray-600">
                            {user.status === "Active" ? "Active" : "Inactive"}
                          </span>
                        </div>
                        {user.status === "Active" && (
                          <div className="text-xs text-gray-500">{user.status}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors group/btn">
                            <Eye className="w-4 h-4 text-gray-400 group-hover/btn:text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-green-100 rounded-lg transition-colors group/btn">
                            <Edit className="w-4 h-4 text-gray-400 group-hover/btn:text-green-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded-lg transition-colors group/btn">
                            <Trash2 className="w-4 h-4 text-gray-400 group-hover/btn:text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      


   )

}


export default UserTable