import  React, { useEffect, useState } from 'react';
import { Users, Calendar, Clock, Plus, CheckCircle, Save, RotateCcw, Search, Hash, User, BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import type { Lending, LendingAddForm } from '../../types/Lending';
import type { Book } from '../../types/Book';
import type { Reader } from '../../types/Reader';
import toast from 'react-hot-toast';



interface LendingFormProps {
    lending? : Lending | null
    books : Book[]
    readers  : Reader[]
   

    onSubmit  : (lendingData : Omit<Lending, "_id"| "lendDate">) => void
}

type LendingFormData = {
  selectedReader: Reader | null;
  selectedBooks: Book[];
  lendDate: string;
  dueDate: string;
  isOverdue: boolean;
  overdueDays: number | null;
};






const LendingForm : React.FC<LendingFormProps>= ({lending,books,readers,onSubmit}) => {



  const [bookSearch, setBookSearch] = useState('');
  const [readerSearch, setReaderSearch] = useState(''); 
  const [showReaderResults, setShowReaderResults] = useState(false);
  const [showBookResults, setShowBookResults] = useState(false);
  const [selectedReaderId , setSelecteReaderId] = useState<string|null>(null)
  const [selectedBookId , setSelecteBookId] = useState<string|null>(null)

  const [lendDate, setLendDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [isOverdue, setIsOverdue] = useState<boolean>(false);
  const [overdueDays, setOverdueDays] = useState<number | null>(null);
  const [formData, setFormData] = useState({
  reader: '',
  book: '',
  dueDate: '',
  isReturned: false,
  isOverdue: false,
  daysOverDue: 0,
})


   useEffect(()=>{
    if(lending){

    }
   })


  
const validateLendingForm = (): string | null => {
  if (!selectedReaderId) return "Please select a reader.";
  
  if (!lendDate || !dueDate) return "Lend and due dates are required.";

  const lend = new Date(lendDate);
  const due = new Date(dueDate);
  if (due <= lend) return "Due date must be after lend date.";

  if (isOverdue && (!overdueDays || overdueDays <= 0)) {
    return "Please enter valid overdue days.";
  }

  return null;
};


const filteredReaders = readers.filter((reader) => {
  if (!readerSearch.trim()) return false; 
  
  const fullName = `${reader.firstName} ${reader.lastName}`.toLowerCase();
  const search = readerSearch.trim().toLowerCase();

  return (
    fullName.includes(search) ||
    reader.email.toLowerCase().includes(search) ||
    reader.phone.toLowerCase().includes(search)
  );
});


const filteredBooks = books.filter(book => {
    if (!bookSearch.trim()) return false; 
    
    return book.availableBooks > 0 && (
      book.name.toLowerCase().includes(bookSearch.toLowerCase()) ||
      book.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
      book.category.toLowerCase().includes(bookSearch.toLowerCase())
    );
});



const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

 

  const lendingDataToSend: Omit<Lending, "_id" | "lendDate"> = {
  reader: selectedReaderId ?? "",
  book: selectedBookId ?? "",
  dueDate: dueDate,
  isReturned: formData.isReturned,
  isOverdue: formData.isOverdue,
  daysOverDue: formData.daysOverDue,
};


  console.log("fata", lendingDataToSend);

  if (lending) {
    const lendingWithExtras: Lending = {
      ...lendingDataToSend,
      isReturned: formData.isReturned,
      isOverdue: formData.isOverdue,
      daysOverDue: formData.daysOverDue,
      lendDate: lending.lendDate,
      _id: lending._id,
    };
    onSubmit(lendingWithExtras);
  } else {
    onSubmit(lendingDataToSend); 
  }
};








  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Lending</h1>
          <p className="text-gray-600 text-lg">Search and select reader and book to create lending record</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex items-center space-x-3">
              <Plus className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Lending Information</h2>
            </div>
          </div>

          {/* Form Content */}
          <form className="p-8"  onSubmit={handleSubmit}>
            {/* Search Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            
            
              {/* Reader Search */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Search Reader *</span>
                </h3>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                  <input
                    type="text"
                    value={readerSearch} 
                    onChange={(e) => {
                      setReaderSearch(e.target.value);
                      setShowReaderResults(true); 
                    }}
                    onFocus={() => setShowReaderResults(true)}
                    onBlur={() => setTimeout(() => setShowReaderResults(false), 200)} 
                    placeholder="Search by name, email, or phone..."
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>

                {/* Reader Search Results */}
                {showReaderResults && (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {filteredReaders.length > 0 ? (
                      filteredReaders.map(reader => (
                        <div
                          key={reader._id}
                           onClick={() => {
                              setSelecteReaderId(reader._id);
                              setReaderSearch(`${reader.firstName} ${reader.lastName}`);
                              setShowReaderResults(false);
                            }}
                          className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                        >
                          <div className="flex items-center space-x-4">
                            {/* Avatar */}
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200">
                             {typeof reader.coverImg === 'string' && (
                               <img src={reader.coverImg} alt="Reader Avatar" className="w-10 h-10 rounded-full" />
                                 )}
                            </div>
                            
                            {/* Reader Info */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {reader.firstName}
                                </h4>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                  {reader.status}
                                </span>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Mail className="w-3 h-3 mr-1" />
                                  {reader.email}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {reader.phone}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {reader.address}
                                </div>
                              </div>
                              
                              <div className="mt-2 text-xs text-blue-600 font-medium">
                                Currently borrowed: {22} books
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No readers found matching your search</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Book Search */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <span>Search Book *</span>
                </h3>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                  <input
                    type="text"
                    value={bookSearch}
                   
                    onChange={(e) => {
                      setBookSearch(e.target.value);
                      setShowBookResults(true); 
                    }}
                    onFocus={() => setShowBookResults(true)}
                    onBlur={() => setTimeout(() => setShowBookResults(false), 200)} 
                    placeholder="Search by title, author, or category..."
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>

                {/* Book Search Results */}
                {showBookResults && (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {filteredBooks.length > 0 ? (
                      filteredBooks.map(book => (
                        <div
                          key={book._id}
                           onClick={() => {
                              setSelecteBookId(book._id)
                              setBookSearch(book.name)
                              setShowBookResults(false)

                           {/** setSelecteReaderId(reader._id);
                              setReaderSearch(`${reader.firstName} ${reader.lastName}`);
                              setShowReaderResults(false); */}
                             }}
                          className="bg-white border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                        >
                          <div className="flex items-center space-x-4">
                            {/* Book Cover */}
                            <div className="w-12 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs group-hover:from-green-600 group-hover:to-green-700 transition-all duration-200">
                             {typeof book.coverImg === 'string' && (
                               <img src={book.coverImg} alt="Reader Avatar" className="w-10 h-10 rounded-full" />
                                 )}
                            </div>
                            
                            {/* Book Info */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                                  {book.name}
                                </h4>
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    book.availableBooks > 2 
                                      ? 'bg-green-100 text-green-700' 
                                      : book.availableBooks > 0 
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-red-100 text-red-700'
                                  }`}>
                                    {book.availableBooks}/{book.totalBooks} Available
                                  </span>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <p className="text-sm text-gray-600">
                                  by <span className="font-medium">{book.author}</span>
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                    {book.category}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                   {/**isbn */}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No available books found matching your search</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
              {/* Due Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span>Due Date *</span>
                  </div>
                </label>
                <input
                  value={dueDate}  
                  onChange={(e) => setDueDate(e.target.value)} 
                  type="date"
                  className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              {/* Return Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Return Date</span>
                  </div>
                </label>
                <input
                  type="date"
                  value={dueDate}
                   onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Status Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Return Status */}
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Book has been returned</span>
                    </div>
                  </label>
                </div>

                {/* Overdue Status */}
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                  <label className="flex items-center space-x-3 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">Book is overdue</span>
                    </div>
                  </label>

                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      placeholder="Days overdue"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Add any additional notes about this lending..."
                className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setReaderSearch('');
                  setBookSearch('');
                  setShowReaderResults(false);
                  setShowBookResults(false);
                }}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Create Lending</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LendingForm;