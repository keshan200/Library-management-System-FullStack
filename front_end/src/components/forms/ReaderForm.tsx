import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import type { Reader, ReaderFormData } from '../../types/Reader';
import toast from 'react-hot-toast';

interface ReaderFormProps {
  reader?: Reader | null;
  onSubmit: (readerData: Omit<Reader, "_id" | "status">) => void;
  isEditMode?: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  coverImg?: string;
}

const ReaderForm = ({ reader, onSubmit ,isEditMode}: ReaderFormProps) => {
  const [formData, setFormData] = useState<ReaderFormData>({
    coverImg: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (reader) {
      setFormData({
        coverImg: reader.coverImg ,
        firstName: reader.firstName,
        lastName: reader.lastName,
        email: reader.email,
        phone: reader.phone,
        address: reader.address,
      });
    }else{

    }
  }, [reader]);




const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement >) => {
  const { name, value, type } = e.target;

  if (type === 'file') {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Clear specific error if it exists
  if (errors[name as keyof FormErrors]) {
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  }
};



   

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.coverImg) newErrors.coverImg = "Profile image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      toast.error("Please fix validation errors.");
    }
  };

  const handleCancel = () => {
    setFormData({
      coverImg: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    });
    setImagePreview(null);
    setErrors({});
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-3">
      <div className="max-w-xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reader Registration</h2>
          <p className="text-gray-600 text-sm">Join our library community</p>
        </div>
       
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
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
                    onChange={handleChange}
                    accept="image/*"
                    className={`relative z-10 w-32 h-32 bg-gray-50/50 border-2 border-dashed rounded-lg focus:bg-white focus:outline-none transition-all duration-200 text-xs ${
                      errors.coverImg
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
                
                {errors.coverImg && (
                  <p className="text-xs text-red-500 mt-1 text-center">{errors.coverImg}</p>
                )}
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
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.firstName
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <User className="w-3 h-3 mr-1 text-blue-500" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.lastName
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
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
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
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
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
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
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 resize-none ${
                  errors.address
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-400"
                }`}
                placeholder="Enter full address"
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            {/* Submit Buttons */}
        {/*    <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full bg-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 font-semibold text-sm shadow hover:shadow-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 font-semibold text-sm shadow hover:shadow-lg"
              >
                {reader ? 'Update Reader' : 'Register Reader'}
              </button>
            </div>*/}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReaderForm;