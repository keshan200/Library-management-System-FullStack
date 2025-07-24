import type { Reader } from "../../types/Reader";
import { Edit3, Trash2, User, Mail, Phone, MapPin } from "lucide-react";







interface ReaderDataProps {
  readers: Reader[];
  
}

const ReaderTable: React.FC<ReaderDataProps> = ({ readers  }) => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-sm bg-white rounded-2xl shadow-2xl overflow-y-auto">
          <div className="h-[400px] overflow-y-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-blue-900 via-blue-900 to-indigo-900 sticky top-0 z-10">
                <tr>
                  <th className="text-left py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    Reader Details
                  </th>
                  <th className="text-left py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact
                    </div>
                  </th>
              
                  <th className="text-left py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </div>
                  </th>
                  <th className="text-left py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-center py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100">
                {readers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-12 h-12 text-gray-400 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <h3 className="text-lg font-medium mb-2">
                          No readers found
                        </h3>
                        <p>Add some readers to get started with your library system.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  readers.map((reader) => (
                    <tr key={reader._id}>
                      {/* Reader Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={`http://localhost:3000/${reader.coverImg}`}
                              alt={`${reader.firstName} ${reader.lastName}`}
                              className="w-14 h-14 object-cover rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 border-gray-200"
                            />
                            <div className="absolute inset-0 from-black/10 to-transparent rounded-full"></div>
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-normal text-slate-900 text-lg truncate">
                              {reader.firstName} {reader.lastName}
                            </h3>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6 text-slate-700 font-normal flex flex-col gap-2">
                        <div className="max-w-[200px] truncate" title={reader.email}>
                           {reader.email}
                        </div>

                        <div className="max-w-[200px] truncate" title={reader.phone}>
                           {reader.phone}
                        </div>
                      </td>

                     

                      {/* Address */}
                      <td className="py-4 px-6 text-slate-700 font-normal">
                        <div className="max-w-[200px] truncate" title={reader.address}>
                          {reader.address}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-6 px-6">
                        <span 
                          className={`inline-flex px-3 py-1.5 rounded-full text-sm font-normal border ${
                            reader.status === "Active"
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200"
                              : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200"
                          }`}
                        >
                          {reader.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-6 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                           
                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-105 group/btn"
                            title="Edit Reader"
                          >
                            <Edit3 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReaderTable;