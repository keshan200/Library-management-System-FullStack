import React, { useEffect, useState } from "react";
import type { Book, BookFromData } from "../../types/Book";

interface bookFormProps {
    book?: Book | null
    onSubmit : (bookData : Omit<Book , "_id">) => void
}


 interface FormErrors {
  name?: string;
  coverImg?: string;
  author?: string;
  category?: string;
  totalBooks?: string;
  availableBooks?: string;
}


const BookForm = ({book , onSubmit}:bookFormProps) => {

     const [formData , setFormData] = useState<BookFromData>({
         name: "",
         author: "",
         category: "",
         coverImg: "",
         totalBooks: 0,
         availableBooks: 0,
      
     })

     
     const [erros, setErros] = useState<FormErrors>({})


     useEffect(() => {
        
        if(book){
            
            setFormData({
                name: book.name,
                author: book.author,
                category: book.category,
                coverImg: book.coverImg,
                totalBooks: book.totalBooks,
                availableBooks: book.availableBooks,
            })
        }else{
             setFormData({
                name: "",
                author: "",
                category: "",
                coverImg: "",
                totalBooks: 0,
                availableBooks: 0,
            })
        } 
        setErros({})

        },[book])

    
    const validateFrom  = () : boolean => {

          const newErrors : FormErrors = {}
           
           // Name validation
         if (!formData.name.trim()) {
         newErrors.name = "Name is required";
         }

         // Author validation
         if (!formData.author.trim()) {
         newErrors.author = "Author is required";
        }

        // Category validation
         if (!formData.category.trim()) {
              newErrors.category = "Category is required";
         }

       // Cover image validation
         if (!formData.coverImg.trim()) {
          newErrors.coverImg = "Cover image URL is required";
         }

       // Total books validation
         if (formData.totalBooks <= 0) {
           newErrors.totalBooks = "Total books must be greater than 0";
         }

        // Available books validation
         if (formData.availableBooks < 0) {
          newErrors.availableBooks = "Available books cannot be negative";
        } else if (formData.availableBooks > formData.totalBooks) {
          newErrors.availableBooks = "Available books cannot exceed total books";
        }

       // Set the errors
       setErros(newErrors);

      // Return true if no errors
       return Object.keys(newErrors).length === 0;
    }  
    
    
   
    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault()
        if(validateFrom()){
            onSubmit(formData)
        }
    }


   const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  
  const updatedValue =
    name === "totalBooks" || name === "availableBooks"
      ? Number(value)
      : value;

  setFormData((prev) => ({
    ...prev,
    [name]: updatedValue,
  }));

  
  if (erros[name as keyof FormErrors]) {
    setErros((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  }
};




    return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        {book ? "Edit Book" : "Add New Book"}
      </h2>

      {/* Book Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            erros.name
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
          placeholder="Enter book name"
        />
        {erros.name && (
          <p className="text-sm text-red-500 mt-1">{erros.name}</p>
        )}
      </div>

      {/* Author */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Author
        </label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            erros.author
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
          placeholder="Enter author name"
        />
        {erros.author && (
          <p className="text-sm text-red-500 mt-1">{erros.author}</p>
        )}
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            erros.category
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
          placeholder="Enter category"
        />
        {erros.category && (
          <p className="text-sm text-red-500 mt-1">{erros.category}</p>
        )}
      </div>

      {/* Cover Image */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Cover Image URL
        </label>
        <input
          type="text"
          name="coverImg"
          value={formData.coverImg}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            erros.coverImg
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
          placeholder="Enter cover image URL"
        />
        {erros.coverImg && (
          <p className="text-sm text-red-500 mt-1">{erros.coverImg}</p>
        )}
      </div>

      {/* Total Books */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Total Books
        </label>
        <input
          type="number"
          name="totalBooks"
          value={formData.totalBooks}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            erros.totalBooks
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
        />
        {erros.totalBooks && (
          <p className="text-sm text-red-500 mt-1">
            {erros.totalBooks}
          </p>
        )}
      </div>

      {/* Available Books */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">
          Available Books
        </label>
        <input
          type="number"
          name="availableBooks"
          value={formData.availableBooks}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            erros.availableBooks
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
        />
        {erros.availableBooks && (
          <p className="text-sm text-red-500 mt-1">
            {erros.availableBooks}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
      >
        {book ? "Update Book" : "Add Book"}
      </button>
    </form>
  );




}


export default BookForm


    

