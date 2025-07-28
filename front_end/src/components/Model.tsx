import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
