import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Power, X, User, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { Reader } from '../types/Reader';
import type { Lending, LendingTable } from '../types/Lending';



interface StatusModelProps {
  isOpen: boolean
  onCancel: () => void
  onConfirm: (newStatus: string) => void
  reader: Reader | null;
  lendings: LendingTable[];
}



const StatusToggleDialog = ({ isOpen, onCancel, onConfirm,reader,lendings}: StatusModelProps) => {
  if (!isOpen || !reader) return null

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState('');


   const currentLoans = lendings.filter(
    (lending) => lending.reader._id === reader._id && !lending.returnDate
  ).length;

  useEffect(() => {
    console.log('Current Reader:', reader);
    console.log('Current Loans:', currentLoans);
  }, [reader, currentLoans]);

 
const formattedDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(new Date(reader?.createdAt || ''));

  const readers = {
    _id: reader?._id,
    name: `${reader?.firstName} ${reader?.lastName}`,
    email: reader?.email,
    status: reader?.status,
    memberSince: formattedDate,
    totalBooks: 0,
    currentLoans:currentLoans 
  };

  const handleStatusToggle = (newStatus: React.SetStateAction<string>) => {

    console.log("opening")
    setActionType(newStatus);
    setIsConfirmOpen(true);
   
  
  };

  const confirmStatusChange = () => {
   
    console.log(`Status changed to: ${actionType}`);
    setIsConfirmOpen(false);
    onConfirm(actionType)
   
  
  };

  useEffect(() => {
  console.log('isConfirmOpen:', isConfirmOpen);
}, [isConfirmOpen]);


  return (


    
        
    <>
      {/* Main Dialog Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-md transform transition-all duration-300 scale-100">
          
          {/* Dialog Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl p-6 text-white">
            <button
              onClick={() => onCancel()}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-full">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Account Management</h3>
                <p className="text-blue-100 text-sm">Manage member status</p>
              </div>
            </div>
          </div>

          {/* Dialog Content */}
          <div className="p-6">
            
            {/* Member Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {readers.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{readers.name}</h4>
                  <p className="text-sm text-gray-600">{readers.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-white rounded-lg">
                  <p className="text-xs text-gray-500 font-medium">Member Since</p>
                  <p className="text-sm font-bold text-gray-800">{readers.memberSince}</p>
                </div>
                <div className="p-2 bg-white rounded-lg">
                  <p className="text-xs text-gray-500 font-medium">Total Books</p>
                  <p className="text-sm font-bold text-gray-800">{readers.totalBooks}</p>
                </div>
                <div className="p-2 bg-white rounded-lg">
                  <p className="text-xs text-gray-500 font-medium">Current Loans</p>
                  <p className="text-sm font-bold text-gray-800">{readers.currentLoans}</p>
                </div>
              </div>
            </div>

            {/* Current Status Display */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                Current Status
              </p>
              
              <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${
                    readers.status === "Active" 
                      ? "bg-green-50 border-2 border-green-200" 
                      : "bg-red-50 border-2 border-red-200"
                  }`}>
                    {readers.status === "Active" ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  
                  <div>
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${
                      readers.status === "Active"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        readers.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}></div>
                      {readers.status}
                    </span>
                    
                    <p className="text-xs text-gray-600 mt-1">
                      {readers.status === "Active" 
                        ? "Can borrow books and access services"
                        : "Library access is suspended"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleStatusToggle(readers.status === "Active" ? "Inactive" : "Active")}
                className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  readers.status === "Active"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                }`}
              >
                <Power className="w-5 h-5" />
                <span>
                  {readers.status === "Active" ? "Deactivate Account" : "Activate Account"}
                </span>
              </button>

              <button
               onClick={() => onCancel()}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
     {/* Confirmation Dialog */}
      {isConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-sm transform transition-all duration-300 scale-100">
            
            {/* Confirmation Header */}
            <div className={`p-6 rounded-t-3xl ${
              actionType === "Active" 
                ? "bg-gradient-to-r from-green-500 to-green-600" 
                : "bg-gradient-to-r from-red-500 to-red-600"
            } text-white text-center`}>
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                actionType === "Active" ? "bg-green-400 bg-opacity-30" : "bg-red-400 bg-opacity-30"
              }`}>
                {actionType === "Active" ? (
                  <ShieldCheck className="w-8 h-8" />
                ) : (
                  <AlertTriangle className="w-8 h-8" />
                )}
              </div>
              <h3 className="text-xl font-bold">Confirm Action</h3>
            </div>

            {/* Confirmation Content */}
            <div className="p-6 text-center">
              <p className="text-gray-700 mb-6">
                Are you sure you want to <span className="font-bold">
                {actionType === "Active" ? "Active" : "Inactive"}</span> this member's account?
              </p>
              
              <div className={`p-4 rounded-2xl mb-6 ${
                actionType === "Active" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}>
                <p className={`text-sm font-medium ${
                  actionType === "Active" ? "text-green-800" : "text-red-800"
                }`}>
                  {actionType === "Active" 
                    ? "The member will regain access to all library services and can borrow books."
                    : "The member will lose access to library services and cannot borrow new books."
                  }
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={confirmStatusChange}
                  className={`w-full px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    actionType === "Active"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  Yes, {actionType === "Active" ? "Activate" : "Inactive"}
                </button>
                
                <button
                  onClick={onCancel}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusToggleDialog;


