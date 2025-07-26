import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  ArrowLeft,
  Settings,
  Badge,
  MapPin
} from "lucide-react";

interface User {
  img: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role: "ADMIN" | "STAFF";
}

export default function SettingsPage() {
  const user: User = {
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    first_name: "Ruksshan",
    last_name: "Fernando",
    email: "ruka@example.com",
    password: "password123",
    phone: "+94 77 123 4567",
    role: "STAFF"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
           
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-gray-600">Manage your profile and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 sticky top-24">
              <div className="text-center">
                {/* Profile Image */}
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 p-1 shadow-lg">
                    <img 
                      src={user.img} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform duration-200">
                    <Camera className="w-3 h-3" />
                  </div>
                </div>

                {/* User Info */}
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-sm text-gray-600 mb-3">{user.email}</p>
                
                {/* Role Badge */}
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 mb-4">
                  <Badge className="w-3 h-3 text-green-600" />
                  <span className="text-green-700 font-medium text-xs">{user.role}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">2.5K</div>
                    <div className="text-xs text-gray-600">Books Read</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">156</div>
                    <div className="text-xs text-gray-600">Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">First Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={user.first_name}
                      readOnly
                      className="w-full px-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Last Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={user.last_name}
                      readOnly
                      className="w-full px-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={user.phone}
                      readOnly
                      className="w-full px-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value="Badulla, Sri Lanka"
                      readOnly
                      className="w-full pl-9 pr-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 font-medium text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Email Settings */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Email Settings</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Current Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={user.email}
                      className="w-full pl-9 pr-3 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 font-medium text-sm"
                    />
                  </div>
                </div>

                <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm">
                  Update Email Address
                </button>
              </div>
            </div>

            {/* Password Settings */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Lock className="w-3 h-3 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Password & Security</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={user.password}
                      className="w-full pl-9 pr-3 py-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-gray-900 font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-700">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-3 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}