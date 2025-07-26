import React, { useEffect, useState } from "react";
import type { Book, BookFromData } from "../../types/Book";
import { BookOpen, User, Tag, Package, Hash } from "lucide-react";

interface BookFormProps {
  book?: Book | null;
  onSubmit: (bookData: Omit<Book, "_id">) => void;
}

interface FormErrors {
  name?: string;
  coverImg?: string;
  author?: string;
  category?: string;
  totalBooks?: string;
  availableBooks?: string;
}

const BookForm = ({ book, onSubmit }: BookFormProps) => {
  const [formData, setFormData] = useState<BookFromData>({
    name: "",
    author: "",
    category: '',
    coverImg: '',
    totalBooks: 0,
    availableBooks: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (book) {
      setFormData({
        name: book.name,
        author: book.author,
        category: book.category,
        coverImg: book.coverImg, 
        totalBooks: book.totalBooks,
        availableBooks: book.availableBooks,
      });
    } else {
      setFormData({
        name: "",
        author: "",
        category: "",
        coverImg: "",
        totalBooks: 0,
        availableBooks: 0,
      });
    }
    setErrors({});
  }, [book]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.category.trim())
      newErrors.category = "Category is required";

    if (formData.totalBooks <= 0)
      newErrors.totalBooks = "Total books must be greater than 0";

    if (formData.availableBooks < 0)
      newErrors.availableBooks = "Available books cannot be negative";
    else if (formData.availableBooks > formData.totalBooks)
      newErrors.availableBooks =
        "Available books cannot exceed total books";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(validateForm()){
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

   
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          coverImg: file,
        }));
      }
      return;
    }
 // Handle other fields
    const updatedValue =
      name === "totalBooks" || name === "availableBooks"
        ? Number(value)
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

return (
    <div className="bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-3">
      <div className="max-w-xl mx-auto">
        
        {/* Header */}
       

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          
          <div className="space-y-4">
            
            {/* Name & Author Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <BookOpen className="w-3 h-3 mr-1 text-blue-500" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-6 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.name
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter book title"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <User className="w-3 h-3 mr-1 text-blue-500" />
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.author
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="text-xs text-red-500 mt-1">{errors.author}</p>
                )}
              </div>
            </div>

            {/* Category & Cover Image Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <Tag className="w-3 h-3 mr-1 text-blue-500" />
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.category
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Fiction, Biography, etc."
                />
                {errors.category && (
                  <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                )}
              </div>

              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
               
                  Cover Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="coverImg"
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-gray-50/50 border border-dashed rounded-lg focus:bg-white focus:outline-none transition-all duration-200 text-xs ${
                      errors.coverImg
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-400"
                    } file:mr-1 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-500 file:text-white file:text-xs file:cursor-pointer hover:file:bg-blue-600`}
                  />
                </div>
                {errors.coverImg && (
                  <p className="text-xs text-red-500 mt-1">{errors.coverImg}</p>
                )}
              </div>
            </div>

            {/* Quantities Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <Package className="w-3 h-3 mr-1 text-blue-500" />
                  Total Books
                </label>
                <input
                  type="number"
                  name="totalBooks"
                  value={formData.totalBooks}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.totalBooks
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="0"
                  min="0"
                />
                {errors.totalBooks && (
                  <p className="text-xs text-red-500 mt-1">{errors.totalBooks}</p>
                )}
              </div>

              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <Hash className="w-3 h-3 mr-1 text-blue-500" />
                  Available Books
                </label>
                <input
                  type="number"
                  name="availableBooks"
                  value={formData.availableBooks}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.availableBooks
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="0"
                  min="0"
                />
                {errors.availableBooks && (
                  <p className="text-xs text-red-500 mt-1">{errors.availableBooks}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 font-semibold text-sm shadow hover:shadow-lg"
              >
                {book ? "Update Book" : "Add Book"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BookForm;
