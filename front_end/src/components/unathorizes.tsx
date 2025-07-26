import { Lock, ArrowRight, Shield, User, Building } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white">
    
   

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-red-200">
                <Lock className="w-4 h-4" />
                Authentication Required
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Access
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Restricted</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                This area requires proper authentication to access. Please sign in with your credentials to continue to the protected content.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 group">
                  <User className="w-5 h-5" />
                  Sign In to Continue
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                
              </div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 ">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Features Section */}
        <div className=" bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Authentication Matters</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We protect your data and ensure secure access to all platform features through industry-standard authentication protocols.
              </p>
            </div>

        
          </div>
        </div>
      </main>

      
    </div>
  );
}