import React, { useEffect, useState } from 'react';
import { Users, Mail, Phone, MapPin, Camera, Lock, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import type { User, UserFormData } from '../../types/User';



interface UserFormProps {
  user?:User | null;
  onSubmit: (userData: Omit<User, "_id">) => void
  isEditMode?: boolean;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  mobile?: string;
  img?: string;
}

const UserForm = ({ user,onSubmit,isEditMode }:UserFormProps) => {


  const [formData, setFormData] = useState<UserFormData>({
    first_name: '',
    last_name: '',
    img: '',
    email: '',
    password: '',
    mobile: '',
    role: "staff",
    status: 'Active',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);


useEffect(() => {
  if (user) {
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      img: user.img,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
      role: user.role,
      status: user.status,
    });
  }
}, [user]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

   
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = "First name must be at least 2 characters";
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = "Last name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
 
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleCancel = () => {
    setFormData({
      first_name: '',
      last_name: '',
      img: '',
      email: '',
      password: '',
      mobile: '',
      role: 'staff',
      status: 'Active',
    });
    setImagePreview(null);
    setErrors({});
  };


 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    if (validateForm()) {
      onSubmit(formData);
    } else {
      toast.error("Please fix validation errors.");
    }
  };





  return (
    <div className="bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-3">
      <div className="max-w-xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
         
          </h2>
          <p className="text-gray-600 text-sm">
          
          </p>
        </div>
       
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          
          <form  className="space-y-4" onSubmit={handleSubmit}>
            
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
                    name="img"
                    onChange={handleChange}
                    accept="image/*"
                    className={`relative z-10 w-32 h-32 bg-gray-50/50 border-2 border-dashed rounded-lg focus:bg-white focus:outline-none transition-all duration-200 text-xs ${
                      errors.img
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
                
                {errors.img && (
                  <p className="text-xs text-red-500 mt-1 text-center">{errors.img}</p>
                )}
              </div>
            </div>

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <Users className="w-3 h-3 mr-1 text-blue-500" />
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.first_name
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter first name"
                />
                {errors.first_name && (
                  <p className="text-xs text-red-500 mt-1">{errors.first_name}</p>
                )}
              </div>

              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <Users className="w-3 h-3 mr-1 text-blue-500" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                    errors.last_name
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-400"
                  }`}
                  placeholder="Enter last name"
                />
                {errors.last_name && (
                  <p className="text-xs text-red-500 mt-1">{errors.last_name}</p>
                )}
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="relative">
              <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                <Lock className="w-3 h-3 mr-1 text-blue-500" />
                Password<span className="text-gray-500 ml-1">(leave blank to keep current)</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                  errors.password
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-400"
                }`}
           
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="relative">
              <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                <Phone className="w-3 h-3 mr-1 text-blue-500" />
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-gray-50/50 border rounded-lg focus:bg-white focus:outline-none transition-all duration-200 ${
                  errors.mobile
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-400"
                }`}
                placeholder="Enter mobile number"
              />
              {errors.mobile && (
                <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Role & Status Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <label className="flex items-center text-xs font-semibold text-gray-700 mb-2">
                  <Shield className="w-3 h-3 mr-1 text-blue-500" />
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-blue-400 transition-all duration-200"
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

            
            </div>

       
          
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserForm;