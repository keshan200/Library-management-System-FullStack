import { BookOpen, Lock, User, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { login } from "../service/authService";
import { toast } from "react-hot-toast";
import axios from "axios";



  interface FormData {
   
     email:string
     password:string
   
  }
  
  interface ErrorForm{
    email?:string
    password?:string
  }


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData , setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<ErrorForm>({})
  const [isLoading ,setIsLoading] =  useState(false)
  const  navigate =  useNavigate()
  const {login:authuenticate} = useAuth()



  const validateForm =  ()=>{

    const newErrors :  ErrorForm = {}
     
    
    if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
  }



  const handleSubmit = async (e:React.FormEvent) =>  {
     
    e.preventDefault()
    if(validateForm()) {
      setIsLoading(true)

      try{
        const user =  await login(formData)
        toast.success(`Welcome ,${user.first_name} ${user.last_name}`)
        authuenticate(user.AccessToken)
        navigate("/dashboard")
      }catch(error:any){
        
        if(axios.isAxiosError(error)){
          toast.error(error.message)
        }else{
          toast.error("something went worng")
        }

      }finally{
            setIsLoading(false)
      }
    }

  }





  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))

    if(errors[name as keyof ErrorForm]){
      setErrors((prev)=>({
         ...prev,
      [name]:undefined
      }))
    }
   
    }
  

  return (
          <div className="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Subtle book icons floating */}
        <div className="absolute top-1/4 left-1/6 text-blue-200 opacity-10 animate-pulse">
          <BookOpen className="h-16 w-16" />
        </div>
        <div className="absolute bottom-1/4 right-1/6 text-indigo-200 opacity-10 animate-pulse" style={{animationDelay: '1.5s'}}>
          <BookOpen className="h-12 w-12" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-purple-200 opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}>
          <BookOpen className="h-20 w-20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-20 rounded-2xl animate-pulse"></div>
                <BookOpen className="h-10 w-10 text-white relative z-10" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Library System
            </h1>
            <p className="text-gray-600 font-medium">Welcome back to your digital library</p>
          </div>

          {/* Login Form */}
          <div className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl border border-white/50 p-8 relative overflow-hidden">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl"></div>
            
            <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-sm placeholder-gray-400 shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-sm placeholder-gray-400 shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="Enter your password"
                  />
                  
                  <button
                    disabled={isLoading}
                  
                    type="submit"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100/50 rounded-r-xl transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 font-medium">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative z-10">Sign In to Library</span>
              </button>
            </form>

             {/* Footer Links */}
            <div className="relative z-10 mt-8 pt-6 border-t border-gray-200/50">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Need an account?{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all">
                    Contact Administrator
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500/80 backdrop-blur-sm bg-white/30 rounded-full px-4 py-2 inline-block">
              © 2024 Library Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login