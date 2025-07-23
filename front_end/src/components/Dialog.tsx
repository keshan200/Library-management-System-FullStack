import { BookOpen } from "lucide-react"
import React from "react"

interface DialogProps {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  children: React.ReactNode
  title?: string
}

const Dialog = ({ isOpen, onCancel, onConfirm, children, title }: DialogProps) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] flex flex-col'>
        
        {title && (
          <div className='mb-4 flex-shrink-0'>
             <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-2">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">

                      </h2>
                      <p className="text-gray-500 text-xs mt-1">Fill in the details below</p>
                    </div>
          </div>
        )}
        <div className='mb-6 flex-1 overflow-y-auto max-h-96 min-h-0'>{children}</div>
        <div className='flex justify-end space-x-4 flex-shrink-0'>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-150'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-150'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dialog