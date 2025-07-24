import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import type { Reader } from '../../types/Reader';
import toast from 'react-hot-toast';


interface ReaderFormProps {
  reader? : Reader | null
 onSubmit : (readerData : Omit<Reader , "_id" |"status">) => void
}



 const  ReaderForm = ({reader , onSubmit}:ReaderFormProps) => {

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    coverImg: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });


  useEffect(() => {
    if(reader){
      setFormData({
         coverImg:reader.coverImg,
         firstName:reader.firstName,
         lastName:reader.lastName,
         email:reader.email,
         phone:reader.phone,
         address:reader.address

      })
    }else {
       toast.error("null ")
    }

  },[reader])

 const handleSubmit =  (e : React.FormEvent) => {
  e.preventDefault()
  onSubmit(formData)
    
 }
  



  return (
    <div className="bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-3">
      <div className="max-w-xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reader Registration</h2>
          <p className="text-gray-600 text-sm">Join our library community</p>
        </div>
       
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          
          <div className="space-y-4">
            
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2 justify-center">
                  <Camera className="w-3 h-3 mr-1 text-blue-500" />
                  Profile Photo
                </label>
                <div className="relative">
                  {/* Image preview behind the file input */}
                  {imagePreview && (
                    <div className="absolute inset-0 rounded-lg overflow-hidden z-0">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover opacity-30"
                      />
                    </div>
                  )}
                  
                  <input
                    type="file"
                    name="coverImg"
                    
                    accept="image/*"
                    className={`relative z-10 w-32 h-32 bg-gray-50/50 border-2 border-dashed rounded-lg focus:bg-white focus:outline-none transition-all duration-200 text-xs 
                      
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-400 hover:border-blue-300"
                    } file:mr-1 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-500 file:text-white file:text-xs file:cursor-pointer hover:file:bg-blue-600 cursor-pointer flex items-center justify-center`}
                  />
                  
                  {!imagePreview && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-gray-500">
                      <Camera className="w-8 h-8 mb-2" />
                      <span className="text-xs text-center">Click to upload photo</span>
                    </div>
                  )}
                </div>
                
                  <p className="text-xs text-red-500 mt-1 text-center"></p>
               
              </div>
            </div>

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <User className="w-3 h-3 mr-1 text-blue-500" />
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstName}

                 
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200
                   
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter first name"
                />
              
                  <p className="text-xs text-red-500 mt-1"></p>
              
              </div>

              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <User className="w-3 h-3 mr-1 text-blue-500" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastName}
               
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 
                   
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter last name"
                />
              
                  <p className="text-xs text-red-500 mt-1"></p>
                
              </div>
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <Mail className="w-3 h-3 mr-1 text-blue-500" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                 
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 
                   
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter email address"
                />
               
                  <p className="text-xs text-red-500 mt-1"></p>
               
              </div>

              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <Phone className="w-3 h-3 mr-1 text-blue-500" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 
               
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter phone number"
                />
              
                  <p className="text-xs text-red-500 mt-1"> </p>
                
              </div>
            </div>

            {/* Address */}
            <div className="relative">
              <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                <MapPin className="w-3 h-3 mr-1 text-blue-500" />
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
               
                rows={3}
                className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 resize-none 
                 
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-400"
               `}
                placeholder="Enter full address"
              />
           
                <p className="text-xs text-red-500 mt-1"></p>
            
            </div>

            {/* Submit Button */}
            <div className="pt-2">

              <button
                type="button"
             
                className="w-full bg-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 font-semibold text-sm shadow hover:shadow-lg"
              >
                Cancel
              </button>



              <button
                type="button"
              
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 font-semibold text-sm shadow hover:shadow-lg"
              >
                Register Reader
              </button>
            </div>
             
           

          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderForm