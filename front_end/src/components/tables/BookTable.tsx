import type { Book } from "../../types/Book";
import { Edit3, Trash2, User, Tag, BookOpen } from "lucide-react";

interface BookDataProps {
  books: Book[];
  onEdit :(book:Book) => void;
  onDelete :(book:Book) => void;
}

const BookTable: React.FC<BookDataProps> = ({ books,onEdit,onDelete }) => {
  return (
    <div className="min-h-screen   p-6">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-sm bg-white rounded-2xl shadow-2xl  overflow-y-auto">
          <div className="h-[400px] overflow-y-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-blue-900 via-blue-900 to-indigo-900 sticky top-0 z-10">
                <tr>
                  <th className="text-left py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    Book Details
                  </th>
                  <th className="text-left py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Author
                    </div>
                  </th>
                  <th className="text-left py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Category
                    </div>
                  </th>
                  <th className="text-left py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Inventory
                    </div>
                  </th>
                  <th className="text-left py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="text-center py-5 px-6 text-white font-semibold text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100">
                {books.length === 0 ? (
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
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
                          />
                        </svg>
                        <h3 className="text-lg font-medium mb-2">
                          No books found
                        </h3>
                        <p>Add some books to get started with your collection.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr key={book._id}>
                      {/* Book Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={`http://localhost:3000/${book.coverImg}`}
                              alt={book.name}
                              className="w-14 h-12 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0  from-black/10 to-transparent rounded-lg"></div>
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-normal text-slate-900 text-lg truncate">
                              {book.name}
                            </h3>
                          </div>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="py-4 px-6 text-slate-700 font-normal">
                        {book.author}
                      </td>

                      {/* Category */}
                      <td className="py-6 px-6">
                        <span className="inline-flex px-3 py-1.5 rounded-full text-sm font-normal bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                          {book.category}
                        </span>
                      </td>

                      {/* Inventory */}
                      <td className="py-6 px-6">
                        <div className="space-y-2">
                          <span className="text-slate-900 font-normal text-lg">
                            {book.totalBooks}
                          </span>
                        </div>
                      </td>

                     {/* Availability */}
                       <td className="py-6 px-6">
  <div className="w-full">
    {/* Progress Bar */}
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-500 ${
          book.availableBooks > 0
            ? "bg-green-500"
            : "bg-red-500"
        }`}
        style={{
          width: `${
            (book.availableBooks / book.totalBooks) * 100
          }%`,
        }}
      ></div>
    </div>

    {/* Text below progress bar */}
    <div className="flex justify-between mt-1 text-xs text-gray-600">
      <span>{book.availableBooks} Available</span>
      <span>{book.totalBooks} Total</span>
    </div>
  </div>
                         </td>

                      {/* Actions */}
                      <td className="py-6 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onEdit(book)}
                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-105 group/btn"
                            title="Edit Book"
                          >
                            <Edit3 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => onDelete(book)}
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-105 group/btn"
                            title="Delete Book"
                          >
                            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
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

export default BookTable;
