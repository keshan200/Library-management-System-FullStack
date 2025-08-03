import type React from "react";
import type { Lending, LendingTable } from "../../types/Lending";
import { ArrowUpDown, Users, Calendar, Clock, Eye, Edit, Trash2 } from "lucide-react";

interface LendingTableProps {
  lending: LendingTable[];
  onEdit?: (Lending: Lending) => void;
}

export const LendingsTable: React.FC<LendingTableProps> = ({ lending, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">
                <button className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
                  <span>Reader</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">
                <button className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
                  <span>Book Details</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">
                <button className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
                  <span>Lend Date</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">
                <button className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
                  <span>Due Date</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">
                Status
              </th>
              <th className="text-center py-4 px-6 font-semibold text-gray-700 border-b border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {lending.map((lending) => {
              const isOverdue =
                new Date(lending.dueDate) < new Date() && lending.status !== "RETURNED";
              return (
                <tr key={lending._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <Users className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {lending.reader
                            ? `${lending.reader.firstName} ${lending.reader.lastName}`
                            : "Unknown Reader"}
                        </p>
                        <p>{lending.reader?.email ?? "Unknown Email"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">{lending.book?.name ?? "Unknown Book"}</p>
                      <p className="text-sm text-gray-600">by {lending.book?.author ?? "Unknown Author"}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{new Date(lending.lendDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{new Date(lending.dueDate).toLocaleDateString()}</span>
                    </div>
                  </td>

               <td className="py-4 px-6 flex items-center space-x-2">
                     {lending.status === "RETURNED" && (
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">
                       RETURNED
                       </span>
                       )}
                {lending.status === "PENDING" && !isOverdue && (
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                       PENDING
                      </span>
                      )}
                {isOverdue && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                        OVERDUE
                      </span>
                     )}
                    </td>


                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                     {/** <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button> */}
                      <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-105 group/btn">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button   className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-105 group/btn">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
};




