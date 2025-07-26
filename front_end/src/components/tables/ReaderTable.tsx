import React from "react";
import type { Reader } from "../../types/Reader";
import { Edit3 } from "lucide-react";


interface ReaderTableProps {
  readers: Reader[];
  onEdit: (reader: Reader) => void;
  onDeleteSingle?: (readerId: string) => void;

  searchTerm?: string;
  statusFilter?: 'All' | 'Active' | 'Inactive';
}

const ReaderTable: React.FC<ReaderTableProps> = ({ readers, onEdit  ,searchTerm,statusFilter}) => {
 
 
 const filteredReaders = readers.filter((reader) => {
  const matchesSearch = searchTerm
    ? (
        reader.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reader.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reader.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reader.phone.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : true;

  const matchesStatus = statusFilter === 'All' || reader.status === statusFilter;

  return matchesSearch && matchesStatus;
});

 
 
 
  return (
    <div className="overflow-x-auto shadow border border-gray-200 rounded-lg ">
      <table className="min-w-full text-sm text-left text-gray-600 bg-white">
        <thead className="text-normal text-white  uppercase  bg-gradient-to-r from-blue-900 via-blue-900 to-indigo-900">
          <tr>
            <th className="px-4 py-3 font-semibold ">Photo</th>


            <th className="px-4 py-3 font-semibold ">Name</th>


            <th className="px-4 py-3 font-semibold ">Email</th>


            <th className="px-4 py-3 font-semibold ">Phone</th>


            <th className="px-4 py-3 font-semibold ">Status</th>


            <th className="px-4 py-3 font-semibold ">Actions</th>
          </tr>
        </thead>
       <tbody>
  {filteredReaders.length === 0 ? (
    <tr>
      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
            />
          </svg>
          <h3 className="text-lg font-medium mb-2">No readers found</h3>
          <p>Try adjusting your search or status filters.</p>
        </div>
      </td>
    </tr>
  ) : (
    filteredReaders.map((reader) => (
      <tr
        key={reader._id}
        className="border-t hover:bg-gray-50 transition-colors"
      >
        <td className="px-4 py-3">
          <img
          src={`http://localhost:3000/${reader.coverImg}`}
            alt="Reader"
            className="w-10 h-10 rounded-full object-cover border"
          />
        </td>
        <td className="px-4 py-3 font-medium">
          {reader.firstName} {reader.lastName}
        </td>
        <td className="px-4 py-3">{reader.email}</td>
        <td className="px-4 py-3">{reader.phone}</td>
        <td className="px-4 py-3">
          <span
            className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
              reader.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {reader.status}
          </span>
        </td>
        <td className="px-4 py-3  ">
        
            <button
              onClick={() => onEdit(reader)} 
              className="text-blue-600 hover:underline text-sm"
              title="Edit Reader"
                >
             <Edit3 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
           </button>
        
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>
    </div>
  );
};

export default ReaderTable;
