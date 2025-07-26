import { Book, Users, BarChart3 } from "lucide-react";

const LibraryLoading = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Main Logo Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Central Book Icon */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform">
              <Book className="w-12 h-12 text-white animate-pulse" />
            </div>
            
            {/* Orbiting Icons */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
              {/* Users Icon */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-emerald-500 p-2 rounded-lg shadow-lg">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Chart Icon */}
              <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                <div className="bg-orange-500 p-2 rounded-lg shadow-lg">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Book Icon */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-pink-500 p-2 rounded-lg shadow-lg">
                  <Book className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Another Icon */}
              <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
                <div className="bg-cyan-500 p-2 rounded-lg shadow-lg">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent mb-2">
            Book Club Library
          </h1>
          <p className="text-gray-500 text-lg">Management System</p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Loading Text with Typewriter Effect */}
        <div className="text-gray-600 text-sm">
          <div className="inline-block">
            <span className="animate-pulse">Preparing your dashboard</span>
            <span className="animate-ping ml-1">.</span>
            <span className="animate-ping ml-0.5" style={{ animationDelay: '0.5s' }}>.</span>
            <span className="animate-ping ml-0.5" style={{ animationDelay: '1s' }}>.</span>
          </div>
        </div>

        {/* Subtle Progress Indicator */}
        <div className="mt-6 w-48 mx-auto">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse transform origin-left scale-x-75"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default LibraryLoading;